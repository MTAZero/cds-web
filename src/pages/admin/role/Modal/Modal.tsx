import {Button, Form, Row, Space, Spin} from "antd";
import {InputFields, ListActionButton} from "components";
import React, {useEffect, useState} from "react";
import {APIServices, NotificationService, isValuable} from "utils";
import {fields} from "./config";
const Modal = props => {
  const {id, getList, closeModal} = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const getDetailRole = async id => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getDetailRole(id);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isValuable(id)) {
      getDetailRole(id);
    } else {
      setData(null);
    }
  }, [id]);
  const submit = async () => {
    try {
      const values = await form.validateFields();
      const apiFunc = id
        ? APIServices.QuanTri.updateRole
        : APIServices.QuanTri.createRole;
      setIsLoading(true);
      await apiFunc(values);
      setIsLoading(false);
      getList();
      NotificationService.success("Lưu thông tin thành công");
      if (!id) {
        closeModal();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data]);
  return (
    <Spin spinning={isLoading}>
      <div>
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <InputFields data={fields}></InputFields>
          </Row>
        </Form>

        <Row justify={"end"} style={{marginTop: 8}}>
          <Space>
            {" "}
            <Button onClick={closeModal}>Hủy</Button>
            <Button onClick={submit} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      </div>
    </Spin>
  );
};
export default Modal;
