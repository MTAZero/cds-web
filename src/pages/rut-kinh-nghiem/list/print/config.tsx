import React from "react";
import {fieldType, formatTime} from "types";
import {formatDateToString} from "utils";
const {INPUT, DATE} = fieldType;
const columns: any = [
  {
    key: "thu",
    dataIndex: "thu",
    title: "Thứ/Ngày/Tháng",
    align: "center",
    render: (value, record, index) => {
      return (
        <div>
          {value} ({formatDateToString(record?.ngay_thang, formatTime.dayMonth)}
          )
        </div>
      );
    },
  },
  {
    key: "noi_dung",
    dataIndex: "noi_dung",
    title: "Nội dung",
    align: "left",
  },
  {
    key: "tong_thoi_gian",
    dataIndex: "tong_thoi_gian",
    title: "Tổng thời gian",
    align: "center",
  },
  {
    key: "thoi_gian_HLPD",
    dataIndex: "thoi_gian_HLPD",
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
    key: "cap_phu_trach",
    dataIndex: "cap_phu_trach",
    title: "Cấp phụ trách",
    align: "center",
  },
  {
    key: "dia_diem",
    dataIndex: "dia_diem",
    title: "Địa điểm",
    align: "center",
  },
  {
    key: "vat_chat_BD",
    dataIndex: "vat_chat_BD",
    title: "Vật chất bảo đảm",
    align: "left",
  },
  {
    key: "action",
    title: "Tác vụ",
    align: "center",
  },
];

export {columns};
