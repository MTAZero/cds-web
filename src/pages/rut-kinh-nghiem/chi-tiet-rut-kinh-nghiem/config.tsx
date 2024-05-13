import {months} from "const";
import {fieldType, formatTime} from "types";

const {INPUT, DATE, COMBO_BOX, TEXT_AREA} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const css2 = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields1: any[] = [
  {
    type: DATE,
    label: "Thời gian",
    name: "date",
    rules: [{required: true, message: "Chưa chọn thời gian"}],
    css: css,
    optionsTime: {format: formatTime.dateTime},
  },
  // {
  //   type: INPUT,
  //   label: "Nội dung",
  //   name: "content",
  //   css: css,
  //   options: months.map(e => ({value: e, label: e})),
  // },
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
