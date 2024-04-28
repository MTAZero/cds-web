import { FC, useState } from "react";
import { SideMenuItem } from "../../../types";

import * as styles from "./styles";
import { Box, Collapse } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RouterLink } from "../../../routers/routers";
import { useNavigate } from "react-router-dom";

type MenuItemProps = {
  item: SideMenuItem;
  keyRender: string;
  level: number;
};

export const MenuItemView: FC<MenuItemProps> = ({ item, keyRender, level }) => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState<boolean>(false);

  const _style = window.location.href.includes(item.key)
    ? styles.selectedItem
    : styles.menuItemStyle;

  if (item.children.length === 0)
    return (
      <Box key={keyRender} sx={_style} onClick={() => navigate(item.url)}>
        {item.icon}
        <Box> {item.text}</Box>
      </Box>
    );

  return (
    <>
      <Box
        key={keyRender}
        sx={{
          ..._style,
          ...{
            marginLeft: `{${level * 20}}px`,
          },
        }}
        onClick={() => setCollapse(!collapse)}
      >
        {item.icon}
        <Box sx={{ display: "flex", flex: 1 }}> {item.text}</Box>
        {collapse === false ? <FaAngleDown /> : <FaAngleUp />}
      </Box>
      <Box sx={{ marginLeft: "20px" }}>
        <Collapse in={collapse}>
          {item.children.map((item: SideMenuItem, i: number) => {
            return (
              <MenuItemView
                item={item}
                keyRender={`menu-${i}`}
                level={level + 1}
              />
            );
          })}
        </Collapse>
      </Box>
    </>
  );
};
