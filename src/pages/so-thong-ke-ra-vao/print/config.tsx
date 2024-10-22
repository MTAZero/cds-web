import {formatToCurrencyTypeToFixed, randomId} from "utils";

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

    show: true,
  },
  {
    key: "name",
    title: "Tên xăng dầu",
    dataIndex: "name",
    show: true,
  },
  {
    key: "quality",
    title: "Chất lượng",
    dataIndex: "quality",
    show: true,
    align: "center",
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
        align: "right",
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
        align: "right",
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
        align: "right",
        show: true,
      },
    ],
  },
  {
    key: randomId(),
    title: (
      <div>
        Đơn giá
        <div>(Đồng)</div>
      </div>
    ),
    dataIndex: "unitPrice",
    show: true,
    align: "right",
    render: (value, record, index) => {
      return <>{formatToCurrencyTypeToFixed(value, 0)}</>;
    },
  },
  {
    key: randomId(),
    title: "Thành tiền",
    dataIndex: "sumMoney",
    show: true,
    align: "right",
    render: (value, record, index) => {
      return <>{formatToCurrencyTypeToFixed(value, 0)}</>;
    },
  },
];
export {columns};
