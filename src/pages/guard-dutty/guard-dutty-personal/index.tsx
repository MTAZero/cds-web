import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import * as styles from "./index.styles";
import {DatePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {APIServices, NotificationService} from "utils";
import {useAppSelector} from "hooks";
import {MAX_ENTITY_REQUEST} from "const";

export const GuardDuttyPersonalPage = () => {
  const [currentSelectDay, setCurrentDay] = useState<any>(null);

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [dataPending, setDataPending] = useState<Array<any>>([]);
  const userId = useAppSelector(state => state.auth.info._id);

  useEffect(() => {
    if (!dataPending) return;
    let currentNew = null;

    for (let index = 0; index < dataPending?.length; index++) {
      const dataTemp = dataPending[index];
      const day = dataTemp?.days?.find(
        i => i?.title === currentSelectDay?.title
      );
      if (day) currentNew = day;
    }
    setCurrentDay(currentNew);
  }, [dataPending]);

  const loadDataPending = async () => {
    const time = date.unix() * 1000;

    try {
      const ans = await APIServices.GuardDutty.getPersonalGuardDutty(
        userId,
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

    const {title, items} = dayItem;
    const day = title?.split("/")[0];
    return (
      <Box
        sx={styles.timePanelCellStyle}
        onClick={() => {
          setCurrentDay(dayItem);
        }}
      >
        <Box sx={styles.timePanelTitleStyle}>{day}</Box>
        <Box sx={styles.timePanelBodyStyle}>
          {items?.map((item, index) => {
            return (
              <Box sx={styles.positionItemStyle} key={index}>
                {item?.position?.name}
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
            onChange={value => {
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
