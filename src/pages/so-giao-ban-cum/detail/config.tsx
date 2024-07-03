import {fieldType, formatTime} from "types";

const {DATE, COMBO_BOX, TEXT_AREA} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields1: any[] = [
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    css: css,
    rules: [{required: true, message: "Bắt buộc nhập"}],
  },
  {
    type: DATE,
    label: "Ngày",
    name: "date",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
    disableDate: false,
  },
  {
    type: COMBO_BOX,
    label: "Trực chỉ huy",
    name: "dutyLeader",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
  },
  {
    type: COMBO_BOX,
    label: "Trực ƯCSC",
    name: "dutySecondPerson",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
  },
  {
    type: COMBO_BOX,
    label: "Trực tác chiến",
    name: "dutyThirdPerson",
    css: css,
  },
  {
    type: TEXT_AREA,
    label: "Vũ khí, trang bị",
    name: "weaponsEquipment",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
    rows: 3,
  },
  {
    type: TEXT_AREA,
    label: "Điểm mạnh",
    name: "advantages",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
    rows: 3,
  },
  {
    type: TEXT_AREA,
    label: "Tồn tại",
    name: "disadvantages",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
    rows: 3,
  },
  {
    type: TEXT_AREA,
    label: "Dự kiến Kế hoạch ngày tới đơn vị",
    name: "scheduleUnitNextDay",
    rules: [{required: true, message: "Bắt buộc nhập"}],
    css: css,
    rows: 3,
  },
  {
    type: TEXT_AREA,
    label: "Kiến nghị, đề nghị (nếu có)",
    name: "request",
    css: css,
    rows: 3,
  },
  {
    type: TEXT_AREA,
    label: "Ý kiến",
    name: "opinion",
    css: css,
    rows: 3,
    rules: [{required: true, message: "Bắt buộc nhập"}],
  },
  {
    type: TEXT_AREA,
    label: "Kết luận của Trực chỉ huy Cụm",
    name: "concludeDutyLeader",
    css: css,
    rows: 3,
    rules: [{required: true, message: "Bắt buộc nhập"}],
  },
  {
    type: TEXT_AREA,
    label: "Dự kiến Kế hoạch ngày tới Cụm",
    name: "scheduleSuperiorUnitNextDay",
    css: css,
    rows: 3,
    rules: [{required: true, message: "Bắt buộc nhập"}],
  },
  {
    type: TEXT_AREA,
    label: "Ý kiến chỉ đạo chỉ huy Trung tâm",
    name: "opinionSuperiorUnitNextDay",
    css: css,
    rows: 3,
    rules: [{required: true, message: "Bắt buộc nhập"}],
  },
];

export {fields1};
