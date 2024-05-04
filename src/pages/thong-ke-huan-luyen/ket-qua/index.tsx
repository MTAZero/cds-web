import {TableCustom} from "components";
import {useEffect, useRef, useState} from "react";
import {columnsKQ, renderRollCall} from "./config";
import ReactToPrint from "react-to-print";
import {Button, Row} from "antd";
import {
  APIServices,
  checkEmptyObj,
  formatDateToString,
  randomId,
  toArray,
} from "utils";
import {formatTime} from "types";
import PrintKetQua from "./print";
type Props = {
  params: any;
  listPosition?: any;
};
const KetQuaHL = (props: Props) => {
  const {params, listPosition} = props;
  const printRef = useRef<any>();
  const [columns, setColumns] = useState<any>(columnsKQ);
  const [data, setData] = useState([]);
  const [days, setDays] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!checkEmptyObj(params)) {
      getKetQuaHuanLuyen(params);
    }
  }, [params]);
  const getKetQuaHuanLuyen = async params => {
    try {
      setIsLoading(true);
      const res = await APIServices.ThongKe.getKetQua(params);
      setData(toArray(formatData(res?.statistic)));
      setDays(toArray(res?.date));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const formatData = thongKe => {
    let formatThongKe = thongKe.map(e => ({...e, ...formatRecord(e)}));
    return formatThongKe;
  };
  const formatRecord = record => {
    let recordFormat = {};
    record?.train?.forEach(e => {
      const key = formatDateToString(e?.date, formatTime.dayMonth);
      recordFormat = {...recordFormat, [key]: e?.joined};
    });
    return recordFormat;
  };
  useEffect(() => {
    const _setColumns = days => {
      columnsKQ.find(e => e?.key == "date").children = days?.map(e => ({
        title: formatDateToString(e, formatTime.dayMonth),
        dataIndex: formatDateToString(e, formatTime.dayMonth),
        key: randomId(),
        render: (value, record, render) => {
          return renderRollCall(value);
        },
      }));
      setColumns([...columnsKQ]);
    };
    _setColumns(days);
  }, [days]);

  useEffect(() => {
    const _setColumns = days => {
      columnsKQ.find(e => e?.key == "position").render = (
        value,
        record,
        index
      ) => {
        return <>{listPosition?.find(e => e?._id === value)?.name}</>;
      };
      setColumns([...columnsKQ]);
    };
    _setColumns(days);
  }, [listPosition]);

  return (
    <>
      <Row justify={"end"}>
        <ReactToPrint
          documentTitle={`Kết quả huấn luyện tháng ${
            params?.month ?? "..."
          } năm ${
            formatDateToString(params?.year, formatTime.year) ?? "..."
          }  `}
          trigger={() => {
            return (
              <Button style={{marginBottom: 4}} type="primary">
                Xuất file
              </Button>
            );
          }}
          content={() => printRef.current}
          bodyClass="print-ket-qua"
        />
      </Row>

      <TableCustom
        isLoading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={false}
      ></TableCustom>
      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <PrintKetQua
            ref={printRef}
            dataSource={data}
            columns={columns}
            params={params}
          ></PrintKetQua>
        </div>
      </div>
    </>
  );
};
export default KetQuaHL;
