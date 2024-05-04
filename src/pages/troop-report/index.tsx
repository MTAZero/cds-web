import { Box, Button } from "@mui/material";
import * as styles from "./index.styles";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { data, unitStatusData } from "./fake_data";
import { TableEntity } from "./components/table-entitys";
import { TroopStatus } from "../../types";
import { UnitItem } from "./unit-item";
import { useState } from "react";
import { ModalComponent } from "../../components";

export const TroopReport: React.FC = () => {
  const [modalDetailUnitState, setModalDetailUnitState] =
    useState<boolean>(false);
  const [currentUnit, setCurrentUnit] = useState<any>(null);

  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.dateSelectPanelStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <label style={styles.normalTextStyle}>Ngày</label>
          <DatePicker sx={styles.datePickerStyle} format="DD/MM/YYYY" />
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <label style={styles.normalTextStyle}>
            Quân số Trung tâm 1: Có mặt: 02/05(SQ: 02/04; QNCN: 00/01). Vắng: 03
            (Trong đó: nghỉ cuối tuần: 01; công tác: 01; đi học: 01)
          </label>
        </Box>
      </Box>
      <Box sx={styles.contentPanelStyle}>
        <Box sx={styles.childStatusPanelStyle}>
          <Box sx={styles.titleStyle}>Tình hình quân số các đơn vị</Box>
          <SimpleTreeView defaultExpandedItems={[unitStatusData._id]}>
            <UnitItem
              onDetail={(item) => {
                setModalDetailUnitState(true);
                setCurrentUnit(item);
              }}
              item={unitStatusData}
            />
          </SimpleTreeView>
        </Box>
        <Box sx={styles.currentUnitReportPanelStyle}>
          <Box sx={styles.titleStyle}>Cập nhật quân số trực tiếp</Box>
          <Box>
            <TableEntity
              data={data}
              handleUpdateStatus={function (
                entity: string,
                status: TroopStatus
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={styles.buttonSaveStyle}>
              Cập nhật tình hình quân số
            </Button>
          </Box>
        </Box>
      </Box>

      <ModalComponent
        visible={modalDetailUnitState}
        title={`${currentUnit?.name} (${currentUnit?.troop_info?.totalAttendance}/${currentUnit?.troop_info?.total})`}
        onClose={function (): void {
          setModalDetailUnitState(false);
        }}
      >
        <Box>
          <TableEntity
            data={data}
            handleUpdateStatus={function (
              entity: string,
              status: TroopStatus
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};
