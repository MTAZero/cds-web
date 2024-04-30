import React from "react";
import * as styles from "./styles";
import { Box } from "@mui/material";
import { Entity, TableEntity } from "./components/table-entitys";

import { data } from "./fake_data";

export const GuardSetting: React.FC = () => {
  const listEntities: Array<Entity> = data as Array<Entity>;

  return (
    <Box sx={styles.containerStyles}>
      {/* <div>Guard setting</div> */}

      <TableEntity
        data={listEntities}
        handleEdit={(entity) => {}}
        handleRemove={(entity) => {}}
      />
    </Box>
  );
};
