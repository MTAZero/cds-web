import React from "react";
import {SuccessSVG} from "assests/svg";
import {fieldType} from "types";
const {COMBO_BOX, DATE} = fieldType;
const renderRollCall = value => {
  return value == 1 ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SuccessSVG></SuccessSVG>
    </div>
  ) : (
    <></>
  );
};
const columnsKQ: any = [
  {
    key: "index",
    dataIndex: "index",
  },
  {
    key: "full_name",
    dataIndex: "full_name",
    title: "Họ tên",
    align: "left",
  },
  {
    key: "rank",
    dataIndex: "rank",
    title: "Cấp bậc",
    align: "center",
  },
  {
    key: "position",
    dataIndex: "position",
    title: "Chức vụ",
    align: "center",
  },
  {
    key: "date",
    title: "Ngày, tháng tham gia",
    align: "center",
    children: [],
  },
];
export {columnsKQ, renderRollCall};
