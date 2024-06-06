import {useEffect, useState} from "react";
import "./Print.scss";
import {Row, Space} from "antd";
import {TableCustom} from "components";
import {formatDateToString} from "utils";
import {formatTime} from "types";
const Print = props => {
  const {dataSource, listUnit} = props;
  const [signer, setSigner] = useState();
  const [sample, setSample] = useState<any>();
  useEffect(() => {
    setSample(dataSource?.[0]);
  }, [dataSource]);
  useEffect(() => {
    const _setCheckerAndSigner = donVi => {
      let _signer;
      const nameDonVi = listUnit?.find(e => e?._id == donVi)?.name;

      switch (nameDonVi) {
        case "Trung tâm 1":
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
      if (nameDonVi?.includes("Đội")) {
        _signer = "đội trưởng";
      }
      setSigner(_signer);
    };
    _setCheckerAndSigner(sample?.unit);
  }, [sample]);
  return (
    // <div className="print-rut-kinh-nghiem">123</div>
    <>
      {dataSource &&
        dataSource?.map(item => (
          <div
            className="print-rut-kinh-nghiem"
            style={{pageBreakAfter: "always"}}
          >
            <table>
              <thead style={{height: "24mm"}}></thead>
              <tbody>
                <div className="header">
                  <div>
                    <Space direction="vertical" align="center">
                      <div style={{fontSize: "18pt"}}>
                        RÚT KINH NGHIỆM CÔNG TÁC HUẤN LUYỆN TUẦN{" "}
                        {sample?.week ?? "..."} THÁNG {sample?.month ?? "..."}
                      </div>
                    </Space>
                  </div>
                </div>

                <Space direction="vertical" size={24} className="content">
                  <div>
                    <span className="label">I. Thời gian: </span>
                    <span className="value">
                      {" "}
                      {formatDateToString(
                        item?.time,
                        formatTime.time_24h
                      )} ngày{" "}
                      {formatDateToString(item?.time, formatTime.dayFull)}
                    </span>
                  </div>
                  <div>
                    <span className="label">II. Tham gia:</span>
                    <span className="value">{item?.join}</span>
                  </div>
                  <div>
                    <span className="label">III. Kết quả huấn luyện:</span>
                    <span className="value">{item?.resultTraining}</span>
                  </div>
                  <div>
                    <span className="label">IV. Ưu, khuyết điểm:</span>
                    <span className="value">{item?.evaluation}</span>
                  </div>
                  <div>
                    <span className="label">
                      V. Nhiệm vụ huấn luyện tuần sau:
                    </span>
                    <span className="value">{item?.dutyNextWeek}</span>
                  </div>
                </Space>
                <Row justify={"end"} style={{marginTop: 30}}>
                  <Space align="center" direction="vertical">
                    <div
                      style={{
                        fontSize: "18pt",
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
        ))}
    </>
  );
};
export default Print;
