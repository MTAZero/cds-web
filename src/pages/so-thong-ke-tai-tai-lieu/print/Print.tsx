import {useEffect, useState} from "react";
import "./Print.scss";
import {TableCustom} from "components";
import {
  convertDateStringToDateObject,
  formatDateToString,
  randomId,
} from "utils";
import {formatTime} from "types";
const Print = props => {
  const {dataSource} = props;
  const columns: any = [
    {
      key: "index",
      dataIndex: "index",
      width: 50,
    },
    {
      key: "documentName",
      dataIndex: "documentName",
      title: "Tên tài liệu huấn luyện",
      align: "center",
      width: 200,
    },
    {
      key: "dvt",
      dataIndex: "dvt",
      title: "Đơn vị tính",
      align: "center",
      width: 180,
    },
    {
      key: "sum",
      dataIndex: "sum",
      title: "Số lượng",
      align: "right",
      width: 90,
    },
    {
      key: "publishYear",
      dataIndex: "publishYear",
      title: "Năm xuất bản",
      align: "center",
      width: 10,
    },
    {
      key: "numberRegister",
      dataIndex: "numberRegister",
      title: "Số đăng ký bảo mật",
      align: "center",
      width: 180,
    },
    {
      key: "receivedDate",
      dataIndex: "receivedDate",
      title: "Ngày, tháng, năm nhận",
      align: "center",
      width: 200,
      render: (value, record, index) => {
        return (
          <>
            {formatDateToString(
              convertDateStringToDateObject(value, true),
              formatTime.dayFull
            )}
          </>
        );
      },
    },
    {
      key: "receiver",
      dataIndex: "receiver",
      title: "Người nhận",
      align: "center",
      width: 180,
    },
    {
      key: "paidDate",
      dataIndex: "paidDate",
      title: "Ngày, tháng, năm trả",
      align: "center",
      width: 180,
      render: (value, record, index) => {
        return (
          <>
            {formatDateToString(
              convertDateStringToDateObject(value, true),
              formatTime.dayFull
            )}
          </>
        );
      },
    },
    {
      key: "payer",
      dataIndex: "payer",
      title: "Người trả",
      align: "center",
      width: 180,
    },
    {
      key: "sumRemain",
      dataIndex: "sumRemain",
      title: "Số lượng còn",
      align: "right",
      width: 90,
    },
    {
      key: "note",
      dataIndex: "note",
      title: "Ghi chú",
      align: "center",
      width: 180,
    },
  ];

  return (
    <div
      className="print-statistic-document"
      style={{pageBreakAfter: "always"}}
    >
      <div style={{width: "100%"}}>
        <table>
          <thead style={{height: "20mm"}}></thead>
          <tbody>
            <TableCustom
              pagination={false}
              dataSource={dataSource}
              className={["table-print"]}
              columns={columns}
            ></TableCustom>
          </tbody>
          <tfoot style={{height: "20mm"}}></tfoot>
        </table>
      </div>
    </div>
  );
};
export default Print;
