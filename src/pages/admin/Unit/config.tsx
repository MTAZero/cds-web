import {fieldType} from "types";
import {ColumnProps} from "types/column-props.type";

const {INPUT} = fieldType;
const columns: ColumnProps[] = [
  {title: "STT", dataIndex: "index", key: "index"},
  {title: "Đơn vị", dataIndex: "name", key: "name"},

  {title: "Tác vụ", dataIndex: "action", key: "action"},
];
const fields = [{key: "keyword", name: "keyword", type: INPUT}];
export {columns, fields};
