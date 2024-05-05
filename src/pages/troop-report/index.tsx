import { Box } from "@mui/material";
import * as styles from "./index.styles";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { unitStatusData } from "./fake_data";
import { Entity, TableEntity } from "./components/table-entitys";
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
  const [troopInfoUnit, setTroopInfoUnit] = useState<string>("");

  const [unitReportStatus, setUnitReportStatus] = useState<any>(null);
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

  const loadTroopInfo = async () => {
    try {
      const ans = await APIServices.TroopReport.getTroopInfo(
        unitId,
        new Date().getTime()
      );
      setTroopInfo(ans);
    } catch {}
  };

  const loadListUserOfUnit = async (
    pageSize: number,
    pageIndex: number,
    textSearch: string,
    status: string,
    type: string
  ): Promise<{
    items: Array<Entity>;
    total: number;
    size: number;
    page: number;
  }> => {
    try {
      const ans = await APIServices.TroopReport.loadListUserTroopStatusOfUnit(
        unitId,
        new Date().getTime(),
        pageSize,
        pageIndex,
        textSearch,
        status,
        type
      );
      const { items, total, size, page } = ans;
      return {
        items,
        total,
        size,
        page,
      };
    } catch {}

    return null;
  };

  const loadListUserOfUnitTree = async (
    pageSize: number,
    pageIndex: number,
    textSearch: string,
    status: string,
    type: string
  ): Promise<{
    items: Array<Entity>;
    total: number;
    size: number;
    page: number;
  }> => {
    try {
      const ans =
        await APIServices.TroopReport.getListUserTroopStatusOfUnitTree(
          currentUnit?._id,
          new Date().getTime(),
          pageSize,
          pageIndex,
          textSearch,
          status,
          type
        );
      const { items, total, size, page } = ans;
      return {
        items,
        total,
        size,
        page,
      };
    } catch {}

    return null;
  };

  const reload = () => {
    loadUnitStatusReport();
    // loadListUserAndChilds();
    loadTroopInfo();
  };

  useEffect(() => {
    reload();
  }, [unitId]);

  useEffect(() => {
    if (!modalDetailUnitState || !currentUnit) {
      setTroopInfoUnit("");
      return;
    }

    const loadCurrentDataUnit = async () => {
      const res = await APIServices.TroopReport.getTroopInfo(
        currentUnit?._id,
        new Date().getTime()
      );
      setTroopInfoUnit(res);
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
          <Box>{formattedDate}</Box>
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <label style={styles.normalTextStyle}>{troopInfo}</label>
        </Box>
      </Box>
      <Box sx={styles.contentPanelStyle}>
        <Box sx={styles.childStatusPanelStyle}>
          <Box sx={styles.titleStyle}>Tình hình quân số các đơn vị</Box>
          <SimpleTreeView defaultExpandedItems={[unitId]}>
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
              handleTroopReport={handleReportTroops}
              showButtonSave={true}
              loadEntitys={loadListUserOfUnit}
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
          <TableEntity
            handleTroopReport={() => {}}
            loadEntitys={loadListUserOfUnitTree}
          />
        </Box>
      </ModalComponent>
    </Box>
  );
};
