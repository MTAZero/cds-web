import {months, weeks} from "const";
import {fieldType, formatTime} from "types";

const {INPUT, DATE, COMBO_BOX, TEXT_AREA, TIME} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const css2 = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields1: any[] = [
  {
    type: TIME,
    label: "Thời gian",
    name: "time",
    rules: [{required: true, message: "Chưa chọn thời gian"}],
    css: css,
    optionsTime: {format: formatTime.time_24h},
  },
  {
    type: DATE,
    label: "Ngày",
    name: "date",
    disableDate: false,
    rules: [{required: true, message: "Chưa nhập ngày"}],
    css: css,
  },
  // {
  //   type: COMBO_BOX,
  //   label: "Tháng",
  //   name: "month",
  //   css: css,
  //   options: months.map(e => ({value: e, label: e})),
  //   rules: [{required: true, message: "Chưa chọn tháng"}],
  // },
  // {
  //   type: DATE,
  //   label: "Năm",
  //   name: "year",
  //   rules: [{required: true, message: "Chưa chọn năm"}],
  //   css: css,
  //   picker: "year",
  //   optionsTime: {format: "YYYY"},
  // },

  {
    type: COMBO_BOX,
    label: "Tuần",
    name: "week",
    css: css,
    options: weeks.map(e => ({value: e, label: e})),
    rules: [{required: true, message: "Chưa chọn tuần"}],
  },
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    css: css,
    rules: [{required: true, message: "Chưa nhập đơn vị"}],
  },
  {
    type: INPUT,
    label: "Tham gia",
    name: "join",
    css: css,
  },
  {
    type: TEXT_AREA,
    label: "Kết quả huấn luyện",
    name: "resultTraining",
    css: css2,
    options: months.map(e => ({value: e, label: e})),
  },
  {
    type: TEXT_AREA,
    label: "Ưu, khuyết điểm",
    name: "evaluation",
    css: css2,
  },
  {
    type: TEXT_AREA,
    label: "Nhiệm vụ huấn luyện tháng sau",
    name: "dutyNextWeek",
    css: css2,
  },
];

export {fields1};
