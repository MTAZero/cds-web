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
    key: "numberBill",
    dataIndex: "numberBill",
    title: "Số phiếu",
    align: "center",
    width: 180,
  },
  {
    key: "commandNumber",
    dataIndex: "commandNumber",
    title: "Theo lệnh điều",
    align: "center",
    width: 180,
  },
  {
    key: "referral",
    dataIndex: "referral",
    title: "Giấy giới thiệu",
    align: "center",
    width: 180,
  },
  {
    key: "deliverier",
    dataIndex: "deliverier",
    title: "Người giao",
    align: "center",
    width: 180,
  },
  {
    key: "receiver",
    dataIndex: "receiver",
    title: "Người nhận",
    align: "center",
    width: 180,
  },
  {
    key: "createdPerson",
    dataIndex: "createdPerson",
    title: "Người tạo",
    align: "center",
    width: 180,
  },
  {
    key: "expiryDate",
    dataIndex: "expiryDate",
    title: "Giá trị đến ngày",
    align: "center",
    render: (value, record, index) => {
      return <> {formatDateToString(value, formatTime.dayFull)}</>;
    },
    width: 140,
  },

  {
    key: "deliveryUnit",
    dataIndex: "deliveryUnit",
    title: "Đơn vị giao",
    align: "center",
    width: 140,
  },
  {
    key: "shippingUnit",
    dataIndex: "shippingUnit",
    title: "Đơn vị vận chuyển",
    align: "center",
    width: 140,
  },
  {
    key: "receiveUnit",
    dataIndex: "receiveUnit",
    title: "Đơn vị nhận",
    align: "center",
    width: 140,
  },
  {
    key: "license",
    dataIndex: "license",
    title: "Số xe",
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
    key: "note",
    dataIndex: "note",
    title: "Ghi chú",
    align: "center",
    width: 120,
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
