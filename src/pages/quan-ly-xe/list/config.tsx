import {message} from "antd";
import {months, weeks} from "const";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";

const {COMBO_BOX, DATE, INPUT} = fieldType;
const columns: any = [
  {
    type: INPUT,
    title: "Tên xe",
    key: "name",
    dataIndex: "name",
    rules: [{required: true, message: "Chưa nhập tên xe"}],
  },
  {
    type: INPUT,
    title: "Biển số",
    key: "license",
    dataIndex: "license",
    rules: [{required: true, message: "Chưa nhập biển số xe"}],
  },
  {
    type: INPUT,
    title: "Định mức",
    key: "norm",
    dataIndex: "norm",
  },
  {
    type: INPUT,
    title: "Họ tên lái xe",
    key: "driver",
    dataIndex: "driver",
  },
  {
    key: "action",
    dataIndex: "action",
  },
];

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
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Tuần",
    name: "week",
    options: weeks.map((e: any) => ({value: e, label: e})),
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    allowClear: false,
  },
];

export {columns, fields};
