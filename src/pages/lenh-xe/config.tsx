import {months, weeks} from "const";
import {fieldType, formatTime} from "types";
import {convertDateStringToDateObject, formatDateToString} from "utils";

const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "index",
    dataIndex: "index",
    width: 60,
  },
  {
    key: "mission",
    dataIndex: "mission",
    title: "Nhiệm vụ",
    align: "center",
    width: 180,
  },

  {
    key: "fromLocationGo",
    dataIndex: "fromLocationGo",
    title: "Đi từ",
    align: "center",
    width: 180,
  },
  {
    key: "toLocationGo",
    dataIndex: "toLocationGo",
    title: "Đi đến",
    align: "center",
    width: 180,
  },
  {
    key: "created_date",
    dataIndex: "commandDateCreated",
    title: "Ngày trên phiếu",
    align: "center",
    render: (value, record, index) => {
      return <> {formatDateToString(value, formatTime.dateTime)}</>;
    },
    width: 140,
  },

  {
    key: "distanceGo",
    dataIndex: "distanceGo",
    title: "Quãng đường đi",
    align: "center",
    width: 140,
  },
  // {
  //   key: "distanceBack",
  //   dataIndex: "distanceBack",
  //   title: "Quãng đường về",
  //   align: "center",
  //   width: 120,
  // },
  {
    key: "typeVehicle",
    dataIndex: "typeVehicle",
    title: "Loại xe",
    align: "center",
    width: 120,
  },
  {
    key: "label",
    dataIndex: "label",
    title: "Nhãn hiệu xe",
    align: "center",
    width: 120,
  },
  {
    key: "numberTripGo",
    dataIndex: "numberTripGo",
    title: "Số chuyến đi",
    align: "center",
    width: 180,
  },
  {
    key: "numberTripBack",
    dataIndex: "numberTripBack",
    title: "Số chuyến về",
    align: "center",
    width: 180,
  },

  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    align: "center",
    fixed: "right",
    width: 120,
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
