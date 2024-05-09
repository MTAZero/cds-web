import {Button, Form, Row, Space, Spin} from "antd";
import {InputFields, ListActionButton} from "components";
import React, {useEffect, useState} from "react";
import {fields} from "./config";
import {APIServices, NotificationService, isValuable} from "utils";
const Modal = props => {
  const {id, getList, closeModal} = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const getDetailPosition = async id => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getDetailPosition(id);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isValuable(id)) {
      getDetailPosition(id);
    } else {
      setData(null);
    }
  }, [id]);
  const submit = async () => {
    try {
      const values = await form.validateFields();
      const apiFunc = id
        ? APIServices.QuanTri.updatePosition
        : APIServices.QuanTri.createPosition;
      setIsLoading(true);
      const res = await apiFunc(values);
      setIsLoading(false);
      getList();
      NotificationService.success("Lưu thông tin thành công");
      if (!id) {
        closeModal();
      }
    } catch (error) {
      NotificationService.error(
        error?.response?.data?.message ?? "Lưu thông tin thành công"
      );
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
