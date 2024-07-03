import React, {forwardRef, useEffect, useRef, useState} from "react";
import "./style.scss";
import {Button, Col, Form, Row, Space, Table, Typography} from "antd";
import ReactToPrint from "react-to-print";
import {
  APIServices,
  capitalizeFirstLetter,
  convertNumberDecimalToWords,
  convertNumberToWords,
  formatDateToString,
  formatToCurrencyTypeToFixed,
  isValuable,
  toNumber,
} from "utils";
import {formatTime} from "types";
import {FillTextReceipt, SignReceipt, TableCustom} from "components";
import {columns} from "./config";
const ModalPhieuXuat = forwardRef((props: any, ref) => {
  const {closeModal, id} = props;
  const printRef = useRef<any>(null);
  const [data, setData] = useState<any>();
  const [soKhoan, setSoKhoan] = useState<any>(0);
  const [soLuong, setSoLuong] = useState<any>(0);
  const [thanhTien, setThanhTien] = useState<any>(0);
  useEffect(() => {
    if (!isValuable(id)) {
      setData(null);
    } else {
    }
  }, [id]);
  useEffect(() => {
    const getData = async id => {
      try {
        const res = await APIServices.PhieuXuatXang.getDetailPhieuXuatXang(id);
        console.log(res);
        setData(res);
      } catch (error) {
        setData(null);
      }
    };
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  const setTong = data => {
    const dataTable = data?.materials;
    console.log(dataTable);
    let _soKhoan = 0;
    let _soLuong = 0;
    let _thanhTien = 0;
    dataTable?.forEach((e, index) => {
      _soKhoan += 1;
      _soLuong += toNumber(e?.actualExport);
      _thanhTien += toNumber(e?.sumMoney);
    });
    console.log(_soLuong);

    setSoKhoan(_soKhoan);
    setSoLuong(_soLuong);
    setThanhTien(_thanhTien);
  };
  useEffect(() => {
    setTong(data);
  }, [data]);
  const fields1 = data => {
    return [
      {
        key: "Đơn vị giao hàng",
        value: data?.shippingUnit,
      },
      {
        key: "Đơn vị nhận hàng",
        value: data?.receiveUnit,
      },
      {
        key: "Tính chất xuất",
        value: data?.exportProperty,
      },
      {
        key: "Theo lệnh số",
        value: data?.commandNumber,
      },
      {
        key: "Người nhận hàng",
        value: data?.receiver,
      },
      {
        key: "Giấy giới thiệu (CMT)",
        value: data?.referral,
      },
    ];
  };
  const fields2 = data => {
    return [
      {
        key: "Có giá trị đến ngày",
        value: formatDateToString(data?.expiryDate, formatTime.dayFull),
      },
      {
        key: "Đơn vị vận chuyển",
        value: data?.deliveryUnit,
      },
      {
        key: "Số xe",
        value: data?.license,
      },
      {
        key: "Dung tích thiết kế",
        value: data?.designCapacity,
      },
      {
        key: "Dung tích phải xuất",
        value: data?.exportCapacity,
      },
      {
        key: "Số lượng bao bì",
        value: data?.numberOfPackages,
      },
    ];
  };
  return (
    <div className="phieu-xuat-xang">
      <div className="print" ref={printRef}>
        <table>
          <thead>
            <div style={{height: "1.5cm"}}></div>
          </thead>
          <tbody>
            <div className="header-section" style={{display: "flex"}}>
              <Row>
                <Col span={8}>
                  <Row justify={"center"}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      BỘ TƯ LỆNH 86
                      <div>
                        <Typography.Text strong>TRUNG TÂM 186</Typography.Text>
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row justify={"center"}>
                    <Typography.Text strong style={{fontSize: "14pt"}}>
                      PHIẾU XUẤT XĂNG DẦU
                    </Typography.Text>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row justify={"end"}>
                    <div className="border">Số 1-03/XD-14</div>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="receipt-dto">
              <Row>
                <Col span={8}>
                  <Space direction="vertical" style={{width: "100%"}}>
                    {fields1(data)?.map(e => (
                      <div>
                        {e?.key}: {e?.value}
                      </div>
                    ))}
                  </Space>
                </Col>
                <Col span={8}>
                  <Row>
                    <div>
                      <div>Số: </div>
                      <div>Ngày:</div>
                    </div>
                    <div
                      className="border"
                      style={{
                        height: "80px",
                        position: "relative",
                        bottom: 4,
                        marginLeft: 4,
                        textAlign: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <Typography.Text strong>
                          {data?.numberBill}
                        </Typography.Text>{" "}
                      </div>
                      <div>
                        {formatDateToString(data?.date, formatTime.dayFull)}
                      </div>
                    </div>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row justify={"end"}>
                    <Space direction="vertical" style={{width: "fit-content"}}>
                      {fields2(data)?.map(e => (
                        <div>
                          {e?.key}: {e?.value}
                        </div>
                      ))}
                    </Space>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="table">
              <TableCustom
                className={["table-print"]}
                pagination={false}
                dataSource={data?.materials}
                columns={columns}
                summary={pageData => {
                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}></Table.Summary.Cell>
                        <Table.Summary.Cell index={0}></Table.Summary.Cell>
                        <Table.Summary.Cell index={0}>
                          <div
                            style={{textAlign: "center", fontWeight: "bold"}}
                          >
                            Cộng
                          </div>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <div style={{textAlign: "right", fontWeight: "bold"}}>
                            {formatToCurrencyTypeToFixed(soLuong)}
                          </div>{" "}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={8}>
                          <div style={{textAlign: "right", fontWeight: "bold"}}>
                            {formatToCurrencyTypeToFixed(thanhTien)}
                          </div>{" "}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              ></TableCustom>
              <Row gutter={[8, 8]}>
                <Col span={6}>
                  <FillTextReceipt
                    label={"Tổng cộng:"}
                    value={capitalizeFirstLetter(convertNumberToWords(soKhoan))}
                    addonAfter="khoản"
                  ></FillTextReceipt>
                </Col>
                <Col span={6}>
                  <FillTextReceipt
                    label={"Số lượng:"}
                    value={capitalizeFirstLetter(
                      convertNumberDecimalToWords(soLuong)
                    )}
                    addonAfter="lít,kg"
                  ></FillTextReceipt>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <FillTextReceipt
                    label={"Thành tiền:"}
                    value={capitalizeFirstLetter(
                      convertNumberToWords(thanhTien)
                    )}
                  ></FillTextReceipt>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <FillTextReceipt
                    label={"Ghi chú:"}
                    value={data?.note}
                  ></FillTextReceipt>
                </Col>
              </Row>
            </div>
            <div className="footer">
              <Row gutter={[12, 12]} justify={"space-between"}>
                <SignReceipt
                  title={"Người nhận"}
                  name={data?.receiver}
                ></SignReceipt>
                <SignReceipt
                  title={"Người giao"}
                  name={data?.deliverier}
                ></SignReceipt>
                <SignReceipt
                  title={"Ban tài chính"}
                  name={data?.financePerson}
                ></SignReceipt>
                <SignReceipt
                  title={"Người viết phiếu"}
                  name={data?.createdPerson}
                ></SignReceipt>
                <SignReceipt
                  title={"TL.Chỉ huy trưởng"}
                  name={data?.leader}
                ></SignReceipt>
              </Row>
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
            bodyClass="phieu-xuat-xang"
          />
        </Row>
      </div>
    </div>
  );
});
export default ModalPhieuXuat;
