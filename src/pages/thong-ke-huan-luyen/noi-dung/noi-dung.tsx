import {TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {columnsND} from "./config";
import {Button, Row} from "antd";
import ReactToPrint from "react-to-print";
import {APIServices, checkEmptyObj, formatDateToString, toArray} from "utils";
import {formatTime} from "types";
import PrintNoiDung from "./print";
type Props = {
  params: any;
};
const NoiDungHL = (props: Props) => {
  const {params} = props;
  const printRef = useRef<any>();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!checkEmptyObj(params)) {
      getNoiDungHuanLuyen(params);
    }
  }, [params]);
  const getNoiDungHuanLuyen = async params => {
    try {
      setIsLoading(true);
      const res = await APIServices.ThongKe.getNoiDung(params);
      setData(toArray(res?.items));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setData([]);
    }
  };
  return (
    <>
      <Row justify={"end"}>
        <ReactToPrint
          documentTitle={`Nội dung huấn luyện tháng ${
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
          bodyClass="print-noi-dung"
        />
      </Row>

      <TableCustom
        isLoading={isLoading}
        columns={columnsND}
        dataSource={data}
        pagination={false}
      ></TableCustom>
      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <PrintNoiDung
            ref={printRef}
            dataSource={data}
            columns={columnsND}
            params={params}
          ></PrintNoiDung>
        </div>
      </div>
    </>
  );
};
export default NoiDungHL;
