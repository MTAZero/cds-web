import React, {forwardRef, useEffect, useRef, useState} from "react";
import "./style.scss";
import {Col, Row, Typography} from "antd";
import {
  APIServices,
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
} from "utils";
import {FillTextAreaReceipt, FillTextReceipt, TitleCustom} from "components";
import {formatTime} from "types";
import {useAppSelector} from "hooks";

const Print = forwardRef((props: any, ref) => {
  const {id} = props;
  const printRef = useRef<any>(null);
  const [data, setData] = useState<any>();
  const {listUnit} = useAppSelector(state => state.catalog);
  useEffect(() => {
    if (!isValuable(id)) {
      setData(null);
    } else {
    }
  }, [id]);
  useEffect(() => {
    const getData = async id => {
      try {
        const res = await APIServices.SoDienDen.getDetailSoDienDen(id);
        setData(res);
      } catch (error) {
        setData(null);
      }
    };
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  return (
    <div className="so-dien">
      <div>
        <table>
          <thead>
            <div style={{height: "1.5cm"}}></div>
          </thead>
          <tbody>
            <Row justify={"center"}>
              <TitleCustom text="ĐIỆN ĐẾN"></TitleCustom>
            </Row>
            <Row justify={"space-between"}>
              <Col span={4}>
                <FillTextReceipt
                  label={"Giờ"}
                  value={formatDateToString(
                    convertDateStringToDateObject(data?.dateRead),
                    formatTime.time_24h
                  )}
                  dot={true}
                ></FillTextReceipt>
              </Col>
              <Col span={4}>
                <FillTextReceipt
                  label={"Ngày"}
                  value={formatDateToString(
                    convertDateStringToDateObject(data?.dateRead),
                    "DD"
                  )}
                  dot={true}
                ></FillTextReceipt>
              </Col>
              <Col span={4}>
                <FillTextReceipt
                  label={"Tháng"}
                  value={formatDateToString(
                    convertDateStringToDateObject(data?.dateRead),
                    "MM"
                  )}
                  dot={true}
                ></FillTextReceipt>
              </Col>
              <Col span={4}>
                <FillTextReceipt
                  label={"Năm"}
                  value={formatDateToString(
                    convertDateStringToDateObject(data?.dateRead),
                    "YYYY"
                  )}
                  dot={true}
                ></FillTextReceipt>
              </Col>
            </Row>
            <Row justify={"space-between"}>
              <Col span={12}>
                <FillTextReceipt
                  label={"Người truyền điện"}
                  dot={true}
                  value={data?.personRead}
                ></FillTextReceipt>
              </Col>
              <Col span={12}>
                <FillTextReceipt
                  label={"Cấp bậc"}
                  value={data?.rankRead}
                  dot={true}
                ></FillTextReceipt>
              </Col>
            </Row>
            <Row justify={"space-between"}>
              <Col span={12}>
                <FillTextReceipt
                  label={"Chức vụ"}
                  value={data?.positionRead}
                  dot={true}
                ></FillTextReceipt>
              </Col>
              <Col span={12}>
                <FillTextReceipt
                  label={"Đơn vị"}
                  value={listUnit?.find(e => e._id == data?.unitId)?.name}
                  dot={true}
                ></FillTextReceipt>
              </Col>
            </Row>
            <Row>
              <FillTextReceipt
                label={"Điện thoại liên hệ"}
                value={data?.telephoneNumber}
              ></FillTextReceipt>
            </Row>
            <Row justify={"space-between"} style={{width: "100%"}}>
              <Col span={24}>
                <FillTextAreaReceipt
                  label={"Nội dung điện"}
                  value={data?.content}
                ></FillTextAreaReceipt>
              </Col>
            </Row>
            <Row></Row>
          </tbody>
        </table>
      </div>
    </div>
  );
});
export default Print;
