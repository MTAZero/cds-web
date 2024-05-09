import {Button, Form, Row, Space, Spin} from "antd";
import {InputFields, ListActionButton} from "components";
import React, {useEffect, useState} from "react";
import {fields} from "./config";
import {APIServices, NotificationService, isValuable, toArray} from "utils";
const Modal = props => {
  const {id, getList, closeModal, listRole} = props;
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  fields.find(e => e?.name == "role").options = toArray(listRole)?.map(e => ({
    label: e?.name,
    value: e?._id,
  }));
  useEffect(() => {
    console.log(listRole);
  }, [listRole]);
  useEffect(() => {
    const getDetailPermission = async id => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getDetailPermission(id);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isValuable(id)) {
      getDetailPermission(id);
    } else {
      setData(null);
    }
  }, [id]);
  const submit = async () => {
    try {
      const values = await form.validateFields();
      const apiFunc = id
        ? APIServices.QuanTri.updatePermission
        : APIServices.QuanTri.createPermission;
      setIsLoading(true);
      const res = await apiFunc(values);
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
            {!id && <Button onClick={closeModal}>Hủy</Button>}
            {!id && (
              <Button onClick={submit} type="primary">
                Lưu
              </Button>
            )}
          </Space>
        </Row>
      </div>
    </Spin>
  );
};
export default Modal;
