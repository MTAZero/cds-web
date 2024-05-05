import { Box, Button } from "@mui/material";
import * as styles from "./index.styles";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { data, unitStatusData } from "./fake_data";
import { TableEntity } from "./components/table-entitys";
import { UnitItem } from "./unit-item";
import { useEffect, useState } from "react";
import { ModalComponent } from "../../components";
import { useAppSelector } from "hooks";
import { APIServices, NotificationService } from "utils";
import dayjs from "dayjs";

export const TroopReport: React.FC = () => {
  const [modalDetailUnitState, setModalDetailUnitState] =
    useState<boolean>(false);
  const [currentUnit, setCurrentUnit] = useState<any>(null);
  const [dataUnitCurrent, setDataUnitCurrent] = useState<any>([]);
  const [troopInfoUnit, setTroopInfoUnit] = useState<string>("");

  const [unitReportStatus, setUnitReportStatus] = useState<any>(null);
  const [dataUserCurrent, setDataUserCurrent] = useState<any>([]);

  const unitId = useAppSelector((state) => state.auth.info.unit);

  const [troopInfo, setTroopInfo] = useState<string>("");

  // load data
  const loadUnitStatusReport = async () => {
    try {
      const ans = await APIServices.TroopReport.loadUnitChildStatusReport(
        unitId,
        new Date().getTime()
      );
      setUnitReportStatus(ans);
    } catch {}
  };

  const loadListUserAndChilds = async () => {
    try {
      const ans = await APIServices.TroopReport.loadListUserTroopStatusOfUnit(
        unitId,
        new Date().getTime()
      );
      const { items } = ans;
      setDataUserCurrent(items);
    } catch {}
  };

  const loadTroopInfo = async () => {
    try {
      const ans = await APIServices.TroopReport.getTroopInfo(
        unitId,
        new Date().getTime()
      );
      setTroopInfo(ans);
    } catch {}
  };

  const reload = () => {
    loadUnitStatusReport();
    loadListUserAndChilds();
    loadTroopInfo();
  };

  useEffect(() => {
    reload();
  }, [unitId]);

  useEffect(() => {
    if (!modalDetailUnitState || !currentUnit) {
      setDataUnitCurrent([]);
      setTroopInfoUnit("");
      return;
    }

    const loadCurrentDataUnit = async () => {
      try {
        const ans =
          await APIServices.TroopReport.getListUserTroopStatusOfUnitTree(
            currentUnit?._id,
            new Date().getTime()
          );
        const { items } = ans;
        setDataUnitCurrent(items);

        const res = await APIServices.TroopReport.getTroopInfo(
          currentUnit?._id,
          new Date().getTime()
        );
        setTroopInfoUnit(res);
      } catch {
        setDataUnitCurrent([]);
      }
    };

    loadCurrentDataUnit();
  }, [modalDetailUnitState, currentUnit]);

  // handle report troop
  const handleReportTroops = async (
    absentTroops: Array<{ user: string; reason: string }>
  ) => {
    try {
      await APIServices.TroopReport.reportTroop(
        unitId,
        new Date().getTime(),
        absentTroops
      );

      reload();

      NotificationService.success("Báo quân số thành công");
    } catch {
      NotificationService.error("Báo quân số thất bại");
    }
  };

  const dateTime = dayjs(new Date());
  const formattedDate = dateTime.format("DD/MM/YYYY");

  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.dateSelectPanelStyle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* <label style={styles.normalTextStyle}>Ngày</label> */}
          {/* <DatePicker sx={styles.datePickerStyle} format="DD/MM/YYYY" /> */}
          <Box>{formattedDate}</Box>
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <label style={styles.normalTextStyle}>{troopInfo}</label>
        </Box>
      </Box>
      <Box sx={styles.contentPanelStyle}>
        <Box sx={styles.childStatusPanelStyle}>
          <Box sx={styles.titleStyle}>Tình hình quân số các đơn vị</Box>
          <SimpleTreeView defaultExpandedItems={[unitStatusData._id]}>
            {unitReportStatus && (
              <UnitItem
                onDetail={(item) => {
                  setModalDetailUnitState(true);
                  setCurrentUnit(item);
                }}
                item={unitReportStatus}
              />
            )}
          </SimpleTreeView>
        </Box>
        <Box sx={styles.currentUnitReportPanelStyle}>
          <Box sx={styles.titleStyle}>Cập nhật quân số trực tiếp</Box>
          <Box>
            <TableEntity
              data={dataUserCurrent}
              handleTroopReport={handleReportTroops}
              showButtonSave={true}
            />
          </Box>
        </Box>
      </Box>

      <ModalComponent
        visible={modalDetailUnitState}
        title={`${currentUnit?.name}`}
        onClose={function (): void {
          setModalDetailUnitState(false);
        }}
      >
        <Box>
          <Box sx={{ marginBottom: "10px", fontFamily: "Inter" }}>
            {troopInfoUnit}
          </Box>
          <TableEntity data={dataUnitCurrent} handleTroopReport={() => {}} />
        </Box>
      </ModalComponent>
    </Box>
  );
};
