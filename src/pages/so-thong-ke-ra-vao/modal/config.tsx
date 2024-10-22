import {fieldType, formatTime} from "types";

const {INPUT, DATE, TIME, COMBO_BOX} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
const fields: any[] = [
  {
    key: "unitId",
    name: "unitId",
    label: "Đơn vị",
    type: COMBO_BOX,
    css: css,
  },
  {
    key: "date",
    name: "date",
    label: "Ngày",
    type: DATE,
    css: css,
    disabled: true,
  },
  {
    key: "pickPersonName",
    name: "pickPersonName",
    label: "Họ tên người đón",
    type: INPUT,
    css: css,
  },
  {
    key: "guestName",
    name: "guestName",
    label: "Họ tên khách",
    type: INPUT,
    css: css,
  },
  {
    key: "typeVehicle",
    name: "typeVehicle",
    label: "Phương tiện",
    type: INPUT,
    css: css,
  },
  {
    key: "license",
    name: "license",
    label: "Biển số xe",
    type: INPUT,
    css: css,
  },
  {
    key: "identityNumber",
    name: "identityNumber",
    label: "CCCD/CMT",
    type: INPUT,
    css: css,
  },
  {
    key: "issued",
    name: "issued",
    label: "Ngày cấp",
    type: DATE,
    css: css,
  },
  {
    key: "addressIssued",
    name: "addressIssued",
    label: "Nơi cấp",
    type: INPUT,
    css: css,
  },
  {
    key: "contentWork",
    name: "contentWork",
    label: "Nội dung công việc",
    type: INPUT,
    css: css,
  },
  {
    key: "fromDateTime",
    name: "fromDateTime",
    label: "Thời gian vào",
    type: TIME,
    css: css,
    optionsTime: {format: formatTime.time_24h},
  },
  {
    key: "toDateTime",
    name: "toDateTime",
    label: "Thời gian ra",
    type: TIME,
    css: css,
    optionsTime: {format: formatTime.time_24h},
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
