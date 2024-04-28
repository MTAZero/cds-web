import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RouterLink } from "./routers";
import { useAppSelector } from "../hooks";

type RouterProps = {
  module?: string;
  action?: string;
  requireLogin?: boolean;
};

const ProtectedOutlet: FC<RouterProps> = ({ requireLogin = false }) => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  if (requireLogin && !isLogin) return <Navigate to={RouterLink.LOGIN} />;

  return <Outlet />;
};

export default ProtectedOutlet;
