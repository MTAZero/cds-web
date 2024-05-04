import {months} from "const";
import {fieldType} from "types";

const {COMBO_BOX, DATE, INPUT} = fieldType;
const fields: any = [
  {
    type: DATE,
    label: "Năm",
    name: "year",
    picker: "year",
    optionsTime: {format: "YYYY"},
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Tháng",
    options: months.map(e => ({value: e, label: e})),
    name: "month",
  },
  {
    type: INPUT,
    label: "Nội dung",
    options: months.map(e => ({value: e, label: e})),
    name: "content",
  },
];
const columns: any[] = [
  {
    key: "index",
    dataIndex: "index",
    width: 80,
  },
  {
    key: "thoi_gian",
    dataIndex: "thoi_gian",
    title: "Thời gian huấn luyện",
    align: "center",
    width: 180,
  },
  {
    key: "noi_dung",
    dataIndex: "noi_dung",
    title: "Nội dung huấn luyện",
    align: "left",
  },
  {
    key: "ket_qua",
    dataIndex: "ket_qua",
    title: "Điểm",
    align: "center",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    align: "center",
  },
];
const data = [
  {thoi_gian: "09:00 15/4/2024", noi_dung: "Huấn luyện nội bộ", ket_qua: 8},
  {thoi_gian: "09:00 15/4/2024", noi_dung: "Huấn luyện nội bộ", ket_qua: 9},
];
export {columns, data, fields};
