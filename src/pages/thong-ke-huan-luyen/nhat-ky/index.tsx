import {TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {columnsNK} from "./config";
import {Button, Row} from "antd";
import ReactToPrint from "react-to-print";
import {APIServices, checkEmptyObj, formatDateToString, toArray} from "utils";
import {formatTime} from "types";
import PrintNhatKy from "./print";
type Props = {
  params: any;
};
const NhatKyHL = (props: Props) => {
  const {params} = props;
  const printRef = useRef<any>();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!checkEmptyObj(params)) {
      getNhatKyHuanLuyen(params);
    }
  }, [params]);
  const getNhatKyHuanLuyen = async params => {
    try {
      setIsLoading(true);
      const res = await APIServices.ThongKe.getNhatKy(params);
      setData(toArray(res?.items));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Row justify={"end"}>
        <ReactToPrint
          documentTitle={`Nhật ký huấn luyện tháng ${
            params?.thang ?? "..."
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
          bodyClass="print-nhat-ky"
        />
      </Row>
      <TableCustom
        isLoading={isLoading}
        columns={columnsNK}
        dataSource={data}
        pagination={false}
      ></TableCustom>

      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <PrintNhatKy
            ref={printRef}
            dataSource={data}
            columns={columnsNK}
            params={params}
          ></PrintNhatKy>
        </div>
      </div>
    </>
  );
};
export default NhatKyHL;
