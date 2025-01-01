import {Row} from "antd";
import {InputFields} from "components";
import React, {forwardRef} from "react";
import {fieldType} from "types";
const {INPUT, TREE_SELECT} = fieldType;
const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
const ModalEdit = forwardRef((props: any, ref) => {
  const {descendantTreeUnit} = props;
  const data: any[] = [
    {
      type: INPUT,
      label: "Tên",
      css: css,
      name: "name",
      rules: [{required: true, message: "Bắt buộc nhập!"}],
    },
    {
      type: TREE_SELECT,
      label: "Đơn vị",
      css: css,
      name: "unit",
      rules: [{required: true, message: "Bắt buộc nhập!"}],
      treeData: descendantTreeUnit,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 8]} className="content-modal">
        <InputFields data={data} />
      </Row>
    </div>
  );
});
export default ModalEdit;
