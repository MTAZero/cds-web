import { FC, useEffect, useState } from "react";
import * as styles from "./form-entity.styles";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Button, Checkbox, Popover } from "@mui/material";
import { FaDelicious, FaInfoCircle } from "react-icons/fa";

type TreeUserItemProps = {
  item: any;
  isUser?: boolean;
  onCheckUpdate: (item, value: boolean) => void;
  assignUsers: Array<any>;
  // onDetail: (item: any) => void;
};

export const TreeUserItem: FC<TreeUserItemProps> = ({
  item,
  isUser = false,
  onCheckUpdate,
  assignUsers,
}) => {
  if (!item) return null;
  const { users, name, childs } = item;

  if (isUser) {
    const { full_name, rank } = item;
    const isCheck = assignUsers.find((i) => i._id === item._id) ? true : false;

    return (
      <TreeItem
        itemId={item?._id}
        label={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={isCheck}
              onChange={(e, value) => onCheckUpdate(item, value)}
            />{" "}
            {rank ? rank + " " : ""} {full_name}
          </Box>
        }
      ></TreeItem>
    );
  }

  return (
    <TreeItem itemId={item?._id} label={<Box>{name}</Box>}>
      {users &&
        users.map((item: any) => {
          return (
            <TreeUserItem
              item={item}
              isUser={true}
              onCheckUpdate={onCheckUpdate}
              assignUsers={assignUsers}
            />
          );
        })}
      {childs &&
        childs.map((item: any) => {
          return (
            <TreeUserItem
              item={item}
              onCheckUpdate={onCheckUpdate}
              assignUsers={assignUsers}
              isUser={false}
            />
          );
        })}
    </TreeItem>
  );
};
