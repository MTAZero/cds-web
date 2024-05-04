import { FC, useState } from "react";
import * as styles from "./index.styles";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Popover } from "@mui/material";
import { FaDelicious, FaInfoCircle } from "react-icons/fa";

type UnitItemProps = {
  item: any;
  onDetail: (item: any) => void;
};

export const UnitItem: FC<UnitItemProps> = ({ item, onDetail }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  if (!item) return null;

  const { troop_info, isReport, childs } = item;
  let str = "";

  if (isReport)
    str = `${item?.name} (${troop_info?.totalAttendance}/${troop_info?.total})`;
  else str = `${item?.name} chưa báo quân số`;

  const renderMenu = () => {
    return (
      <Box sx={styles.menuContainerStyle}>
        <Box sx={styles.menuItemStyle} onClick={() => onDetail(item)}>
          <FaInfoCircle />
          Chi tiết
        </Box>
      </Box>
    );
  };

  return (
    <TreeItem
      itemId={item?._id}
      label={
        <Box
          onClick={(e) => {
            setOpenMenu(true);
            setAnchorEl(e.currentTarget);
          }}
          sx={styles.treeStyle(isReport ? true : false)}
        >
          {str}
        </Box>
      }
    >
      {childs &&
        childs.map((item: any) => {
          return <UnitItem item={item} onDetail={onDetail} />;
        })}

      <Popover
        id={`menu-topbar-${item?._id}`}
        open={openMenu}
        anchorEl={anchorEl}
        onClose={() => setOpenMenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ marginLeft: "-50px" }}
      >
        {renderMenu()}
      </Popover>
    </TreeItem>
  );
};
