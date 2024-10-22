import {fieldType, formatTime} from "types";
import React from "react";
import {convertDateStringToDateObject, formatDateToString} from "utils";
const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "index",
    dataIndex: "index",
    width: 60,
  },
  {
    key: "documentName",
    dataIndex: "documentName",
    title: "Tên tài liệu huấn luyện",
    align: "center",
    width: 200,
  },
  {
    key: "dvt",
    dataIndex: "dvt",
    title: "Đơn vị tính",
    align: "center",
    width: 180,
  },
  {
    key: "sum",
    dataIndex: "sum",
    title: "Số lượng",
    align: "right",
    width: 180,
  },
  {
    key: "publishYear",
    dataIndex: "publishYear",
    title: "Năm xuất bản",
    align: "center",
    width: 180,
  },
  {
    key: "numberRegister",
    dataIndex: "numberRegister",
    title: "Số đăng ký bảo mật",
    align: "center",
    width: 180,
  },
  {
    key: "receivedDate",
    dataIndex: "receivedDate",
    title: "Ngày, tháng, năm nhận",
    align: "center",
    width: 200,
    render: (value, record, index) => {
      return (
        <>
          {formatDateToString(
            convertDateStringToDateObject(value, true),
            formatTime.dayFull
          )}
        </>
      );
    },
  },
  {
    key: "receiver",
    dataIndex: "receiver",
    title: "Người nhận",
    align: "center",
    width: 180,
  },
  {
    key: "paidDate",
    dataIndex: "paidDate",
    title: "Ngày, tháng, năm trả",
    align: "center",
    width: 180,
    render: (value, record, index) => {
      return (
        <>
          {formatDateToString(
            convertDateStringToDateObject(value, true),
            formatTime.dayFull
          )}
        </>
      );
    },
  },
  {
    key: "payer",
    dataIndex: "payer",
    title: "Người trả",
    align: "center",
    width: 180,
  },
  {
    key: "sumRemain",
    dataIndex: "sumRemain",
    title: "Số lượng còn",
    align: "right",
    width: 180,
  },
  {
    key: "note",
    dataIndex: "note",
    title: "Ghi chú",
    align: "center",
    width: 180,
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    fixed: "right",
    width: 120,
  },
];

const fields: any = [
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unitId",
    allowClear: false,
    disableDate: false,
  },
];

export {columns, fields};
