import React from "react";
import "./style.scss";
type Props = {
  text: string;
  size: "small" | "medium" | "large";
};
const TitleCustom = ({text, size = "medium", ...props}: Props & any) => {
  return (
    <div className={`title-custom ${size}`} {...props}>
      {text}
    </div>
  );
};
export {TitleCustom};
