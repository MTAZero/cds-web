import {isValuableString} from "utils";
import "./style.scss";
import React from "react";
type Props = {
  label: string;
  value?: string;
  addonAfter?: string;
};
const FillTextReceipt = (props: Props) => {
  const {label, value, addonAfter} = props;
  return (
    <div className="fill-text-receipt">
      <div className={`${isValuableString(value) ? "line" : "line-dot"}`}>
        <span>{label}</span>
        <span> &nbsp;{value}</span>
        {isValuableString(addonAfter) && (
          <span className="addonAfter">{addonAfter}</span>
        )}
      </div>
    </div>
  );
};
export {FillTextReceipt};
