import {Button, Form, Row, Spin} from "antd";
import Icons from "assests/icons";
import {InputFields} from "components";
import React, {useEffect, useState} from "react";
import {
  usePostUnitMutation,
  usePutUnitMutation,
} from "../../../../redux/apiRtk/unit";
import {fieldType} from "types";
import {getDescendantTreeUnit, NotificationService, randomId} from "utils";
const css = {xs: 24, sm: 24, md: 24, lg: 24, xl: 24};
const FormUnit = props => {
  const [form] = Form.useForm();
  const {record, listUnit} = props;

  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  useEffect(() => {
    const _descendantTreeUnit = getDescendantTreeUnit(listUnit);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [listUnit]);
  const [putUnit, {isLoading: isLoadingPut, isSuccess: isSuccessPut}] =
    usePutUnitMutation();
  const [postUnit, {isLoading: isLoadingPost, isSuccess: isSuccessPost}] =
    usePostUnitMutation();
  const fields: any[] = [
    {label: "Tên đơn vị", type: fieldType.INPUT, css: css, name: "name"},
    {
      key: randomId(),
      label: "Trực thuộc",
      type: fieldType.TREE_SELECT,
      css: css,
      name: "parent",
      treeData: descendantTreeUnit,
    },
    {
      label: "Mô tả",

      type: fieldType.INPUT,
      css: css,
      name: "description",
    },
  ];
  useEffect(() => {
    if (isSuccessPost) {
      NotificationService.success("Thêm dữ liệu thành công");
    }
  }, [isSuccessPost]);
  useEffect(() => {
    if (isSuccessPut) {
      NotificationService.success("Sửa dữ liệu thành công");
    }
  }, [isSuccessPut]);
  useEffect(() => {
    if (record) {
      form.resetFields();
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [record]);
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      return null;
    }
  };
  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return;
    }
    const payload = {data: values, id: record?._id};
    const callApi = record?._id ? putUnit : postUnit;
    callApi(payload);
  };
  return (
    <div className="container">
      {/* <CardCustom title="Thông tin đơn vị"> */}
      <Spin spinning={isLoadingPost || isLoadingPut}>
        {" "}
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <InputFields data={fields}></InputFields>
          </Row>
        </Form>
        <Row justify={"end"} style={{marginTop: 8}}>
          <Button
            type="primary"
            icon={<Icons.save></Icons.save>}
            onClick={handleSubmit}
          >
            Lưu lại
          </Button>
        </Row>
      </Spin>
      {/* </CardCustom> */}
    </div>
  );
};
export default FormUnit;
