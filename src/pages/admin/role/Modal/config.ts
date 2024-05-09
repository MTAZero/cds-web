import {fieldType} from "types";

const {INPUT, COMBO_BOX} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields = [
  {key: "_id", name: "_id", type: INPUT, hide: true},
  {
    key: "Tên",
    name: "name",
    type: INPUT,
    label: "Tên",
    css: css,
    rules: [{required: true, message: "Bắt buộc nhập tên role"}],
  },

  {
    key: "description",
    name: "description",
    type: INPUT,
    label: "Mô tả",
    css: css,
  },
];
export {fields};
