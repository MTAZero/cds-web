import {Divider, Typography} from "antd";
import React from "react";
import "./style.scss";
type Props = {
  title: string;
  style?: any;
};
const TitleReceipt = (props: Props) => {
  const {title, style} = props;
  return (
    <div className="title-receipt" style={style}>
      <Typography.Text strong>{title}</Typography.Text>
      <div style={{display: "flex", justifyContent: "center", width: "4cm"}}>
        <Divider type="horizontal"></Divider>
      </div>
    </div>
  );
};
export {TitleReceipt};
