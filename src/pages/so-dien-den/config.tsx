import {fieldType, formatTime} from "types";
import React from "react";
import {
  convertDateStringToDateObject,
  formatDateToString,
  randomId,
  toArray,
} from "utils";
const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "index",
    dataIndex: "index",
    width: 60,
  },
  {
    key: "dateRead",
    dataIndex: "dateRead",
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
    key: "unitName",
    dataIndex: "unitName",
    title: "Đơn vị truyền đến",
    align: "center",
    width: 120,
  },

  {
    key: "personRead",
    dataIndex: "personRead",
    title: "Người truyền điện",
    align: "center",
    width: 180,
  },
  {
    key: "personReceived",
    dataIndex: "personReceived",
    title: "Người nhận điện",
    width: 180,
    align: "center",
  },

  {
    key: "telephoneNumber",
    dataIndex: "telephoneNumber",
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
