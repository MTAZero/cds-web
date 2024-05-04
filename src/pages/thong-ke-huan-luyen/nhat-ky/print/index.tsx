import React from "react";
import "./PrintNhatKy.scss";
import {Col, Row, Space} from "antd";
import {TableCustom, TitleCustom} from "components";
import {formatDateToString} from "utils";
import {formatTime} from "types";
const PrintNhatKy = props => {
  const {dataSource, params, columns} = props;
  return (
    <div className="print-nhat-ky container ">
      <table>
        <thead style={{height: "20mm"}}></thead>
        <tbody>
          <Row justify={"center"}>
            <TitleCustom
              text={`NHẬT KÝ HUẤN LUYỆN THÁNG ${params?.month} NĂM ${
                formatDateToString(params?.nam, formatTime.year) ?? "..."
              } `}
              style={{fontSize: 32, fontWeight: "bold"}}
            ></TitleCustom>
          </Row>
          <Row justify={"center"}>
            <Space direction="vertical" align="start">
              <div>Đơn vị: {params?.don_vi}</div>
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
        <tfoot style={{height: "20mm"}}></tfoot>
      </table>
    </div>
  );
};
export default PrintNhatKy;
