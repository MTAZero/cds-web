import {months} from "const";
import {fieldType} from "types";

const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "date",
    dataIndex: "date",
    title: "Thời gian",
    align: "center",
  },
  {
    key: "content",
    dataIndex: "content",
    title: "Nội dung",
    align: "left",
  },
  {
    key: "sum_time_train",
    dataIndex: "sum_time_train",
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
const mockData = [
  {
    _id: "1",
    date: "8/4",
    content: "Huấn luyện cài đặt Máy chủ",
    sum_time_train: 2,
  },
];
const fields: any = [
  {
    type: DATE,
    label: "Năm",
    name: "nam",
    picker: "year",
    optionsTime: {format: "YYYY"},
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Tháng",
    options: months.map(e => ({value: e, label: e})),
    name: "thang",
    allowClear: false,
  },

  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "don_vi",
    allowClear: false,
  },
];

export {columns, fields, mockData};
