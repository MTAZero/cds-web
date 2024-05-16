import {Box, Button, Popover, Typography} from "@mui/material";
import * as styles from "./styles";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {logout} from "../../../redux/auth/auth.slice";

import UserImage from "../../../assests/images/user.png";
import {useState} from "react";
import {FaLock, FaSignOutAlt} from "react-icons/fa";
import {NotificationService, serialize} from "../../../utils";
import {SSOConfigs} from "const";
import staticMethods from "antd/es/message";

export const Header = () => {
  const dispatch = useAppDispatch();

  const info = useAppSelector(state => state.auth.info);
  const id_token = useAppSelector(state => state.auth.id_token);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const paramsLogout = {
    id_token_hint: id_token,
    post_logout_redirect_uri: SSOConfigs.callbackLogoutUrl,
  };
  const handleLogout = () => {
    dispatch(logout());
    NotificationService.success("Đăng xuất thành công");
    if (id_token) {
      const urlLogout = `${SSOConfigs.urlSSO}/oidc/logout?${serialize(
        paramsLogout
      )}`;
      window.location.replace(urlLogout);
    }
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
          <FaLock />
          Đổi mật khẩu
        </Box>
        <Box sx={styles.menuItemStyle} onClick={handleLogout}>
          <FaSignOutAlt />
          Đăng xuất
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={styles.containStyle}>
      <Box sx={styles.appNameStyle}>CDS</Box>
      <Box sx={styles.topbarMenuStyle}>
        {info && <Box sx={styles.infoStyle}>{info.name}</Box>}
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
        style={{marginTop: "15px"}}
      >
        {renderMenu()}
      </Popover>
    </Box>
  );
};
