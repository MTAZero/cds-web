import { Box } from "@mui/material";

import * as styles from "./styles";
import { mainMenu } from "./menu-data";
import { SideMenuItem } from "../../../types";
import { MenuItemView } from "./menu-item";

export const Menu = () => {
  return (
    <Box sx={styles.mainContainerStyle}>
      <Box sx={styles.menuContainerStyle}>
        {mainMenu.map((item: SideMenuItem, i: number) => {
          return <MenuItemView item={item} keyRender={`menu-${i}`} level={1} />;
        })}
      </Box>
    </Box>
  );
};
