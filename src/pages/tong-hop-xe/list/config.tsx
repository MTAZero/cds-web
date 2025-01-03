import {months, weeks} from "const";
import {fieldType, formatTime} from "types";
import {convertDateStringToDateObject, formatDateToString} from "utils";

const {COMBO_BOX, DATE} = fieldType;
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
    title: "Thời gian đi",
    align: "center",
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
    key: "toDateTime",
    dataIndex: "toDateTime",
    title: "Thời gian về",
    align: "center",
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
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    align: "center",
  },
];

const fields: any = [
  {
    type: DATE,
    label: "Từ ngày",
    name: "fromDateTime",
    optionsTime: {format: formatTime.dateTime},
    allowClear: true,
    disableDate: false,
  },
  {
    type: DATE,
    label: "Đến ngày",
    name: "toDateTime",
    allowClear: true,
    optionsTime: {format: formatTime.dateTime},
    disableDate: false,
  },
];

export {columns, fields};
