import {useEffect, useState} from "react";
import "./Print.scss";
import {TableCustom} from "components";
import {formatDateToString, randomId} from "utils";
import {formatTime} from "types";
import {useAppSelector} from "hooks";
const Print = props => {
  const {dataSource} = props;
  const {listUnit, listPerson} = useAppSelector(state => state.catalog);
  const columns: any = [
    {
      title: "STT",
      key: "index",
      width: 80,
    },

    {
      title: "Họ tên",
      key: "personId",
      align: "left",
      dataIndex: "personId",
      render: (value, record, index) => {
        return <>{listPerson?.find(e => e?._id == value)?.full_name}</>;
      },
      width: 250,
    },
    {
      title: (
        <>
          <div>Cấp bậc</div>
          <div>Chức vụ</div> <div>Đơn vị</div>{" "}
        </>
      ),
      key: "unitName",
      dataIndex: "unitName",
      align: "center",
      width: 120,
    },
    {
      title: "Thời gian",
      key: "time",
      dataIndex: "time",
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <div>
              {formatDateToString(record?.fromDate, formatTime.dayFull)}
            </div>
            <div>{formatDateToString(record?.toDate, formatTime.dayFull)}</div>
          </>
        );
      },
      width: 140,
    },

    {
      title: "Lý do",
      key: "reason",
      dataIndex: "reason",
    },
    {
      title: "Ký nhận",
      key: randomId(),
      dataIndex: randomId(),
      align: "center",

      width: 90,
    },
  ];

  return (
    // <div className="print-rut-kinh-nghiem">123</div>
    <>
      <div
        className="print-track-discipline"
        style={{pageBreakAfter: "always"}}
      >
        <table style={{width: "100%"}}>
          <thead style={{height: "24mm"}}></thead>
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
    </>
  );
};
export default Print;
