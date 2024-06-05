import {months, weeks} from "const";
import {fieldType, formatTime} from "types";

const {INPUT, DATE, COMBO_BOX, TEXT_AREA, TIME, INPUT_NUMBER} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields1: any[] = [
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    rules: [{required: true, message: "Chưa chọn đơn vị"}],
    css: css,
  },
  {
    type: INPUT,
    label: "Nội dung công tác",
    name: "contentUse",
    rules: [{required: true, message: "Chưa nhập nội dung"}],
    css: css,
  },
  {
    type: INPUT,
    label: "Địa điểm",
    name: "location",
    rules: [{required: true, message: "Chưa nhập địa điểm"}],
    css: css,
  },
  {
    type: INPUT,
    label: "Khoảng cách",
    name: "distance",
    rules: [{required: true, message: "Chưa nhập địa điểm"}],
    css: css,
  },
  {
    type: DATE,
    label: "Xuất phát",
    name: "fromDateTime",
    optionsTime: {format: formatTime.dateTime},
    css: css,
    disableDate: false,
  },
  {
    type: DATE,
    label: "Thời gian về",
    name: "toDateTime",
    optionsTime: {format: formatTime.dateTime},
    css: css,
    disableDate: false,
  },
  // {
  //   type: COMBO_BOX,
  //   label: "Lái xe",
  //   name: "driver",
  //   optionsTime: {format: formatTime},
  //   css: css,
  // },
  // {
  //   type: INPUT,
  //   label: "Bằng xe",
  //   name: "license",
  //   optionsTime: {format: formatTime},
  //   css: css,
  // },
];

export {fields1};
