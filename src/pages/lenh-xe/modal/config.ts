import {fieldType} from "types";

const {INPUT, RADIO_VN} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
const fields = [
  {
    key: "label",
    name: "label",
    label: "Tên xe",
    type: INPUT,
    css: css,
  },
  {
    key: "license",
    name: "license",
    label: "Biển số",
    type: INPUT,
    css: css,
  },
  {
    key: "typeVehicle",
    name: "typeVehicle",
    label: "Loại xe",
    type: INPUT,
    css: css,
    rules: [{required: true, message: "Chưa nhập tên"}],
  },
  {
    key: "unitWork",
    name: "unitWork",
    label: "Đơn vị sử dụng",
    type: INPUT,
    css: css,
  },
  {
    key: "contentUse",
    name: "contentUse",
    label: "Nội dung công việc",
    type: INPUT,
    css: css,
  },
  {
    key: "distance",
    name: "distance",
    label: "Khoảng cách",
    type: INPUT,
    css: css,
  },
  {
    key: "lenhDotXuat",
    name: "lenhDotXuat",
    label: "Lệnh đột xuất??",
    type: RADIO_VN,
    css: css,
    defaultValue: false,
  },
];
export {fields};
