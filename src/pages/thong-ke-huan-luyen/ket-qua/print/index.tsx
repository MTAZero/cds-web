import React, {useEffect, useState} from "react";
import "./PrintKetQua.scss";
import {Col, Row, Space} from "antd";
import {TableCustom, TitleCustom} from "components";
import {formatDateToString} from "utils";
import {formatTime} from "types";
const PrintKetQua = props => {
  const {dataSource, params, columns} = props;

  return (
    <div className="print-ket-qua container">
      <table>
        <thead></thead>
        <tbody>
          <Row justify={"center"}>
            <TitleCustom
              text={`KẾT QUẢ HUẤN LUYỆN THÁNG ${params?.month} NĂM ${
                formatDateToString(params?.year, formatTime.year) ?? "..."
              } `}
              style={{fontSize: 32, fontWeight: "bold"}}
            ></TitleCustom>
          </Row>
          <Row justify={"center"}>
            <Space direction="vertical" align="start">
              <div>Đơn vị: </div>
            </Space>
          </Row>

          <TableCustom
            className={["table-print"]}
            id="table-print"
            dataSource={dataSource}
            pagination={false}
            columns={columns}
            hideCheckboxCol={true}
          ></TableCustom>
        </tbody>
      </table>
    </div>
  );
};
export default PrintKetQua;
