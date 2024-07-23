import {useEffect, useState} from "react";
import "./Print.scss";
import {Row, Space} from "antd";
import {TableCustom} from "components";
import {formatDateToString, randomId} from "utils";
import {formatTime} from "types";
import {useAppSelector} from "hooks";
const Print = props => {
  const {dataSource} = props;
  console.log(dataSource);
  const {listUnit, listPerson} = useAppSelector(state => state.catalog);
  const columns: any = [
    {
      title: "STT",
      key: "index",
    },

    {
      title: "Họ tên",
      key: "personId",
      dataIndex: "personId",
      align: "center",
      render: (value, record, index) => {
        return <>{listPerson?.find(e => e?._id == value)?.full_name}</>;
      },
      width: 220,
    },
    {
      title: "Đơn vị",
      key: "unitId",
      dataIndex: "unitId",
      align: "center",
      render: (value, record, index) => {
        return <>{listUnit?.find(e => e?._id == value)?.name}</>;
      },
      width: 90,
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
      title: "Nhiệm vụ",
      key: randomId(),
      dataIndex: randomId(),
      children: [
        {
          title: "Nội dung",
          key: "content",
          dataIndex: "content",
          align: "center",
          width: 100,
        },
        {
          title: "Kết quả",
          key: "result",
          dataIndex: "result",
          align: "center",
          width: 100,
        },
      ],
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
      <div className="print-track-work" style={{pageBreakAfter: "always"}}>
        <table>
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
