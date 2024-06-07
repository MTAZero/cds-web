import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Header } from "./header";
import { Menu } from "./menu";
import { ModalChangePassword } from "./modal-change-password";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setModalChangePasswordState } from "../../redux/global/global.slice";

export const MainLayout = () => {
  const modalChangePasswordState = useAppSelector(
    (state) => state.global.modalChangePasswordState
  );

  console.log(modalChangePasswordState);

  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flex: 1,
          background: "#f2f2f2",
          height: "calc(100vh-65px)",
          paddingTop: "65px",
        }}
      >
        <Menu />
        <Box
          sx={{
            paddingLeft: "320px",
            display: "flex",
            flex: 1,
            height: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <ModalChangePassword
        visible={modalChangePasswordState}
        onClose={() => {
          dispatch(setModalChangePasswordState(false));
        }}
      />
    </Box>
  );
};
