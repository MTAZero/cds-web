import {FC, useCallback, useEffect} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {RouterLink} from "./routers";
import {useAppDispatch, useAppSelector} from "hooks";
import {APIServices} from "../utils";
import {Permission} from "../types";
import {logout, updateInfo, updatePermisson} from "../redux/auth/auth.slice";

type RouterProps = {
  module?: string;
  action?: string;
  requireLogin?: boolean;
};

const ProtectedOutlet: FC<RouterProps> = ({requireLogin = false}) => {
  const {isLogin} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const loadPermission = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const ans = await APIServices.Auth.checkToken();
        const {data} = ans;
        dispatch(
          updateInfo({
            _id: data?._id,
            name: data?.full_name,
            username: data?.username,
            role: data?.role,
            type: data?.type,
            rank: data?.rank,
            unit: data?.unit,
          })
        );
      } catch {
        dispatch(
          updateInfo({
            _id: "1",
            name: "1",
            username: "1",
            role: "1",
            type: "1",
            rank: "1",
            unit: "1",
          })
        );
        // dispatch(logout());
      }
    };

    checkToken();
  }, [dispatch, location]);

  useEffect(() => {
    loadPermission();
  }, [loadPermission]);

  if (requireLogin && !isLogin) return <Navigate to={RouterLink.LOGIN} />;

  return <Outlet />;
};

export default ProtectedOutlet;
