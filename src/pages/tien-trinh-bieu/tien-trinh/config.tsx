import {months, weeks} from "const";
import React from "react";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";
const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "date",
    dataIndex: "date",
    title: "Thứ/Ngày/Tháng",
    align: "center",
    render: (value: any, record: any, index: any) => {
      return (
        <div>
          {record?.day_of_week} (
          {formatDateToString(record?.date, formatTime.dayMonth)})
        </div>
      );
    },
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
    title: "Tổng thời gian",
    align: "center",
  },
  {
    key: "time_train_detail",
    dataIndex: "time_train_detail",
    title: "Thời gian HL từng phân đội",
    children: [
      {
        title: "SQCH",
        dataIndex: "time1",
        key: "time1",
      },
      {
        title: "SQCNTT",
        dataIndex: "time1",
        key: "time1",
      },
      {
        title: "NVCNTT",
        dataIndex: "time3",
        key: "time3",
      },
    ],
  },
  {
    key: "unit_charge",
    dataIndex: "unit_charge",
    title: "Cấp phụ trách",
    align: "center",
  },
  {
    key: "location",
    dataIndex: "location",
    title: "Địa điểm",
    align: "center",
  },
  {
    key: "guaranteed_material",
    dataIndex: "guaranteed_material",
    title: "Vật chất bảo đảm",
    align: "center",
  },
  {
    key: "action",
    title: "Tác vụ",
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
    options: months.map((e: any) => ({value: e, label: e})),
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
const mockData = [
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
  {
    time: "Thứ 2 (19/2)",
    name: "Nhận xét kết quả công tác tuần",
    hours: 3,
    time1: "7h30-9h30",
    time2: "7h30-9h30",
    time3: "7h30-9h30",
    level: "dt",
    diaDiem: "PGB d",
    vatChat: "Sổ công tác, bút",
  },
];
export {columns, mockData, fields};
