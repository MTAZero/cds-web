import React from "react";
import {fieldType, formatTime} from "types";
import {formatDateToString, randomId} from "utils";

const {COMBO_BOX, DATE} = fieldType;
const columnsNK: any = [
  {
    key: "day_of_week",
    dataIndex: "day_of_week",
    title: "Thứ",
  },
  {
    key: "unit",
    dataIndex: "unit",
    title: "Đơn vị",
    align: "center",
  },
  // {
  //   key: "thoiGian",
  //   dataIndex: "thoiGian",
  //   title: "Môn học",
  //   align: "right",
  // },
  {
    key: "content",
    dataIndex: "content",
    title: "Nội dung huấn luyện",
  },
  {
    key: "quanSo",
    title: "Quân số",
    children: [
      {
        key: "sum_people",
        dataIndex: "sum_people",
        title: "Phải HL",
        align: "center",
      },
      {
        key: "sum_joiner",
        dataIndex: "sum_joiner",
        title: "Đã HL",
        align: "center",
      },
    ],
  },
  {
    key: "thoiGian",
    title: "Thời gian",
    children: [
      {
        key: "sum_time_train",
        dataIndex: "sum_time_train",
        title: "Phải HL",
        align: "center",
      },
      {
        key: "time_train_actual",
        dataIndex: "time_train_actual",
        title: "Đã HL",
        align: "center",
      },
    ],
  },
  {
    key: "ketQua",
    dataIndex: "ketQua",
    title: "Kết quả kiểm tra",
    children: [
      {key: "phaiHL", dataIndex: "phaiHL", title: "Quân số KT"},
      {
        key: "daHL",
        dataIndex: "daHL",
        title: "G",
        children: [
          {key: randomId(), dataIndex: "QS_G", title: "QS"},
          {key: randomId(), dataIndex: "QS_%", title: "%"},
        ],
      },
      {
        key: "daHL",
        dataIndex: "daHL",
        title: "K",
        children: [
          {key: randomId(), dataIndex: "QS_K", title: "QS"},
          {key: randomId(), dataIndex: "QS_%", title: "%"},
        ],
      },
      {
        key: "daHL",
        dataIndex: "daHL",
        title: "Đ",
        children: [
          {key: randomId(), dataIndex: "QS Đ", title: "QS"},
          {key: randomId(), dataIndex: "QS_%", title: "%"},
        ],
      },
      {
        key: "daHL",
        dataIndex: "daHL",
        title: "KĐ",
        children: [
          {key: randomId(), dataIndex: "QS KĐ", title: "QS"},
          {key: randomId(), dataIndex: "QS_%", title: "%"},
        ],
      },
    ],
    align: "right",
  },
  {
    key: "evaluation",
    dataIndex: "evaluation",
    title: "Xếp loại",
  },
];
export {columnsNK};
