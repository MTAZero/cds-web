import {SSOConfigs} from "const";
import {useAppDispatch, useAppSelector} from "hooks";
import {Navigate, useSearchParams} from "react-router-dom";
import {
  loginSuccess,
  logout,
  setIdToken,
  setToken,
  updatePermisson,
} from "../../redux/auth/auth.slice";
import {RouterLink} from "routers/routers";
import {Permission} from "types";
import {APIServices, NotificationService, serialize} from "utils";
const XacThucSSO = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const code = params.get("code");
  const dataGetToken = {
    grant_type: SSOConfigs.grantType,
    code: code,
    redirect_uri: SSOConfigs.callbackLoginUrl,
    client_id: SSOConfigs.clientId,
    client_secret: SSOConfigs.clientSecret,
  };
  const {isLogin} = useAppSelector(state => state.auth);
  const getTokenFromCode = async code => {
    try {
      const res = await APIServices.SSO.getTokenFromCode(dataGetToken);
      if (res?.access_token) {
        handleLogin(res);
      } else {
        NotificationService.error(
          "Tài khoản mail của đồng chí chưa được cấp quyền sử dụng hệ thống. Vui lòng đăng xuất khỏi hệ thống"
        );
        setTimeout(() => {
          handleLogout(res?.id_token);
        }, 5000);
      }
    } catch (error) {}
  };
  getTokenFromCode(code);
  const loadPermission = async () => {
    try {
      const request = await APIServices.Auth.getPermission();
      const {data} = request;
      const {permisisons} = data;

      if (Array.isArray(permisisons)) {
        const ix: Array<Permission> = permisisons.map(i => {
          return {
            module: i?.module,
            action: i?.action,
          };
        });

        dispatch(updatePermisson(ix));
      }
    } catch {}
  };

  const handleLogout = async id_token => {
    dispatch(logout());
    const dataLogout = {
      id_token_hint: id_token,
      post_logout_redirect_uri: SSOConfigs.callbackLogoutUrl,
    };
    const urlLogout = `${SSOConfigs.urlSSO}/oidc/logout?${serialize(
      dataLogout
    )}`;
    window.location.replace(urlLogout);
  };
  const handleLogin = props => {
    const {access_token, id_token, user} = props;
    dispatch(
      loginSuccess({
        _id: user?._id,
        name: user?.full_name,
        username: user?.username,
        role: user?.role,
        type: user?.type,
        rank: user?.rank,
        unit: user?.unit,
      })
    );
    dispatch(setIdToken(id_token));
    dispatch(setToken(access_token));
    loadPermission();
    NotificationService.success("Đăng nhập thành công");
  };

  if (isLogin) return <Navigate to={RouterLink.PERSONAL_GUARD_SCHEDULE} />;
  return <div></div>;
};
export default XacThucSSO;
