import {fieldType} from "types";
import {ColumnProps} from "types/column-props.type";

const {INPUT} = fieldType;
const columns: ColumnProps[] = [
  {title: "STT", dataIndex: "index", key: "index"},
  {title: "Role", dataIndex: "role", key: "role"},
  {title: "Action", dataIndex: "action", key: "_action"},
  {title: "Module", dataIndex: "module", key: "module"},
  {title: "Tác vụ", dataIndex: "action", key: "action"},
];
const fields = [{key: "keyword", name: "keyword", type: INPUT}];
export {columns, fields};
