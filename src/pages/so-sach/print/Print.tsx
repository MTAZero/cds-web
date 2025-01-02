import React from "react";
import "./Print.scss";
import {Row} from "antd";
import {formatTime} from "types";
import {formatDateToString} from "utils/parse";
const Print = props => {
  const {data} = props;
  console.log(data);
  return (
    <div className="print-so-sach-ca-nhan">
      <Row justify={"space-between"} className="header-time">
        <div>
          Thời gian: {formatDateToString(data?.date, formatTime.dateTime)}
        </div>
        <div>Địa điểm: {data?.location}</div>
      </Row>
      <div className="container-title">
        <div className="title">{data?.content}</div>
      </div>
      <Row justify={"center"} className="header-content">
        Nội dung
      </Row>
      <div
        className="content"
        dangerouslySetInnerHTML={{__html: data?.note}}
      ></div>
    </div>
  );
};
export default Print;
