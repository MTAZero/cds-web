import {fieldType} from "types";
import {ColumnProps} from "types/column-props.type";
const {INPUT} = fieldType;
const columns: ColumnProps[] = [
  {title: "STT", dataIndex: "index", key: "index"},
  {title: "Họ tên", dataIndex: "full_name", key: "full_name"},
  {title: "Tên đăng nhập", dataIndex: "username", key: "username"},
  {title: "Đơn vị", dataIndex: "unit", key: "unit"},
  {title: "Role", dataIndex: "role", key: "role"},
  {title: "Tác vụ", dataIndex: "action", key: "action"},
];
const fields = [{key: "keyword", name: "keyword", type: INPUT}];
export {columns, fields};
