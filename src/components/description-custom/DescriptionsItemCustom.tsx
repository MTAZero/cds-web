import React from "react";

type Props = {
  label: string;
  children: any;
};
const DescriptionsItem = (props: Props & any) => {
  const {label, children} = props;
  return (
    <div className="descriptions-item-custom">
      <span className="label">{label}: </span>
      <span className="value">{children}</span>
    </div>
  );
};
export {DescriptionsItem};
