import {TableCustom} from "components";
import React, {useEffect, useState} from "react";
import "./PrintTienTrinh.scss";
import {Row, Space} from "antd";
import {formatDateToString} from "utils";
import {formatTime} from "types";
const PrintTienTrinh = (props: any) => {
  const {dataSource, columns, listUnit} = props;
  const [checker, setChecker] = useState<string>();
  const [signer, setSigner] = useState<any>();
  const [sample, setSample] = useState<any>();
  useEffect(() => {
    console.log(dataSource);
    setSample(dataSource?.[0]);
  }, [dataSource]);
  useEffect(() => {
    const _setCheckerAndSigner = (unit: any) => {
      let _checker;
      let _signer;
      const nameUnit = listUnit?.find(e => e?._id == unit)?.name;
      switch (nameUnit) {
        case "Trung tâm":
          _signer = "chỉ huy trưởng";
          break;
        case "Phòng Chính trị":
          _signer = "chủ nhiệm chính trị";
          break;
        case "Phòng Tham mưu":
          _signer = "phó tham mưu trưởng";
          break;
        case "Phòng HC-KT":
          _signer = "chủ nhiệm";
          break;

        default:
          _signer = "Cụm trưởng";
          break;
      }
      if (nameUnit?.includes("Đội")) {
        _checker = "cụm trưởng";
        _signer = "đội trưởng";
      } else {
        _checker = "chỉ huy trưởng";
      }
      setChecker(_checker);
      setSigner(_signer);
    };
    _setCheckerAndSigner(sample?.unit);
  }, [sample]);
  return (
    <div className="print-tien-trinh container">
      <table>
        <thead style={{height: "20mm"}}></thead>
        <tbody>
          <div
            className="header"
            style={{
              display: "-webkit-box",
              position: "relative",
              flexDirection: "row",
            }}
          >
            <div className="left">
              <Space align="center" direction="vertical">
                <div style={{fontSize: "26pt"}}>PHÊ DUYỆT</div>
                <div style={{fontSize: 28, fontStyle: "italic"}}>
                  {" "}
                  Ngày ... tháng ... năm 20...
                </div>
                <div style={{fontSize: "26pt", textTransform: "uppercase"}}>
                  {checker}
                </div>
                <br />
                <br />
                <br />
                ......................................
              </Space>
            </div>
            <div
              className="center"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Space direction="vertical" align="center">
                <div style={{fontSize: "30pt"}}>TIẾN TRÌNH BIỂU</div>
                <div style={{fontSize: "26pt"}}>
                  Huấn luyện chiến đấu tuần {sample?.week ?? "..."} tháng{" "}
                  {sample?.month ?? "..."}
                </div>
                <div style={{fontSize: "26pt"}}>
                  (Từ ngày{" "}
                  {formatDateToString(sample?.from_date, formatTime.dayMonth) ??
                    "..."}{" "}
                  đến ngày{" "}
                  {formatDateToString(sample?.to_date, formatTime.dayMonth) ??
                    "..."}{" "}
                  )
                </div>
              </Space>
            </div>
          </div>
          <TableCustom
            className={["table-print"]}
            id="table-print"
            dataSource={dataSource}
            pagination={false}
            columns={columns}
            hideCheckboxCol={true}
          ></TableCustom>
          <Row justify={"end"} style={{marginTop: 30}}>
            <Space align="center" direction="vertical">
              <div style={{fontSize: 28}}> Ngày ... tháng ... năm 20...</div>
              <div
                style={{
                  fontSize: "26pt",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {signer}
              </div>
              <br />
              <br />
              <br />
              ......................................
            </Space>
          </Row>
        </tbody>
        <tfoot style={{height: "20mm"}}></tfoot>
      </table>
    </div>
  );
};
export default PrintTienTrinh;
