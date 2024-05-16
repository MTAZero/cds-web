import {fieldType} from "types";
import {randomId} from "utils";

const {COMBO_BOX, INPUT, INPUT_NUMBER} = fieldType;
const listChucVu = ["SQCNTT", "SQCH", "NVCNTT"];
const columns: any = [
  {
    key: "full_name",
    dataIndex: "full_name",
    title: "Người tham gia",
    align: "left",
    show: true,
    // onCell: (value: any, index: number) => {
    //   // if (list_doi_tuong.includes(value?.ho_ten)) {
    //   //   return {colSpan: 2};
    //   // } else {
    //   //   return {colSpan: 1};
    //   // }
    // },
    width: 300,
  },
  {
    key: "result",
    dataIndex: "result",
    title: "Kết quả",
    align: "center",
    show: true,
    type: COMBO_BOX,
    options: [
      {value: 0, label: 0},
      {value: 1, label: 1},
      {value: 2, label: 2},
      {value: 3, label: 3},
      {value: 4, label: 4},
      {value: 5, label: 5},
      {value: 6, label: 6},
      {value: 7, label: 7},
      {value: 8, label: 8},
      {value: 9, label: 9},
      {value: 10, label: 10},
    ],
    onCell: (value: any, index: number) => {
      // if (list_doi_tuong.includes(value?.ho_ten)) {
      //   return {colSpan: 0};
      // } else {
      //   return {colSpan: 1};
      // }
    },
  },
];
const fields = [
  {
    label: "Đánh giá",
    type: INPUT,
    name: "evaluation",
  },
  {
    label: "Thời gian HLTT",
    type: INPUT_NUMBER,
    name: "time_train_actual",
  },
];
const mockData = [
  {
    key: 1,
    name: "SQCH",
    children: [
      {key: randomId(), name: "Trương Minh Dương", result: 1},
      {key: randomId(), name: "Vũ Quốc Vương", result: 1},
    ],
  },
  {
    key: 2,
    name: "SQCNTT",
    children: [
      {key: randomId(), name: "Phạm Tuấn Dũng", result: 0},
      {key: randomId(), name: "Lê Anh Thắng", result: 1},
    ],
  },
  {
    key: 3,
    name: "NVCNTT",
    children: [
      {key: randomId(), name: "Phạm Tuấn Dũng", result: 0},
      {key: randomId(), name: "Lê Anh Thắng", result: 1},
    ],
  },
];
export {columns, mockData, listChucVu, fields};
