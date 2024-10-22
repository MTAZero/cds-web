import {Button, Form, Row, Space, Spin} from "antd";
import {useAppSelector} from "hooks";
import React, {forwardRef, useEffect, useState} from "react";
import {
  APIServices,
  NotificationService,
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
} from "utils";
import {fields} from "./config";
import {InputFields} from "components";
import {formatTime} from "types";

const Modal = forwardRef((props: any, ref) => {
  const {id, closeModal, recallTable} = props;
  const isModalOpen = useAppSelector(state => state.global.isOpenModal);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const {listVehicle, listUnit, listTask} = useAppSelector(
    state => state.catalog
  );
  fields.find(e => e?.name == "vehicle").options = listVehicle?.map(e => ({
    label: `${e?.name}-${e?.typeVehicle} (${e?.license})`,
    value: e?._id,
  }));
  fields.find(e => e?.name == "unitWorkGo").options = listUnit?.map(e => ({
    label: e?.name,
    value: e?.name,
  }));
  fields.find(e => e?.name == "unitWorkBack").options = listUnit?.map(e => ({
    label: e?.name,
    value: e?.name,
  }));
  fields.find(e => e?.name == "mission").options = listTask?.map(e => ({
    label: e?.taskName,
    value: e?.taskName,
  }));

  useEffect(() => {
    if (!isValuable(id)) {
      setData(null);
      form.resetFields();
      form.setFieldValue("state", 0);
    } else {
    }
  }, [id, isModalOpen]);

  useEffect(() => {
    const getData = async id => {
      try {
        const res = await APIServices.LenhXe.getDetailLenhXe(id);
        setData(res);
      } catch (error) {}
    };
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  const setFieldsValue = data => {
    const formatData = {
      ...data,
      vehicle: data?.vehicle?._id,
      commandDateCreated: convertDateStringToDateObject(
        data?.commandDateCreated
      ),

      baseFromDate: convertDateStringToDateObject(data?.baseFromDate),
      baseToDate: convertDateStringToDateObject(data?.baseToDate),
      performDateTime: convertDateStringToDateObject(
        data?.performDateTime,
        true
      ),
    };
    form.setFieldsValue(formatData);
  };
  useEffect(() => {
    if (data) {
      setFieldsValue(data);
    } else {
      form.resetFields();
      form.setFieldValue("state", 0);
    }
  }, [data]);

  const submit = async () => {
    try {
      const formValues = await getFormValues();

      if (!formValues) {
        return;
      }
      let body = {...data, ...formValues, id: id ? id : null};
      setIsLoading(true);
      const callApi = id
        ? APIServices.LenhXe.updateLenhXe
        : APIServices.LenhXe.createLenhXe;
      await callApi(body);
      setIsLoading(false);
      NotificationService.success("Lưu thông tin thành công");
      if (recallTable) {
        recallTable();
      }

      closeModal();
    } catch (error) {
      setIsLoading(false);
      setFieldsValue(data);
      NotificationService.error(error?.response?.data ?? "Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return {
        ...formValues,
        commandDateCreated: formatDateToString(
          formValues?.commandDateCreated,
          formatTime.dayFullRevert2
        ),
        baseFromDate: formatDateToString(
          formValues?.baseFromDate,
          formatTime.dayFullRevert2
        ),
        baseToDate: formatDateToString(
          formValues?.baseToDate,
          formatTime.dayFullRevert2
        ),
        performDateTime: formatDateToString(
          formValues?.performDateTime,
          formatTime.unix
        ),
      };
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
