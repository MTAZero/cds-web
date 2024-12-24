import {Row} from "antd";
import {InputFields} from "components";
import React, {forwardRef} from "react";
import {fieldType} from "types";
const {INPUT, TREE_SELECT} = fieldType;
const ModalEdit = forwardRef((props: any, ref) => {
  const {descendantTreeUnit} = props;
  const data: any[] = [
    {
      type: INPUT,
      label: "Tên",
      col: 1,
      name: "name",
      rules: [{required: true, message: "Bắt buộc nhập!"}],
    },
    {
      type: TREE_SELECT,
      label: "Đơn vị",
      col: 1,
      name: "unit",
      rules: [{required: true, message: "Bắt buộc nhập!"}],
      treeData: descendantTreeUnit,
    },
  ];

  return (
    <Row gutter={[16, 8]} className="content-modal">
      <InputFields data={data} />
    </Row>
  );
});
export default ModalEdit;
