import {months} from "const";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";

const {COMBO_BOX, DATE, INPUT} = fieldType;
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
  },
  {
    type: INPUT,
    label: "Nội dung",
    options: months.map(e => ({value: e, label: e})),
    name: "content",
  },
];
const columns: any[] = [
  {
    key: "index",
    dataIndex: "index",
    width: 80,
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Thời gian huấn luyện",
    align: "center",
    width: 180,
    render: (value, record, index) => {
      return <>{formatDateToString(value, formatTime.dateTime)}</>;
    },
  },
  {
    key: "content",
    dataIndex: "content",
    title: "Nội dung huấn luyện",
    align: "center",
  },
  {
    key: "evaluation",
    dataIndex: "evaluation",
    title: "Đánh giá huấn luyện",
    align: "center",
  },
  {
    key: "sum_joiner",
    dataIndex: "sum_joiner",
    title: "Quân số tham gia",
    align: "center",
  },
  {
    key: "unit_charge",
    dataIndex: "unit_charge",
    title: "Đơn vị phụ trách",
    align: "center",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    align: "center",
  },
];
const data = [
  {thoi_gian: "09:00 15/4/2024", noi_dung: "Huấn luyện nội bộ", ket_qua: 8},
  {thoi_gian: "09:00 15/4/2024", noi_dung: "Huấn luyện nội bộ", ket_qua: 9},
];
export {columns, data, fields};
