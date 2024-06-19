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
    key: "unit",
    dataIndex: "unit",
    title: "Đơn vị sử dụng",
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
    title: "Ngày tạo",
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
    label: "Ngày tạo từ",
    name: "fromDateTime",
    optionsTime: {format: formatTime.dateTime},
    allowClear: true,
    disableDate: false,
  },
  {
    type: DATE,
    label: "Ngày tạo đến",
    name: "toDateTime",
    allowClear: true,
    optionsTime: {format: formatTime.dateTime},
    disableDate: false,
  },

  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    allowClear: false,
  },
];

export {columns, fields};
