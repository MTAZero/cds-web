import {Button, Form, Row, Space, Spin} from "antd";
import {InputFields, ListActionButton} from "components";
import {APIServices, NotificationService, isValuable} from "utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {fields} from "./config";
const Modal = forwardRef((props: any, ref) => {
  const {id, getList, listUnit, listRole, listPosition, closeModal} = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({
    resetFields: () => {
      form.resetFields();
      form.setFieldValue("isPersonal", true);
    },
  }));
  useEffect(() => {
    const getDetailUser = async id => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getDetailUser(id);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isValuable(id)) {
      getDetailUser(id);
    } else {
      setData(null);
    }
  }, [id]);
  fields.find(e => e?.name === "unit").options = listUnit?.map(e => ({
    value: e?._id,
    label: e?.name,
  }));
  fields.find(e => e?.name === "role").options = listRole?.map(e => ({
    value: e?._id,
    label: e?.name,
  }));
  fields.find(e => e?.name === "position").options = listPosition?.map(e => ({
    value: e?._id,
    label: e?.name,
  }));

  fields.find(e => e?.name == "password").show = !isValuable(id);

  const submit = async () => {
    try {
      const values = await form.validateFields();
      const apiFunc = id
        ? APIServices.QuanTri.updateUser
        : APIServices.QuanTri.createUser;
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
      form.setFieldValue("isPersonal", true);
    }
  }, [data]);
  return (
    <Spin spinning={isLoading}>
      <div>
        <Form form={form} autoComplete="off">
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
});

export default Modal;
