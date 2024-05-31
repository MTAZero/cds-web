import {message} from "antd";
import {months, weeks} from "const";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";

const {INPUT} = fieldType;
const columns: any = [
  {
    title: "STT",
    key: "index",
    dataIndex: "index",
  },

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
    type: INPUT,
    label: "Tên xe",
    name: "year",
  },
  {
    type: INPUT,
    label: "Biển số",
    name: "year",
  },
  {
    type: INPUT,
    label: "Định mức",
    name: "year",
  },
  {
    type: INPUT,
    label: "Họ tên lái xe",
    name: "year",
  },
];

export {columns, fields};
