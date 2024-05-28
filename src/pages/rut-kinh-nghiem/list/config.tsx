import {months, weeks} from "const";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";

const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "time",
    dataIndex: "time",
    title: "Thời gian",
    align: "center",
    render: (value, record, index) => {
      return <>{formatDateToString(value, formatTime.time_24h)}</>;
    },
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Ngày",
    align: "center",
    render: (value, record, index) => {
      return <>{formatDateToString(value, formatTime.dayFull)}</>;
    },
  },

  {
    key: "join",
    dataIndex: "join",
    title: "Tham gia",
    align: "center",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    align: "center",
  },
];

const fields: any = [
  {
    type: DATE,
    label: "Năm",
    name: "year",
    picker: "year",
    optionsTime: {format: "YYYY"},
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Tháng",
    options: months.map(e => ({value: e, label: e})),
    name: "month",
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Tuần",
    name: "week",
    options: weeks.map((e: any) => ({value: e, label: e})),
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    allowClear: false,
  },
];

export {columns, fields};
