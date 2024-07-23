import {fieldType} from "types";

const {INPUT, DATE, NUMBER, COMBO_BOX} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
const fields: any[] = [
  {
    key: "documentName",
    name: "documentName",
    label: "Tên tài liệu huấn luyện",
    type: INPUT,
    css: css,
  },
  {
    key: "unitId",
    name: "unitId",
    label: "Đơn vị",
    type: COMBO_BOX,
    css: css,
  },
  {
    key: "dvt",
    name: "dvt",
    label: "Đơn vị tính",
    type: INPUT,
    css: css,
  },
  {
    key: "sum",
    name: "sum",
    label: "Số lượng",
    type: NUMBER,
    css: css,
  },
  {
    key: "publishYear",
    name: "publishYear",
    label: "Năm xuất bản",
    type: INPUT,
    css: css,
  },
  {
    key: "numberRegister",
    name: "numberRegister",
    label: "Sô đăng ký bảo mật",
    type: INPUT,
    css: css,
  },
  {
    key: "receivedDate",
    name: "receivedDate",
    label: "Ngày nhận",
    type: DATE,
    css: css,
    disableDate: false,
  },
  {
    key: "receiver",
    name: "receiver",
    label: "Người nhận",
    type: INPUT,
    css: css,
  },
  {
    key: "paidDate",
    name: "paidDate",
    label: "Ngày trả",
    type: DATE,
    css: css,
    disableDate: false,
  },
  {
    key: "payer",
    name: "payer",
    label: "Người trả",
    type: INPUT,
    css: css,
  },
  {
    key: "sumRemain",
    name: "sumRemain",
    label: "Số lượng còn",
    type: NUMBER,
    css: css,
  },
  {
    key: "note",
    name: "note",
    label: "Ghi chú",
    type: INPUT,
    css: css,
  },
];

export {fields};
