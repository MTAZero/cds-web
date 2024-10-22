import {message} from "antd";
import {months, weeks} from "const";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";

const {INPUT, COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    title: "STT",
    key: "index",
  },

  {
    type: COMBO_BOX,
    title: "Họ tên",
    key: "personId",
    dataIndex: "personId",
    rules: [{required: true, message: "Chưa chọn"}],
    width: 250,
  },
  {
    type: COMBO_BOX,
    title: "Đơn vị",
    key: "unitId",
    dataIndex: "unitId",
    rules: [{required: true, message: "Chưa chọn đơn vị"}],
    width: 150,
  },
  {
    type: DATE,
    title: "Từ ngày",
    key: "fromDate",
    dataIndex: "fromDate",
    width: 180,
  },
  {
    type: DATE,
    title: "Đến ngày",
    key: "toDate",
    dataIndex: "toDate",
    width: 180,
  },
  {
    type: INPUT,
    title: "Lý do",
    key: "reason",
    dataIndex: "reason",
  },

  {
    key: "action",
    dataIndex: "action",
    width: 60,
  },
];

const fields: any = [
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unitId",
  },
];
export {columns, fields};
