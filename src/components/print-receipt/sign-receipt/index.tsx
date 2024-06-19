import {Row, Typography} from "antd";
import React from "react";
type Props = {
  title: string;
  name?: string;
};
const SignReceipt = (props: Props) => {
  const {title, name} = props;
  return (
    <div className="sign-receipt">
      <Row justify="center" style={{marginBottom: 100}}>
        <Typography.Text strong style={{textTransform: "uppercase"}}>
          {title}
        </Typography.Text>
      </Row>
      <Row justify={"center"}>
        {name ?? "..................................."}
      </Row>
    </div>
  );
};
export {SignReceipt};
