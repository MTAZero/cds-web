import { Box } from "@mui/material";

import * as styles from "./index.styles";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import dayjs, { Dayjs } from "dayjs";
import { APIServices } from "utils";
import { useAppSelector } from "hooks";

export const GuardDuttyUnitPage = () => {
  const [currentSelectDay, setCurrentDay] = useState<any>(null);

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [dataPending, setDataPending] = useState<Array<any>>([]);
  const unitId = useAppSelector((state) => state.auth.info.unit);

  useEffect(() => {
    if (!dataPending) return;
    let currentNew = null;

    for (let index = 0; index < dataPending?.length; index++) {
      const dataTemp = dataPending[index];
      const day = dataTemp?.days?.find(
        (i) => i?.title === currentSelectDay?.title
      );
      if (day) currentNew = day;
    }
    setCurrentDay(currentNew);
  }, [dataPending]);

  const loadDataPending = async () => {
    const time = date.unix() * 1000;

    try {
      const ans = await APIServices.GuardDutty.getUnitRootGuardDutty(
        unitId,
        time
      );
      setDataPending(ans);
    } catch {}
  };

  useEffect(() => {
    loadDataPending();
  }, [date]);

  const renderDayItem = (dayItem: any) => {
    if (dayItem?.isEmpty) return <Box sx={styles.timePanelCellEmptyStyle} />;

    const { title, total, is_complete, items } = dayItem;
    const day = title?.split("/")[0];
    let _class =
      dayItem === currentSelectDay
        ? styles.timePanelCellSelectStyle
        : styles.timePanelCellStyle;

    return (
      <Box
        sx={_class}
        onClick={() => {
          setCurrentDay(dayItem);
        }}
      >
        <Box sx={styles.timePanelTitleStyle}>{day}</Box>
        <Box sx={styles.timePanelBodyStyle}>
          {items?.map((item, index) => {
            if (index >= 3) return null;
            return (
              <Box sx={styles.positionItemStyle} key={index}>
                <Box>{item?.position?.name}</Box>
                <Box>{item?.user_assign?.full_name}</Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.mainContentStyle}>
        <Box sx={styles.selectTimePanelStyle}>
          <DatePicker
            sx={{
              fontFamily: "Inter",
              fontSize: "13px",
              fontWeight: "bold",
            }}
            label={"Chọn tháng"}
            views={["month", "year"]}
            format="MM/YYYY"
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
        </Box>
        <Box sx={styles.timePanelStyle}>
          <Box sx={styles.timePanelRowStyle}>
            <Box sx={styles.timePanelHeaderCellStyle}>Thứ hai</Box>
            <Box sx={styles.timePanelHeaderCellStyle}>Thứ ba</Box>
            <Box sx={styles.timePanelHeaderCellStyle}>Thứ tư</Box>
            <Box sx={styles.timePanelHeaderCellStyle}>Thứ năm</Box>
            <Box sx={styles.timePanelHeaderCellStyle}>Thứ sáu</Box>
            <Box sx={styles.timePanelHeaderCellStyle}>Thứ bảy</Box>
            <Box sx={styles.timePanelHeaderCellStyle}>Chủ nhật</Box>
          </Box>
          {dataPending.map((weekItem, index) => {
            const days = weekItem.days;
            if (days.length === 0) return;

            let daysData = [];
            if (days.length < 7 && days[0]?.dayOfWeek !== 1) {
              for (let index = 0; index < 7 - days.length; index++)
                daysData.push({
                  isEmpty: true,
                });

              daysData = [...daysData, ...days];
            } else {
              daysData = [...days];
              for (let index = 0; index < 7 - days.length; index++)
                daysData.push({
                  isEmpty: true,
                });
            }

            return (
              <Box sx={styles.timePanelRowStyle} key={`week-${index}`}>
                {daysData.map((dayItem, i) => {
                  return renderDayItem(dayItem);
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
      {currentSelectDay && (
        <Box sx={styles.detailGuardDuttyPanel}>
          <Box sx={styles.detailPanelTitleStyle}>
            <Box>Ngày {currentSelectDay?.title}</Box>
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentDay(null)}
            />
          </Box>
          <Box sx={styles.detailPanelMainContent}>
            {currentSelectDay?.items &&
              Array.isArray(currentSelectDay?.items) &&
              currentSelectDay?.items?.map((item: any, indexP) => {
                return (
                  <Box
                    sx={{
                      ...styles.detaiPanelRowStyle,
                      ...{
                        background: item?.is_complete ? "white" : "#ffd9b3",
                      },
                    }}
                    key={`${currentSelectDay?.items?.title} - ${indexP}`}
                  >
                    <Box sx={styles.detaiPanelRowContentStyle}>
                      <Box sx={styles.detailPanelRowLabelStyle}>
                        {item?.position?.name}
                      </Box>
                      {item?.is_complete ? (
                        <Box sx={styles.detailPanelRowValueStyle}>
                          {item?.user_assign?.rank +
                            " " +
                            item?.user_assign?.full_name}
                        </Box>
                      ) : (
                        <Box sx={styles.detailPanelRowValueStyle}>
                          {item?.unit_assign?._id !== unitId &&
                            `Đã giao ${item?.unit_assign?.name} - `}
                          Chưa phân công
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      )}
    </Box>
  );
};
