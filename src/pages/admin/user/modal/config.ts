import {ranks, userTypes} from "const";
import {fieldType} from "types";

const {INPUT, COMBO_BOX, PASSWORD, RADIO_VN} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const fields: any[] = [
  {key: "_id", name: "_id", type: INPUT, hide: true},
  {
    key: "full_name",
    name: "full_name",
    type: INPUT,
    label: "Họ tên",
    css: css,
    rules: [{required: true, message: "Bắt buộc nhập họ tên"}],
  },
  {
    key: "username",
    name: "username",
    type: INPUT,
    label: "Tài khoản",
    css: css,
  },
  {
    key: "password",
    name: "password",
    type: PASSWORD,
    label: "Mật khẩu",
    css: css,
    rules: [{required: true, message: "Bắt buộc nhập mật khẩu"}],
  },
  {key: "unit", name: "unit", type: COMBO_BOX, label: "Đơn vị", css: css},
  {key: "role", name: "role", type: COMBO_BOX, label: "Role", css: css},
  {
    key: "position",
    name: "position",
    type: COMBO_BOX,
    label: "Vị trí",
    css: css,
  },
  {
    key: "rank",
    name: "rank",
    type: COMBO_BOX,
    label: "Cấp bậc",
    css: css,
    options: ranks.map(e => ({value: e, label: e})),
  },
  {
    key: "type",
    name: "type",
    type: COMBO_BOX,
    label: "Phân loại",
    css: css,
    options: userTypes.map(e => ({value: e, label: e})),
  },
  {
    key: "isPersonal",
    name: "isPersonal",
    type: RADIO_VN,
    label: "Tài khoản cá nhân",
    css: css,
    defaultValue: true,
  },
];
export {fields};
