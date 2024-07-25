import React from "react";
import {fieldType, formatTime} from "types";
import {convertDateStringToDateObject, formatDateToString} from "utils";
const columns: any = [
  {
    key: "index",
    dataIndex: "index",
  },
  {
    key: "contentUse",
    dataIndex: "contentUse",
    title: "Nội dung công tác",
    align: "center",
    width: 200,
  },
  {
    key: "unitName",
    dataIndex: "unitName",
    title: "Đơn vị",
    align: "center",
  },
  {
    key: "location",
    dataIndex: "location",
    title: "Địa điểm",
    align: "center",
    width: 300,
  },
  {
    key: "fromDateTime",
    dataIndex: "fromDateTime",
    title: "Ngày đi",
    align: "center",
    render: (value, record, index) => {
      return (
        <>
          {" "}
          {formatDateToString(
            convertDateStringToDateObject(value, true),
            formatTime.dateTime
          )}
        </>
      );
    },
  },
  {
    key: "toDateTime",
    dataIndex: "toDateTime",
    title: "Ngày về",
    align: "center",
    render: (value, record, index) => {
      return (
        <>
          {" "}
          {formatDateToString(
            convertDateStringToDateObject(value, true),
            formatTime.dateTime
          )}
        </>
      );
    },
  },
  {
    key: "distance",
    dataIndex: "distance",
    title: "Quãng đường",
    align: "center",
  },
  {
    key: "driver",
    dataIndex: "driver",
    title: "Lái xe",
    align: "center",
  },
  {
    key: "license",
    dataIndex: "license",
    title: "Số xe",
    align: "center",
  },
];

export {columns};
