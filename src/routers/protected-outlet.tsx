import { FC, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RouterLink } from "./routers";
import { useAppDispatch, useAppSelector } from "../hooks";
import { APIServices } from "../utils";
import { logout } from "../redux/auth/auth.slice";

type RouterProps = {
  module?: string;
  action?: string;
  requireLogin?: boolean;
};

const ProtectedOutlet: FC<RouterProps> = ({ requireLogin = false }) => {
  const { isLogin } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await APIServices.Auth.checkToken();
      } catch {
        dispatch(logout());
      }
    };

    checkToken();
  }, [location]);

  if (requireLogin && !isLogin) return <Navigate to={RouterLink.LOGIN} />;

  return <Outlet />;
};

export default ProtectedOutlet;
