import {fieldType} from "types";

const {INPUT, NUMBER} = fieldType;
const columns: any = [
  {
    title: "STT",
    key: "index",
  },

  {
    type: INPUT,
    title: "Địa điểm",
    key: "address",
    dataIndex: "address",
  },
  {
    type: INPUT,
    title: "Đơn vị",
    key: "unitName",
    dataIndex: "unitName",
  },
  {
    type: NUMBER,
    title: "Khoảng cách",
    key: "distance",
    dataIndex: "distance",
  },

  {
    key: "action",
    dataIndex: "action",
    width: 60,
  },
];

export {columns};
