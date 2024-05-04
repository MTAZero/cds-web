import React from "react";
import "./CollapseCustom.scss";
import {Collapse} from "antd";
type Props = {
  title?: String;
  children: any;
};
const CollapseCustom = (props: Props) => {
  const {title, children, ...restProps} = props;
  return (
    <div className="collapse-custom">
      <Collapse
        items={[
          {
            key: "1",
            label: title,
            children: children,
          },
        ]}
        defaultActiveKey={["1"]}
        {...restProps}
      />
    </div>
  );
};
export {CollapseCustom};
