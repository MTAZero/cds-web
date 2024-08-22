import {fieldType, formatTime} from "types";
import React from "react";
import {convertDateStringToDateObject, formatDateToString} from "utils";
const {DATE} = fieldType;
const columns: any = [
  {
    key: "index",
    dataIndex: "index",
    width: 60,
  },
  {
    key: "dateTransfer",
    dataIndex: "dateTransfer",
    title: "Thời gian",
    align: "center",
    width: 120,
    render: (value, record, index) => {
      return (
        <>
          {formatDateToString(
            convertDateStringToDateObject(value, true),
            formatTime.dateTime
          )}
        </>
      );
    },
  },
  {
    key: "content",
    dataIndex: "content",
    title: "Nội dung",
    width: 250,
    align: "center",
  },
  {
    key: "unitNameTransfer",
    dataIndex: "unitNameTransfer",
    title: "Đơn vị truyền điện",
    align: "center",
    width: 120,
  },

  {
    key: "personTransfer",
    dataIndex: "personTransfer",
    title: "Người truyền điện",
    align: "center",
    width: 180,
  },
  {
    key: "unitNameReceived",
    dataIndex: "unitNameReceived",
    title: "Đơn vị nhận điện",
    align: "center",
    width: 120,
  },
  {
    key: "personReceived",
    dataIndex: "personReceived",
    title: "Người nhận điện",
    width: 180,
    align: "center",
  },

  {
    key: "telephoneNumberTransfer",
    dataIndex: "telephoneNumberTransfer",
    title: "Số điện thoại",
    align: "center",
    width: 180,
  },

  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    width: 100,
    fixed: "right",
  },
];

const fields: any = [
  {
    type: DATE,
    label: "Thời gian từ",
    name: "fromDateTime",
  },
  {
    type: DATE,
    label: "Thời gian đến",
    name: "toDateTime",
  },
];

export {columns, fields};
