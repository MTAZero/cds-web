import {fieldType} from "types";

const {INPUT, COMBO_BOX} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields = [
  {
    key: "name",
    name: "name",
    type: INPUT,
    label: "Đơn vị",
    css: css,
    rules: [{required: true, message: "Bắt buộc nhập chức vụ"}],
  },
  {
    key: "description",
    name: "description",
    type: INPUT,
    label: "Mô tả",
    css: css,
  },
  {
    key: "parent",
    name: "parent",
    type: COMBO_BOX,
    label: "Đơn vị cấp trên",
    css: css,
  },
];
export {fields};
