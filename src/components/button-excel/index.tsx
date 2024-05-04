import {Button} from "antd";
import React from "react";
import {ExcelSVG} from "assests/svg";
import "./ButtonExcel.scss";
type Props = {
  onClick?: () => void;
  disabled?: boolean;
};
const ButtonExcel = (props: Props) => {
  const {onClick, disabled} = props;
  return (
    <Button className="btn-excel" onClick={onClick} disabled={disabled}>
      <ExcelSVG />
      Xuất báo cáo
    </Button>
  );
};
export {ButtonExcel};
