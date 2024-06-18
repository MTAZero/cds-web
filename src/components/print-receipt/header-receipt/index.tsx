import {Divider, Row, Space, Typography} from "antd";
import "./style.scss";
import {FormItemReceipt} from "../form-item-receipt";
import {fieldType} from "types";
const {INPUT} = fieldType;
const HeaderReceipt = props => {
  const {form} = props;
  return (
    <div className="header-receipt">
      <table>
        <thead>
          <div style={{height: "1cm"}}></div>
        </thead>
        <tbody>
          <Row justify={"space-between"}>
            <Space direction="vertical" align={"center"} size={4}>
              <Typography.Text>BỘ TƯ LỆNH 86</Typography.Text>
              <Typography.Text strong>TRUNG TÂM 186</Typography.Text>
              <Divider type="horizontal" style={{width: 50}}></Divider>
              <div style={{width: "100%", display: "flex"}}>
                <span>Số : ..... </span>
              </div>
            </Space>
            <Space direction="vertical" align={"center"} size={4}>
              <Typography.Text strong>
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography.Text>
              <Typography.Text strong>
                Độc lập - Tự do - Hạnh phúc
              </Typography.Text>
              <Divider type="horizontal" style={{width: 150}}></Divider>
              <div>
                <span>Hà Nội, ngày .... </span> <span></span>{" "}
                <span>tháng ....</span> <span>năm ....</span>
              </div>
            </Space>
          </Row>
        </tbody>
      </table>
    </div>
  );
};
export {HeaderReceipt};
