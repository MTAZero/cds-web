import {months} from "const";
import React from "react";
import {fieldType} from "types";

const {COMBO_BOX, DATE} = fieldType;

const fields: any = [
  {
    type: DATE,
    label: "Năm",
    name: "year",
    picker: "year",
    optionsTime: {format: "YYYY"},
    allowClear: false,
  },
  {
    type: COMBO_BOX,
    label: "Tháng",
    options: months.map(e => ({value: e, label: e})),
    name: "month",
    allowClear: false,
  },

  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unit",
    allowClear: false,
  },
];

const mockDataND = [
  {
    ngay: "30/5",
    noiDung: "Huấn luyện bắn súng bài 1",
    thoiGian: "1",
    thanhPhan: "SQ, KTV, NVCNTT",
    quanSo: 3,
    ketQua: "Tốt",
  },
  {
    ngay: "1/6",
    noiDung: "Huấn luyện phòng hóa",
    thoiGian: "1",
    thanhPhan: "SQ, KTV, NVCNTT",
    quanSo: 3,
    ketQua: "Tốt",
  },
];
const mockData = [
  {
    ten: "Phạm Tuấn Dũng",
    capBac: "Trung úy",
    chucVu: "SQCNTT",
    ["30/5"]: 1,
    ["1/6"]: 0,
    ["3/6"]: 1,
    ["6/6"]: 0,
  },
  {
    ten: "Lê Anh Thắng",
    capBac: "Trung úy",
    chucVu: "SQCNTT",
    ["30/5"]: 0,
    ["1/6"]: 1,
    ["3/6"]: 1,
    ["6/6"]: 0,
  },
  {
    ten: "Lê Anh Thắng",
    capBac: "Trung úy",
    chucVu: "SQCNTT",
    ["30/5"]: 1,
    ["1/6"]: 1,
    ["3/6"]: 1,
    ["6/6"]: 1,
  },
];
export {fields, mockData, mockDataND};
