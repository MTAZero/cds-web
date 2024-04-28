import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Header } from "./header";
import { Menu } from "./menu";

export const MainLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        sx={{ display: "flex", gap: "20px", flex: 1, background: "#f2f2f2" }}
      >
        <Menu />
        <Outlet />
      </Box>
    </Box>
  );
};
