import { SSOConfigs } from "const";
import { useAppDispatch, useAppSelector } from "hooks";
import  { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { loginSuccess, setIdToken, setToken, updatePermisson } from "../../redux/auth/auth.slice";
import { RouterLink } from "routers/routers";
import { Permission } from "types";
import { APIServices, NotificationService } from "utils";
const XacThucSSO=()=>{
    const dispatch = useAppDispatch();
    const [params,setParams]=  useSearchParams();
    const code= params.get('code');
    const dataGetToken={
        grant_type:SSOConfigs.grantType,
        code:code,
        redirect_uri:SSOConfigs.callbackLoginUrl,
        client_id:SSOConfigs.clientId,
        client_secret:SSOConfigs.clientSecret
     }
    const { isLogin } = useAppSelector((state) => state.auth);
    console.log(code)
    const getTokenFromCode=async(code)=>{
        try {
            const res= await APIServices.SSO.getTokenFromCode(dataGetToken);
            handleLogin(res)
            console.log(res)
        } catch (error) {
            
        }
    }
    getTokenFromCode(code);
    const loadPermission = async () => {
    try {
      const request = await APIServices.Auth.getPermission();
      const { data } = request;
      const { permisisons } = data;

      if (Array.isArray(permisisons)) {
        const ix: Array<Permission> = permisisons.map((i) => {
          return {
            module: i?.module,
            action: i?.action,
          };
        });

        dispatch(updatePermisson(ix));
      }
    } catch {}
  };
    const handleLogin=(props)=>{
        const {access_token,id_token,user}=props;
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
      dispatch(setIdToken(id_token))
      dispatch(setToken(access_token));
      loadPermission();
      NotificationService.success("Đăng nhập thành công");
    }
  
    if(isLogin) return <Navigate to={RouterLink.PERSONAL_GUARD_SCHEDULE} />;
    return <div></div>
}
export default XacThucSSO