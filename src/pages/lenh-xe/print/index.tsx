import React, {forwardRef, useRef, useState} from "react";
import "./style.scss";
import {
  FillTextReceipt,
  HeaderReceipt,
  SignReceipt,
  TableCustom,
  TitleReceipt,
} from "components";
import {Button, Col, Form, Row, Table} from "antd";
import ReactToPrint from "react-to-print";
import {columns} from "./config";
const ModalLenhXe = forwardRef((props: any, ref) => {
  const {closeModal} = props;
  const printRef = useRef<any>(null);
  const [data, setData] = useState();
  return (
    <div className="lenh-xe">
      <div className="print" ref={printRef}>
        <table>
          <thead>
            <div style={{height: "1cm"}}></div>
          </thead>
          <tbody>
            <div className="lenh-dieu">
              <div className="header-section">
                <HeaderReceipt></HeaderReceipt>
              </div>
              <div className="title">
                <TitleReceipt
                  style={{marginTop: 24, marginBottom: 36}}
                  title="LỆNH ĐIỀU PHƯƠNG TIỆN"
                ></TitleReceipt>
              </div>

              <div className="main-content">
                <Row>
                  - Căn cứ Kế hoạch sử dụng xe ô tô từ ngày đến ngày đã được Thủ
                  trưởng Trung tâm phê duyệt{" "}
                </Row>
                <Row>
                  <Col span={8}>
                    <FillTextReceipt
                      label={"- Nay điều:"}
                      value="1235"
                    ></FillTextReceipt>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FillTextReceipt label={"- Nhãn hiệu:"}></FillTextReceipt>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <FillTextReceipt label={"- Biển KS:"}></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt label={"- Số lượng:"}></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt
                      label={"- Thuộc đơn vị:"}
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt
                      label={"- Thực hiện nhiệm vụ:"}
                    ></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt label={"- Cho đơn vị:"}></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt label={"- Đi từ:"}></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt label={"- Đến:"}></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt label={"- Km (Giờ):"}></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt label={"- Số chuyến:"}></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt label={"- Về từ:"}></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt label={"- Đến:"}></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt label={"- Km (Giờ):"}></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt label={"- Số chuyến:"}></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FillTextReceipt
                      label={"- Chở hàng kết hợp:"}
                    ></FillTextReceipt>
                  </Col>
                  <Col span={12}>
                    <FillTextReceipt label={"- Cho đơn vị:"}></FillTextReceipt>
                  </Col>
                </Row>
              </div>
              <div className="footer-section">
                <Row justify={"space-between"}>
                  <SignReceipt title="Người viết lệnh"></SignReceipt>
                  <SignReceipt title="Thủ trưởng đơn vị"></SignReceipt>
                </Row>
              </div>
            </div>
            <div className="nhan-xet" style={{pageBreakBefore: "always"}}>
              <div className="title">
                <TitleReceipt
                  style={{marginTop: 24, marginBottom: 24}}
                  title="NHẬN XÉT CỦA ĐƠN VỊ SỬ DỤNG PHƯƠNG TIỆN"
                ></TitleReceipt>
                <div style={{display: "flex", justifyContent: "center"}}>
                  {" "}
                  <Row justify={"space-between"} style={{width: 300}}>
                    <Col span={10}>
                      <FillTextReceipt
                        label={" Hà Nội, ngày"}
                      ></FillTextReceipt>
                    </Col>
                    <Col span={8}>
                      <FillTextReceipt label={"tháng"}></FillTextReceipt>
                    </Col>
                    <Col span={6}>
                      <FillTextReceipt label={"năm"}></FillTextReceipt>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="main-content">
                <Row>
                  <Col span={18}>
                    <FillTextReceipt
                      label={"- Họ tên người điều khiển PT:"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                  <Col span={6}>
                    <FillTextReceipt
                      label={"- Cấp bậc:"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={"- Đơn vị:"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={"- Tinh thần thái độ phục vụ:"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={"- Chấp hành kỉ luật:"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>- Kết quả thực hiện: &nbsp;</Col>
                  <Col flex={1}>
                    <FillTextReceipt
                      label={`Khi đi: Số lượng:`}
                      value=""
                      addonAfter="Km (Giờ)"
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}></Col>
                  <Col flex={1}>
                    <FillTextReceipt
                      label={`Khi về: Số lượng:`}
                      value=""
                      addonAfter="Km (Giờ)"
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={
                        "- Thời gian phương tiện hoàn thành nhiệm vụ trở về đơn vị lúc:"
                      }
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
              </div>
              <div className="footer-section">
                <Row justify={"end"}>
                  <SignReceipt title={"Chỉ huy xe"}></SignReceipt>
                </Row>
              </div>
            </div>

            <div className="thanh-toan" style={{pageBreakBefore: "always"}}>
              <div className="title">
                <TitleReceipt
                  style={{marginTop: 24, marginBottom: 24}}
                  title="THANH TOÁN XĂNG DẦU TIÊU THỤ"
                ></TitleReceipt>
              </div>
              <div className="main-content">
                <Row>
                  <Col span={4}>
                    <FillTextReceipt
                      label={"Lệnh sô"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                  <Col span={3}>
                    <FillTextReceipt label={"ngày"} value=""></FillTextReceipt>
                  </Col>
                  <Col span={3}>
                    <FillTextReceipt label={"tháng"} value=""></FillTextReceipt>
                  </Col>
                  <Col span={4}>
                    <FillTextReceipt
                      label="&nbsp; năm &nbsp;"
                      value="2024"
                    ></FillTextReceipt>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    <FillTextReceipt
                      label={"Nhãn hiệu xe"}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                  <Col span={10}>
                    <FillTextReceipt
                      label={"Định mức tiêu thụ"}
                      value=""
                      addonAfter="lit/100km"
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={`Cung đường đi:`}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={`Nội dung nhiệm vụ:`}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={`Số lượng thực hiện:`}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <FillTextReceipt
                      label={`Km (giờ) hoạt động:`}
                      value=""
                    ></FillTextReceipt>
                  </Col>
                </Row>

                <TableCustom
                  dataSource={[{}, {}]}
                  columns={columns}
                  className={["table"]}
                  pagination={false}
                ></TableCustom>
              </div>
              <div className="footer-section">
                <Row justify={"space-between"}>
                  <SignReceipt title={"Lái xe"}></SignReceipt>
                  <SignReceipt title={"Trợ lý xăng dầu"}></SignReceipt>
                </Row>
              </div>
            </div>
          </tbody>
        </table>
      </div>
      <div className="button-section">
        <Row justify={"end"}>
          <ReactToPrint
            documentTitle={` `}
            trigger={() => {
              return (
                <Button style={{marginBottom: 4}} type="primary">
                  Xuất file
                </Button>
              );
            }}
            content={() => printRef.current}
            bodyClass="lenh-xe"
          />
        </Row>
      </div>
    </div>
  );
});
export default ModalLenhXe;
