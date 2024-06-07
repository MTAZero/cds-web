import { Box, Button, MenuItem, Select } from "@mui/material";
import * as styles from "./index.styles";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { APIServices } from "utils";
import { TroopStatus, getTextByStatus, selectTroopData } from "types";

export const PersonalReport: React.FC = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [dataPending, setDataPending] = useState<Array<any>>([]);

  const [dateReport, setDateReport] = useState<Dayjs>(dayjs());
  const [statusReport, setStatusReport] = useState<TroopStatus>(null);

  const loadDataPending = async () => {
    const time = date.unix() * 1000;

    try {
      const ans = await APIServices.TroopReport.getPersonalReportByMonth(time);
      setDataPending(ans);
    } catch {}
  };

  useEffect(() => {
    loadDataPending();
  }, [date]);

  const handleReport = async () => {
    try {
      const time = dateReport.unix() * 1000;
      await APIServices.TroopReport.personalReport(time, statusReport);

      loadDataPending();
    } catch {}
  };

  const renderDayItem = (dayItem: any) => {
    if (dayItem?.isEmpty) return <Box sx={styles.timePanelCellEmptyStyle} />;

    const { title } = dayItem;
    const day = title?.split("/")[0];
    let _class = styles.timePanelCellStyle;

    const { items } = dayItem;
    return (
      <Box
        sx={_class}
        onClick={() => {
          if (title) {
            const [day, month, year] = title.split("/").map(Number);
            const dt = dayjs(new Date(year, month - 1, day));

            setDateReport(dt);

            if (dayItem?.items[0]) {
              setStatusReport(dayItem?.items[0]?.status);
            } else setStatusReport(null);
          }
        }}
      >
        <Box sx={styles.timePanelTitleStyle}>{day}</Box>
        <Box sx={styles.timePanelBodyStyle}>
          {items.map((item, index) => {
            let color = "#98e698";
            if (item.status !== TroopStatus.CoMat) color = "#ff9966";

            return (
              <Box
                sx={{
                  ...styles.positionItemStyle,
                  ...{ background: color },
                }}
                key={index}
              >
                {getTextByStatus(item?.status)}
              </Box>
            );
          })}
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
          format="DD/MM/YYYY"
          value={dateReport}
          onChange={(value) => {
            setDateReport(value);
          }}
        />
        <Box>
          <Select
            size={"small"}
            value={statusReport}
            sx={styles.selectStatusStyle}
            onChange={(e) => setStatusReport(e.target.value as TroopStatus)}
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
          <Button
            disabled={!dateReport || !statusReport}
            sx={styles.personaleReportButtonStyle}
            onClick={handleReport}
          >
            Cập nhật
          </Button>
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
