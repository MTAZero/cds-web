import {fieldType} from "types";
const css = {xs: 24, sm: 24, md: 6, lg: 7, xl: 7};

const fields: any = [
  {name: "start", type: fieldType.DATE, label: "Từ ngày", css: css},
  {name: "end", type: fieldType.DATE, label: "Đến ngày", css: css},
];
export {fields};
