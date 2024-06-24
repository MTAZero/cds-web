import {fieldType, formatTime} from "types";
import {randomId} from "utils";

const {INPUT, CURRENCY, DATE, NUMBER} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
const fields: any[] = [
  {
    key: "numberBill",
    name: "numberBill",
    label: "Số phiếu",
    type: INPUT,
    css: css,
  },
  {
    key: "date",
    name: "date",
    label: "Ngày",
    type: DATE,
    css: css,
    disableDate: false,
  },
  {
    key: "deliveryUnit",
    name: "deliveryUnit",
    label: "Đơn vị giao hàng",
    type: INPUT,
    css: css,
  },
  {
    key: "receiveUnit",
    name: "receiveUnit",
    label: "Đơn vị nhận hàng",
    type: INPUT,
    css: css,
  },
  {
    key: "shippingUnit",
    name: "shippingUnit",
    label: "Đơn vị vận chuyển",
    type: INPUT,
    css: css,
  },
  {
    key: "exportProperty",
    name: "exportProperty",
    label: "Tính chất xuất",
    type: INPUT,
    css: css,
  },
  {
    key: "belongCommandID",
    name: "belongCommandID",
    label: "Theo lệnh số",
    type: INPUT,
    css: css,
  },

  {
    key: "expiryDate",
    name: "expiryDate",
    label: "Giá trị đến ngày",
    type: DATE,
    css: css,
    disableDate: false,
  },

  {
    key: "referral",
    name: "referral",
    label: "Giấy giới thiệu",
    type: INPUT,
    css: css,
  },
  {
    key: "designCapacity",
    name: "designCapacity",
    label: "Dung tích thiết kê",
    type: INPUT,
    css: css,
  },
  {
    key: "exportCapacity",
    name: "exportCapacity",
    label: "Dung tích phải xuất",
    type: INPUT,
    css: css,
  },
  {
    key: "license",
    name: "license",
    label: "Số xe",
    type: INPUT,
    css: css,
  },
  {
    key: "license",
    name: "license",
    label: "Dung tích",
    type: INPUT,
    css: css,
  },
  {
    key: "numberOfPackages",
    name: "numberOfPackages",
    label: "Số lượng bao bì",
    type: INPUT,
    css: css,
  },
  {
    key: "note",
    name: "note",
    label: "Ghi chú",
    type: INPUT,
    css: css,
  },
];
const fields2: any[] = [
  {
    key: "deliverier",
    name: "deliverier",
    label: "Người giao",
    type: INPUT,
    css: css,
  },
  {
    key: "receiver",
    name: "receiver",
    label: "Người nhận",
    type: INPUT,
    css: css,
  },
  {
    key: "financePerson",
    name: "financePerson",
    label: "Ban tài chính",
    type: INPUT,
    css: css,
  },
  {
    key: "createdPerson",
    name: "createdPerson",
    label: "Người viết phiếu",
    type: INPUT,
    css: css,
  },
  {
    key: "leader",
    name: "leader",
    label: "Chỉ huy phòng",
    type: INPUT,
    css: css,
  },
];
const columns = [
  {
    key: "index",
    title: "STT",
    dataIndex: "index",
    show: true,
    align: "center",
    width: 30,
  },
  {
    key: "order",
    title: "Mã số",
    dataIndex: "order",
    type: INPUT,
    show: true,
  },
  {
    key: "name",
    title: "Tên xăng dầu",
    dataIndex: "name",
    type: INPUT,
    show: true,
  },
  {
    key: "quality",
    title: "Chất lượng",
    dataIndex: "quality",
    type: INPUT,
    show: true,
  },
  {
    key: "thoiGian",
    title: "Số lượng",
    show: true,
    dataIndex: "time",
    children: [
      {
        key: "export",
        dataIndex: "export",
        title: (
          <div>
            Xuất
            <div>(Lít tºTT,Kg)</div>
          </div>
        ),
        align: "center",
        type: NUMBER,
        show: true,
      },
      {
        key: "temperature",
        dataIndex: "temperature",
        title: (
          <div>
            t˚th.tế
            <div>( ˚C )</div>
          </div>
        ),
        align: "center",
        type: INPUT,
        show: true,
      },
      {
        key: "proportion_15",
        dataIndex: "proportion_15",
        title: (
          <div>
            Tỉ trọng
            <div>(15˚C)</div>
          </div>
        ),
        align: "center",
        type: NUMBER,
        show: true,
      },
      {
        key: "factorVcf",
        dataIndex: "factorVcf",
        title: (
          <div>
            Hệ số
            <div>VCF</div>
          </div>
        ),
        align: "center",
        type: NUMBER,
        show: true,
      },
      {
        key: randomId(),
        dataIndex: "actualExport",
        title: (
          <div>
            Thực xuất
            <div>(Lít15˚C,Kg)</div>
          </div>
        ),
        align: "center",
        type: NUMBER,
        show: true,
      },
    ],
  },
  {
    key: randomId(),
    title: "Đơn giá",
    dataIndex: "unitPrice",
    type: CURRENCY,
    show: true,
  },
  {
    key: randomId(),
    title: "Thành tiền",
    dataIndex: "sumMoney",
    type: CURRENCY,
    show: true,
  },
  {key: "action", show: true, width: 60, align: "center"},
];
export {fields, columns};
