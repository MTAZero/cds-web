import {fieldType} from "types";
import {dates, months, weeks} from "const";
const {INPUT, INPUT_NUMBER, TIME_RANGE, DATE, COMBO_BOX} = fieldType;
const css = {xs: 24, sm: 24, md: 12, lg: 8, xl: 8};
const css3 = {xs: 24, sm: 24, md: 12, lg: 24, xl: 24};
const fields1: any[] = [
  {
    type: DATE,
    label: "Năm",
    name: "year",
    rules: [{required: true, message: "Chưa chọn năm"}],
    css: css,
    picker: "year",
    optionsTime: {format: "YYYY"},
  },
  {
    type: COMBO_BOX,
    label: "Tháng",
    name: "month",
    css: css,
    options: months.map(e => ({value: e, label: e})),
    rules: [{required: true, message: "Chưa chọn tháng"}],
  },
  {
    type: COMBO_BOX,
    label: "Tuần",
    name: "week",
    css: css,
    options: weeks.map(e => ({value: e, label: e})),
    rules: [{required: true, message: "Chưa chọn tuần"}],
  },

  {
    type: DATE,
    label: "Từ ngày",
    name: "from_date",
    // rules: [{required: true, message: "Chưa nhập từ ngày"}],
    css: css,
    disableDate: false,
  },
  {
    type: DATE,
    label: "Đến ngày",
    name: "to_date",
    disableDate: false,
    // rules: [{required: true, message: "Chưa nhập đến ngày"}],
    css: css,
  },
];
const fields2: any[] = [
  {
    type: INPUT,
    label: "Nội dung",
    name: "content",
    rules: [{required: true, message: "Chưa nhập nội dung"}],
    css: css,
  },
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    css: css,
    rules: [{required: true, message: "Chưa nhập đơn vị"}],
  },
  {
    type: DATE,
    label: "Ngày thực hiện",
    name: "date",
    disableDate: false,
    rules: [{required: true, message: "Chưa nhập ngày thực hiện"}],
    css: css,
  },
  {
    type: INPUT,
    label: "Thứ",
    name: "day_of_week",
    css: css,
    disabled: true,
    rules: [{required: true, message: "Chưa nhập thứ thực hiện"}],
  },
  {
    type: INPUT_NUMBER,
    label: "Tổng số thời gian",
    name: "sum_time_train",
    rules: [{required: true, message: "Chưa nhập tổng thời gian"}],
    css: css,
  },

  {
    type: INPUT,
    label: "Cấp phụ trách",
    name: "unit_charge",
    css: css,
    rules: [{required: true, message: "Chưa nhập cấp phụ trách"}],
  },

  {
    type: INPUT,
    label: "Địa điểm",
    name: "location",
    css: css,
    rules: [{required: true, message: "Chưa nhập địa điểm"}],
  },
  {
    type: INPUT,
    label: "Vật chất bảo đảm chính",
    name: "guaranteed_material",
    css: css,
    rules: [{required: true, message: "Chưa nhập vật chất bảo đảm"}],
  },
];
const columns = [
  {
    type: COMBO_BOX,
    title: "Đối tượng huấn luyện",
    key: "object",
    dataIndex: "object",
  },
  {
    type: TIME_RANGE,
    title: "Thời gian huấn luyện",
    key: "time",
    dataIndex: "time",
  },
  {
    key: "action",
  },
];
const columnsGiaoAn = (renderButton, renderGiaoAn, renderAction) => {
  return [
    {
      title: "Chọn giáo án",
      key: "button",
      dataIndex: "button",
      render: (value, record, index) => {
        return <>{renderButton}</>;
      },
    },
    {
      title: "Trạng thái",
      key: "giaoAn",
      dataIndex: "giaoAn",
      render: (value, record, index) => {
        return <>{renderGiaoAn}</>;
      },
    },
    {
      key: "action",
      render: (value, record, index) => {
        return <>{renderAction}</>;
      },
      title: "Thao tác",
    },
  ];
};
export {fields1, fields2, columns, columnsGiaoAn};
