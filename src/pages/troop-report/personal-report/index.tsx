import { Box, Button, MenuItem, Select } from "@mui/material";
import * as styles from "./index.styles";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector } from "hooks";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { APIServices } from "utils";
import { selectTroopData } from "types";

export const PersonalReport: React.FC = () => {
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

    const { title } = dayItem;
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
          {day % 7 === 1 || day % 7 == 2 ? (
            <Box
              sx={{ ...styles.positionItemStyle, ...{ background: "orange" } }}
            >
              <Box>Nghỉ cuối tuần</Box>
            </Box>
          ) : (
            <Box sx={styles.positionItemStyle}>
              <Box>Có mặt</Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.personalReportStyle}>
        <DatePicker
          sx={{
            fontFamily: "Inter",
            fontSize: "13px",
            fontWeight: "bold",
          }}
          label={"Chọn ngày"}
          // views={["month", "year"]}
          format="DD/MM/YYYY"
          // value={date}
          // onChange={(value) => {
          //   setDate(value);
          // }}
        />
        <Box>
          <Select
            size={"small"}
            // value={item.status ? item.status : TroopStatus.CoMat}
            sx={styles.selectStatusStyle}
            // onChange={(e) =>
            //   _updateStatus(item._id, e.target.value as TroopStatus)
            // }
          >
            {selectTroopData.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={styles.personaleReportButtonStyle}>Cập nhật</Button>
        </Box>
      </Box>
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
    </Box>
  );
};
