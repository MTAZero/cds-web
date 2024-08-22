import {isValuable, isValuableString} from "utils";
import "./style.scss";
import {ReactNode} from "react";
type Props = {
  label: string | ReactNode;
  value?: string | ReactNode | number;
  addonAfter?: string;
};
const FillTextAreaReceipt = (props: Props) => {
  const {label, value, addonAfter} = props;
  return (
    <div className="fill-text-area-receipt">
      <div
        className={`${
          isValuableString(value) || typeof value == "number"
            ? "line"
            : "line-dot"
        }`}
      >
        <span>{label}</span>
        <span> &nbsp;{value} </span>
        {/* {isValuableString(addonAfter) && (
          <span className="addonAfter">{addonAfter}</span>
        )} */}
      </div>
    </div>
  );
};
export {FillTextAreaReceipt};
