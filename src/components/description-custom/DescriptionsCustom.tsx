import {Col, Row} from "antd";
import {DescriptionsItem} from "./DescriptionsItemCustom";
import "./DescriptionsCustom.scss";
const Descriptions = props => {
  const {children} = props;
  return (
    <Row gutter={[4, 4]} className="descriptions-custom">
      {children
        ?.filter(item => !item?.props?.hidden)
        .map(e => (
          <Col span={e?.props?.span ?? 12}>{e}</Col>
        ))}
    </Row>
  );
};
export {Descriptions, DescriptionsItem};
