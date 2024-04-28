import { FC } from "react";
import { Outlet } from "react-router-dom";

type RouterProps = {
  module?: string;
  action?: string;
  requireLogin?: boolean;
};

const ProtectedOutlet: FC<RouterProps> = ({ requireLogin = false }) => {
  const canAccess = true;

  if (canAccess) return <Outlet />;

  return <div>ProtectedOutlet</div>;
};

export default ProtectedOutlet;
