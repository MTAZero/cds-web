import {Divider, Row, Space, Typography} from "antd";
import "./style.scss";
import {FormItemReceipt} from "../form-item-receipt";
import {fieldType} from "types";
import {Dayjs} from "dayjs";
import {isValuableString} from "utils";
type Props = {
  soPhieu?: string;
  ngay?: Dayjs;
};
const HeaderReceipt = (props: Props) => {
  const {soPhieu, ngay} = props;
  return (
    <div className="header-receipt">
      <Row justify={"space-between"}>
        <Space direction="vertical" align={"center"} size={0.25}>
          <Typography.Text>BỘ TƯ LỆNH 86</Typography.Text>
          <Typography.Text strong>TRUNG TÂM 186</Typography.Text>
          <Divider type="horizontal" style={{width: 50}}></Divider>
          <div style={{width: "100%", display: "flex"}}>
            <span>Số : {isValuableString(soPhieu) ? soPhieu : "...."} </span>
          </div>
        </Space>
        <Space direction="vertical" align={"center"} size={0.25}>
          <Typography.Text strong>
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography.Text>
          <Typography.Text strong>Độc lập - Tự do - Hạnh phúc</Typography.Text>
          <Divider type="horizontal" style={{width: 150}}></Divider>
          <div>
            <span style={{fontStyle: "italic"}}>
              Hà Nội, ngày {ngay?.date() ?? "....."}{" "}
            </span>{" "}
            <span></span>{" "}
            <span style={{fontStyle: "italic"}}>
              tháng {ngay?.month() ? ngay?.month() + 1 : "....."}
            </span>{" "}
            <span style={{fontStyle: "italic"}}>
              năm {ngay?.year() ?? "....."}
            </span>
          </div>
        </Space>
      </Row>
    </div>
  );
};
export {HeaderReceipt};
