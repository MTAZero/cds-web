import { FC, useState } from "react";
import * as styles from "./index.styles";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Button, Popover } from "@mui/material";
import { FaDelicious, FaInfoCircle } from "react-icons/fa";

type UnitItemProps = {
  item: any;
  onDetail: (item: any) => void;
};

export const UnitItem: FC<UnitItemProps> = ({ item, onDetail }) => {
  if (!item) return null;

  const { troop_info, isReport, childs } = item;
  let str = "";

  if (isReport)
    str = `${item?.name} (${troop_info?.totalAttendance}/${troop_info?.total})`;
  else str = `${item?.name} chưa báo quân số`;

  return (
    <TreeItem
      itemId={item?._id}
      label={
        <Box sx={styles.treeStyle(isReport ? true : false)}>
          {str}
          <Box
            sx={styles.menuItemStyle}
            onClick={(e) => {
              e.stopPropagation();
              onDetail(item);
            }}
          >
            <FaInfoCircle />
          </Box>
        </Box>
      }
    >
      {childs &&
        childs.map((item: any) => {
          return <UnitItem item={item} onDetail={onDetail} />;
        })}
    </TreeItem>
  );
};
