import { Box } from "@mui/material";
import * as styles from "./index.styles";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Entity, TableEntity } from "../guard-setting/components/table-entitys";
import { data } from "../guard-setting/fake_data";

export const TroopReport: React.FC = () => {
  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.dateSelectPanelStyle}>
        <Box>
          <label>Ngày</label>
          <DatePicker format="DD/MM/YYYY" />
        </Box>
        <Box>
          <label>
            Quân số Cụm 12: Chưa đủ quân số
          </label>
        </Box>
      </Box>
      <Box sx={styles.contentPanelStyle}>
        <Box sx={styles.childStatusPanelStyle}>
          <Box sx={styles.titleStyle}>Tình hình quân số các đơn vị</Box>
          <Box>
            <SimpleTreeView>
              <TreeItem itemId="grid" label="Data Grid">
                <TreeItem itemId="grid-community" label="Cụm 11 (Chưa báo quân số)" />
                <TreeItem itemId="grid-pro" label="Cụm 12 (22/28)">
                  <TreeItem itemId="c5" label="Đội 5 (4/5)" />
                  <TreeItem itemId="c6" label="Đội 6 (5/6)" />
                  <TreeItem itemId="c7" label="Đội 7 (8/9)" />
                  <TreeItem itemId="c8" label="Đội 8 (1/1)" />
                </TreeItem>
                <TreeItem itemId="grid-premium" label={<Box>Cụm 13 (Chưa báo quân số)</Box>} />
              </TreeItem>
            </SimpleTreeView>
          </Box>
        </Box>
        <Box sx={styles.currentUnitReportPanelStyle}>
          <Box sx={styles.titleStyle}>Cập nhật quân số trực tiếp</Box>
          <Box>
            <TableEntity
              data={data}
              handleEdit={function (entity: Entity): void {
                throw new Error("Function not implemented.");
              }}
              handleRemove={function (entity: Entity): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Box>
          <Box>Cập nhật</Box>
        </Box>
      </Box>
    </Box>
  );
};
