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
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { ModalComponent } from "components";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs, { Dayjs } from "dayjs";
import { APIServices, NotificationService } from "utils";
import { useAppSelector } from "hooks";
import { MAX_ENTITY_REQUEST } from "const";

export const UpdateGuardDuttyPage = () => {
  const [currentSelectDay, setCurrentDay] = useState<any>(null);

  const [modalUpdateState, setModalUpdateState] = useState<boolean>(false);
  const [currentGuardDutty, setCurrentGuardDutty] = useState<any>(null);
  const [isSendToChild, setIsSendToChild] = useState<boolean>(false);
  const [selectUnit, setSelectUnit] = useState<any>(null);
  const [selectUser, setSelectUser] = useState<any>(null);

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [dataPending, setDataPending] = useState<Array<any>>([]);
  const unitId = useAppSelector((state) => state.auth.info.unit);

  const [units, setUnits] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);

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
      const ans = await APIServices.GuardDutty.getListGuardDuttyPendingOfUnit(
        unitId,
        time
      );
      setDataPending(ans);
    } catch {}
  };

  const loadChildUnit = async () => {
    try {
      const data = await APIServices.Unit.getUnitChild(unitId);
      setUnits(data);
    } catch {}
  };

  const loadUserOfTreeUnit = async () => {
    try {
      const data = await APIServices.User.getListUserOfTreeUnit(
        unitId,
        1,
        MAX_ENTITY_REQUEST
      );
      const { items } = data;
      setUsers(items);
    } catch {}
  };

  useEffect(() => {
    loadUserOfTreeUnit();
    loadChildUnit();
  }, []);

  useEffect(() => {
    loadDataPending();
  }, [date]);

  const handleSave = async (
    id: string,
    isSendToChild: boolean,
    value: string
  ) => {
    try {
      await APIServices.GuardDutty.updateGuardDutty(id, isSendToChild, value);

      NotificationService.success("Phân công lịch trực thành công");
      loadDataPending();
      setModalUpdateState(false);
    } catch {
      NotificationService.error("Phân công lịch trực thất bại");
    }
  };

  const renderDayItem = (dayItem: any) => {
    if (dayItem?.isEmpty) return <Box sx={styles.timePanelCellEmptyStyle} />;

    const { isComplete, isCompleteAssign, title, total } = dayItem;
    const day = title?.split("/")[0];
    let _class =
      dayItem === currentSelectDay
        ? styles.timePanelCellSelectStyle
        : {
            ...styles.timePanelCellStyle,
            ...{ background: isComplete ? "#99ff99" : "white" },
          };

    let text = !isCompleteAssign ? "Đang phân công" : "Đang xếp lịch";
    let color = "black";
    if (isComplete) color = "green";
    if (dayItem === currentSelectDay) color = "white";

    return (
      <Box
        sx={_class}
        onClick={() => {
          setCurrentDay(dayItem);
        }}
      >
        <Box sx={styles.timePanelTitleStyle}>{day}</Box>
        <Box sx={styles.timePanelBodyStyle}>
          <Box
            sx={{
              ...styles.timePanelInfoStyle,
              ...{ color },
            }}
          >
            {total} vị trí
          </Box>
          <Box
            sx={
              isComplete
                ? { ...styles.timePanelInfoCompleteStyle, ...{ color } }
                : styles.timePanelInfoStyle
            }
          >
            {!isComplete ? text : "Đã hoàn thành"}
          </Box>
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
            Ngày {currentSelectDay?.title}
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
                    onClick={() => {
                      setCurrentGuardDutty(item);
                      setModalUpdateState(true);

                      if (item?.is_complete === true) {
                        setIsSendToChild(false);
                        setSelectUnit(null);

                        const user = users.find(
                          (i) => i._id === item?.user_assign?._id
                        );

                        setSelectUser(user);
                      } else {
                        if (item?.unit_assign?._id !== unitId) {
                          setIsSendToChild(true);
                          setSelectUnit(
                            units.find((i) => i._id === item?.unit_assign?._id)
                          );
                          setSelectUser(null);
                          return;
                        }

                        setIsSendToChild(false);
                        setSelectUnit(null);
                        setSelectUser(null);
                      }
                    }}
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
                    <Box>
                      <Box sx={styles.editGuardDuttyButtonStyle}>
                        <FaEdit />
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      )}
      <ModalComponent
        visible={modalUpdateState}
        title={"Cập nhật vị trí trực"}
        onClose={() => {
          setModalUpdateState(false);
        }}
      >
        <Box sx={styles.modalUpdateContainerStyle}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={isSendToChild}
            onChange={(e) => {
              setIsSendToChild(
                e.target.value.toString() === "true" ? true : false
              );
            }}
            sx={styles.modalLabelStyle}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Giao trực tiếp cho cán bộ"
            />
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Giao cho đơn vị cấp dưới"
            />
          </RadioGroup>
          {isSendToChild ? (
            <Autocomplete
              disablePortal
              id="combo-box-units"
              options={units}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option.name}
              renderOption={(props: any, option) => {
                return <Box {...props}>{option.name}</Box>;
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn đơn vị" />
              )}
              onChange={(e, value) => {
                setSelectUnit(value);
              }}
              value={selectUnit}
            />
          ) : (
            <Autocomplete
              disablePortal
              id="combo-box-units"
              options={users}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option.rank + " " + option.full_name}
              renderOption={(props: any, option) => {
                return (
                  <Box {...props}>{option.rank + " " + option.full_name}</Box>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn cán bộ" />
              )}
              onChange={(e, value) => {
                setSelectUser(value);
              }}
              value={selectUser}
            />
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={styles.buttonSaveStyle}
              disabled={
                !(
                  (!isSendToChild && selectUser) ||
                  (isSendToChild && selectUnit)
                )
              }
              onClick={() =>
                handleSave(
                  currentGuardDutty._id,
                  isSendToChild,
                  isSendToChild ? selectUnit?._id : selectUser?._id
                )
              }
            >
              <FaSave />
              Cập nhật
            </Button>
          </Box>
        </Box>
      </ModalComponent>
    </Box>
  );
};
