import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { logout } from "../redux/auth/auth.slice";

export const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div>Main Layout</div>
      <Button onClick={handleLogout}>Logout</Button>
      <Outlet />
    </div>
  );
};
