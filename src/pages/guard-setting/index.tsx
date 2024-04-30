import React from "react";
import * as styles from "./styles";
import { Box, Button, Pagination, TablePagination } from "@mui/material";
import { Entity, TableEntity } from "./components/table-entitys";

import { data } from "./fake_data";
import { FaPlus, FaSearch } from "react-icons/fa";

export const GuardSetting: React.FC = () => {
  const listEntities: Array<Entity> = data as Array<Entity>;

  return (
    <Box sx={styles.containerStyles}>
      <Box sx={styles.controlPanelStyle}>
        <Box sx={styles.searchBoxStyle}>
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm"
            style={styles.searchTextBoxStyle}
          />
        </Box>
        <Button sx={styles.buttonAddStyle}>
          <FaPlus />
          Thêm vị trí trực
        </Button>
      </Box>

      <TableEntity
        data={listEntities}
        handleEdit={(entity) => {}}
        handleRemove={(entity) => {}}
      />

      <Box sx={styles.paginatePanelStyle}>
        <TablePagination
          component="div"
          count={1000}
          page={1}
          onPageChange={() => {}}
          rowsPerPage={10}
          onRowsPerPageChange={() => {}}
          showFirstButton={true}
          showLastButton={true}
        />
      </Box>
    </Box>
  );
};
