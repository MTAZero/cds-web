import { Box, Button, Popover, Typography } from "@mui/material";
import * as styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../redux/auth/auth.slice";

import UserImage from "../../../assests/images/user.png";
import { useState } from "react";
import { FaLock, FaSignOutAlt } from "react-icons/fa";
import { NotificationService } from "../../../utils";

export const Header = () => {
  const dispatch = useAppDispatch();

  const info = useAppSelector((state) => state.auth.info);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());

    NotificationService.success("Đăng xuất thành công");
  };

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(true);
    setAnchorEl(event.currentTarget);
  };

  // render
  const renderMenu = () => {
    return (
      <Box sx={styles.menuContainerStyle}>
        <Box sx={styles.menuItemStyle}>
          <FaLock style={styles.menuIconStyle} />
          Đổi mật khẩu
        </Box>
        <Box sx={styles.menuItemStyle} onClick={handleLogout}>
          <FaSignOutAlt style={styles.menuIconStyle} />
          Đăng xuất
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={styles.containStyle}>
      <Box sx={styles.appNameStyle}>CDS</Box>
      <Box sx={styles.topbarMenuStyle}>
        {info && <Box>{info.name}</Box>}
        <img
          src={UserImage}
          alt="avatar"
          style={styles.avatarStyle}
          onClick={handleClickAvatar}
        />
      </Box>

      <Popover
        id={"menu-topbar"}
        open={openMenu}
        anchorEl={anchorEl}
        onClose={() => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ marginTop: "15px" }}
      >
        {renderMenu()}
      </Popover>
    </Box>
  );
};
