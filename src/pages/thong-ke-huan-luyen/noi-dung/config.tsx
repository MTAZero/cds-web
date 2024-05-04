import {formatDateToString, parseJson, randomId, toArray} from "utils";
import React from "react";
import {fieldType, formatTime} from "types";
const {COMBO_BOX, DATE} = fieldType;
const columnsND: any = [
  {
    key: "date",
    dataIndex: "date",
    title: "Ngày, tháng",
    align: "center",
    render: (value, record, index) => {
      return <div>{formatDateToString(value, formatTime.dayMonth)}</div>;
    },
  },
  {
    key: "noi_dung",
    dataIndex: "content",
    title: "Nội dung",
  },
  {
    key: "train_time_actual",
    dataIndex: "train_time_actual",
    title: "Thời gian",
    align: "center",
  },
  {
    key: "elements",
    dataIndex: "elements",
    title: "Thành phần tham gia",
    render: (value, record, index) => {
      return <div>{value?.join(", ")}</div>;
    },
    align: "center",
  },
  {
    key: "sum_joiner",
    dataIndex: "sum_joiner",
    title: "Quân số",
    align: "center",
  },
  {
    key: "evaluation",
    dataIndex: "evaluation",
    title: "Đánh giá kết quả",
  },
];
export {columnsND};
