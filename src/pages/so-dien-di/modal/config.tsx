import {ranks} from "const";
import {fieldType, formatTime} from "types";

const {INPUT, DATE, TEXT_AREA, COMBO_BOX, AUTO_COMPLETE} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
const css2 = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const wrapperCol = {xs: 14, md: 16, xl: 21, lg: 21};
const labelCol = {xs: 10, md: 4, xl: 3, lg: 3};
const fields1: any[] = [
  {
    key: "dateTransfer",
    name: "dateTransfer",
    label: "Thời gian",
    type: DATE,
    optionsTime: {format: formatTime.dateTime},
    css: css,
  },
  {
    key: "personTransfer",
    name: "personTransfer",
    label: "Người truyền điện",
    type: AUTO_COMPLETE,
    css: css,
  },
  {
    key: "rankTransfer",
    name: "rankTransfer",
    label: "Cấp bậc",
    type: COMBO_BOX,
    options: ranks.map(e => ({label: e, value: e})),
    css: css,
  },
  {
    key: "positionTransfer",
    name: "positionTransfer",
    label: "Chức vụ",
    type: INPUT,
    css: css,
  },
  {
    key: "unitIdTransfer",
    name: "unitIdTransfer",
    label: "Đơn vị",
    type: COMBO_BOX,
    css: css,
  },
  {
    key: "telephoneNumberTransfer",
    name: "telephoneNumberTransfer",
    label: "Điện thoại liên hệ",
    type: INPUT,
    css: css,
  },
];
const fields2: any[] = [
  {
    key: "personReceived",
    name: "personReceived",
    label: "Người nhận điện",
    type: INPUT,
    css: css,
  },
  {
    key: "rankReceived",
    name: "rankReceived",
    label: "Cấp bậc",
    type: COMBO_BOX,
    options: ranks.map(e => ({label: e, value: e})),
    css: css,
  },
  {
    key: "positionReceived",
    name: "positionReceived",
    label: "Chức vụ",
    type: INPUT,
    css: css,
  },
  {
    key: "unitIdReceived",
    name: "unitIdReceived",
    label: "Đơn vị",
    type: COMBO_BOX,
    css: css,
  },

  {
    key: "idLeader",
    name: "idLeader",
    label: "Chỉ huy",
    type: COMBO_BOX,
    css: css,
  },
];
const fields3: any[] = [
  {
    key: "content",
    name: "content",
    label: "Nội dung điện",
    type: TEXT_AREA,
    css: css2,
    wrapperCol,
    labelCol,
    rows: 5,
  },
];
export {fields1, fields2, fields3};
