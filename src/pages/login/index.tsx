import { Box, Button, FormControl } from "@mui/material";
import * as styles from "./styles";
import { FC, useState } from "react";
import { APIServices } from "../../utils";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RouterLink } from "../../routers/routers";
import { Navigate, redirect, useLocation } from "react-router-dom";
import {
  loginSuccess,
  setToken,
  updatePermisson,
} from "../../redux/auth/auth.slice";
import { Permission } from "../../types";
interface LoginFormState {
  username: string;
  password: string;
}

export const LoginPage: FC = () => {
  const [state, setState] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);

  const location = useLocation();

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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const request = await APIServices.Auth.login(
        state.username,
        state.password
      );

      const data = request?.data ? request?.data : {};
      const { access_token } = data;

      dispatch(loginSuccess({ name: "admin", username: state.username }));
      dispatch(setToken(access_token));

      loadPermission();

      toast.success("Đăng nhập thành công");
    } catch (ex) {
      console.log(ex);
      toast.error("Đăng nhập thất bại");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isLogin) return <Navigate to={RouterLink.HOME} />;

  return (
    <Box sx={styles.containerStyle}>
      <FormControl sx={styles.loginPanelStyle} onSubmit={handleSubmit}>
        <Box sx={styles.nameSystemStyle}>PHẦN MỀM CHUYỂN ĐỔI SỐ</Box>
        <Box sx={styles.labelStyle}>Tên đăng nhập</Box>
        <Box sx={styles.rowStyle}>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            style={styles.textInputStyle}
          />
        </Box>

        <Box sx={styles.labelStyle}>Mật khẩu</Box>
        <Box sx={styles.rowStyle}>
          <input
            style={styles.textInputStyle}
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </Box>

        <Button
          // disabled={!state.username.trim() && !state.password.trim()}
          sx={styles.buttonStyle}
          onClick={handleSubmit}
          type="submit"
        >
          Đăng nhập
        </Button>
      </FormControl>
    </Box>
  );
};
