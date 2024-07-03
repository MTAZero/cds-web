import {fieldType} from "types";

const {INPUT} = fieldType;
const columns: any = [
  {
    title: "STT",
    key: "index",
  },

  {
    type: INPUT,
    title: "Tên nhiên liệu",
    key: "fuelName",
    dataIndex: "fuelName",
    rules: [{required: true, message: "Chưa nhập tên xe"}],
  },

  {
    key: "action",
    dataIndex: "action",
    width: 60,
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
