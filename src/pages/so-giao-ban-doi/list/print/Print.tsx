import {useEffect, useState} from "react";
import "./Print.scss";
import {Col, Row, Space, Table, Typography} from "antd";
import {FillTextReceipt, SignReceipt, TableCustom} from "components";
import {convertDateStringToDateObject, formatDateToString} from "utils";
import {formatTime} from "types";
const Print = props => {
  const {dataSource, listUnit} = props;
  console.log(dataSource?.[0]);
  return (
    // <div className="print-rut-kinh-nghiem">123</div>
    <div className="print-so-giao-ban">
      {dataSource &&
        dataSource?.map(e => (
          <div style={{pageBreakAfter: "always"}}>
            <table>
              <thead style={{height: "2cm"}}></thead>
              <tbody>
                <div className="page-1">
                  <div className="header">
                    <Space
                      direction="vertical"
                      align="center"
                      style={{width: "100%"}}
                    >
                      <div style={{fontSize: "18pt", textAlign: "center"}}>
                        GIAO BAN NGÀY{" "}
                        {formatDateToString(
                          convertDateStringToDateObject(e?.date, true),
                          formatTime.dayFull
                        )}
                      </div>
                    </Space>
                  </div>

                  <Row justify={"start"} style={{fontSize: "16pt"}}>
                    <Col flex={"160px"}>
                      <Typography.Text strong>TRỰC CHỈ HUY:</Typography.Text>
                    </Col>
                    <Col>
                      {" "}
                      <Typography.Text> {e?.dutyLeader_name}</Typography.Text>
                    </Col>
                  </Row>
                  <Row justify={"start"}>
                    <Col flex={"160px"}>
                      <Typography.Text strong>TRỰC ƯCSC:</Typography.Text>
                    </Col>
                    <Col>
                      {" "}
                      <Typography.Text>
                        {" "}
                        {e?.dutySecondPerson_name}
                      </Typography.Text>{" "}
                    </Col>
                  </Row>
                  <div style={{flex: 1, marginTop: 12}}>
                    <Row className="table">
                      <Col span={12} className="col">
                        <div className="strong">
                          I. Quân số - Vũ khí, trang bị
                        </div>
                        <div className="strong">1. Quân số</div>
                        <div>
                          <FillTextReceipt
                            label="- Tổng quân số: "
                            value={`${e?.totalAttendance}/${e?.total}`}
                          ></FillTextReceipt>
                        </div>

                        <Row>
                          {e?.troopEachTypes?.map(item => (
                            <Col>
                              <FillTextReceipt
                                label={`${item?.type}: `}
                                value={`${item?.totalAttendance}/${item?.total};  `}
                              ></FillTextReceipt>
                            </Col>
                          ))}
                        </Row>
                        <div className="strong">2. Vũ khí, trang bị</div>
                        <div className="line-dot">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.weaponsEquipment?.replace(
                                "\n",
                                "<br/>"
                              ),
                            }}
                          ></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                        <div className="strong">
                          II. Kết quả thực hiện nhiệm vụ trong ngày
                        </div>
                        <div>1. Điểm mạnh:</div>
                        <div className="line-dot">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.advantages?.replace("\n", "<br/>"),
                            }}
                          ></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                        <div>2. Tồn tại: </div>
                        <div className="line-dot">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.disadvantages?.replace("\n", "<br/>"),
                            }}
                          ></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </Col>
                      <Col span={12} className="col col-2">
                        <div className="strong">
                          III. Dự kiến Kế hoạch ngày tới đơn vị
                        </div>
                        <div className="line-dot">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.scheduleSuperiorUnitNextDay?.replace(
                                "\n",
                                "<br/>"
                              ),
                            }}
                          ></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                        <div className="strong">
                          IV. Kiến nghị, đề nghị (nếu có)
                        </div>
                        <div className="line-dot">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.request?.replace("\n", "<br/>"),
                            }}
                          ></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                        <div className="strong">V. Ý kiến của đội</div>
                        <div className="line-dot">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e?.opinion?.replace("\n", "<br/>"),
                            }}
                          ></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </Col>{" "}
                    </Row>
                  </div>
                </div>
                <div className="page-2">
                  <Row className="table">
                    <Col span={12} className="col">
                      <div className="strong">
                        VI. Kết luận của Trực chỉ huy Cụm
                      </div>
                      <div className="line-dot">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e?.concludeDutyLeader?.replace(
                              "\n",
                              "<br/>"
                            ),
                          }}
                        ></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <div className="strong">
                        VII. Dự kiến Kế hoạch ngày tới Trung tâm
                      </div>
                      <div className="line-dot">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e?.scheduleSuperiorUnitNextDay?.replace(
                              "\n",
                              "<br/>"
                            ),
                          }}
                        ></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </Col>
                    <Col span={12} className="col col-2">
                      <div className="strong">
                        VIII. Ý kiến chỉ đạo chỉ huy Trung tâm
                      </div>
                      <div className="line-dot">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: e?.opinionSuperiorUnitNextDay?.replace(
                              "\n",
                              "<br/>"
                            ),
                          }}
                        ></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <SignReceipt title={"TRỰC CHỈ HUY"}></SignReceipt>
                    </Col>
                  </Row>
                </div>
              </tbody>
              <tfoot style={{height: "20mm"}}></tfoot>
            </table>
          </div>
        ))}
    </div>
  );
};
export default Print;
