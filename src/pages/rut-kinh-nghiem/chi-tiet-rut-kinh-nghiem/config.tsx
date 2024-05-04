import {months} from "const";
import {fieldType, formatTime} from "types";

const {INPUT, DATE, COMBO_BOX, TEXT_AREA} = fieldType;
const css = {xs: 24, sm: 24, md: 12, lg: 12, xl: 12};
const css2 = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields1: any[] = [
  {
    type: DATE,
    label: "Thời gian",
    name: "nam",
    rules: [{required: true, message: "Chưa chọn năm"}],
    css: css,
    optionsTime: {format: formatTime.dayFull},
  },
  {
    type: INPUT,
    label: "Nội dung",
    name: "content",
    css: css,
    options: months.map(e => ({value: e, label: e})),
  },
  {
    type: INPUT,
    label: "Tham gia",
    name: "thang",
    css: css,
    options: months.map(e => ({value: e, label: e})),
  },
  {
    type: TEXT_AREA,
    label: "Kết quả huấn luyện",
    name: "ket_qua",
    css: css2,
    options: months.map(e => ({value: e, label: e})),
  },
  {
    type: TEXT_AREA,
    label: "Ưu, khuyết điểm",
    name: "thang",
    css: css2,
    options: months.map(e => ({value: e, label: e})),
  },
  {
    type: TEXT_AREA,
    label: "Nhiệm vụ huấn luyện tháng sau",
    name: "thang",
    css: css2,
    options: months.map(e => ({value: e, label: e})),
  },
];

export {fields1};
