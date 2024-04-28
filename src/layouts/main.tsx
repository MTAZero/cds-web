import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <div>Main Layout</div>
      <Outlet />
    </div>
  );
};
