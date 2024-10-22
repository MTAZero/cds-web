import {isValuable, isValuableString} from "utils";
import "./style.scss";
import {ReactNode} from "react";
type Props = {
  label: string | ReactNode;
  value?: string | ReactNode | number;
  addonAfter?: string;
  dot?: boolean;
};
const FillTextReceipt = (props: Props) => {
  const {label, value, addonAfter, dot = false} = props;
  return (
    <div className="fill-text-receipt">
      <div
        className={`${
          (isValuableString(value) || typeof value == "number") && !dot
            ? "line"
            : "line-dot"
        }`}
      >
        <span>{label}</span>
        <span> {value} </span>
        {isValuableString(addonAfter) && (
          <span className="addonAfter">{addonAfter}</span>
        )}
      </div>
    </div>
  );
};
export {FillTextReceipt};
