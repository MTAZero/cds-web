import { Box, Button } from "@mui/material";
import * as styles from "./styles";
import { useAppDispatch } from "../../../hooks";
import { logout } from "../../../redux/auth/auth.slice";

export const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={styles.containStyle}>
      <Box sx={styles.appNameStyle}>CDS</Box>
      <Box sx={styles.topbarMenuStyle}>
        <Button sx={styles.buttonLogoutStyle} onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Box>
    </Box>
  );
};
