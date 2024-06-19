import {Button, Form, Row, Space, Spin} from "antd";
import {useAppSelector} from "hooks";
import React, {forwardRef, useEffect, useState} from "react";
import {NotificationService, isValuable} from "utils";
import {fields} from "./config";
import {InputFields} from "components";

const Modal = forwardRef((props: any, ref) => {
  const {record, closeModal, recallTable} = props;
  //   const isModalOpen = useAppSelector(state => state.common.isModalOpen);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  //   useEffect(() => {
  //     if (!isValuable(record)) {
  //       form.resetFields();
  //   form.setFieldValue('lenhDotXuat',false)
  //     } else {
  //       form.setFieldsValue(record);
  //     }
  //   }, [record, isModalOpen]);
  const submit = async () => {
    try {
      const formValues = await getFormValues();

      if (!formValues) {
        return;
      }
      let data = {...formValues, id: record ? record?.id : null};
      setIsLoading(true);
      //   const callApi = record
      //     ? shoppingService.updateNguonThanhToan
      //     : shoppingService.createNguonThanhToan;
      //   await callApi(data);
      setIsLoading(false);
      NotificationService.success("Lưu thông tin thành công");
      if (recallTable) {
        recallTable();
      }

      closeModal();
    } catch (error) {
      setIsLoading(false);
      NotificationService.error(error?.response?.data ?? "Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      return null;
    }
  };
  return (
    <Spin spinning={isLoading}>
      <Form form={form}>
        <Row gutter={[8, 8]}>
          <InputFields data={fields}></InputFields>
        </Row>
      </Form>
      <Row justify={"end"} style={{marginTop: 8}}>
        <Space>
          <Button onClick={closeModal}>Hủy</Button>
          <Button type="primary" onClick={submit}>
            Lưu
          </Button>
        </Space>
      </Row>
    </Spin>
  );
});
export default Modal;
