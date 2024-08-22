import {Button, Col, Form, Row, Space, Spin, Typography} from "antd";
import {useAppSelector} from "hooks";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  APIServices,
  NotificationService,
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
  randomId,
  toArray,
} from "utils";
import {fields1, fields2, fields3} from "./config";
import {InputFields, TitleCustom} from "components";
import "./style.scss";
import {formatTime} from "types";
const ModalEdit = forwardRef((props: any, ref) => {
  const {id, closeModal, recallTable} = props;
  const isModalOpen = useAppSelector(state => state.global.isOpenModal);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const {listUnit, listPerson} = useAppSelector(state => state.catalog);

  useImperativeHandle(ref, () => ({
    submit: () => {
      submit();
    },
  }));
  fields1.find(e => e.name == "unitIdTransfer").options = toArray(listUnit).map(
    e => ({
      key: randomId(),
      value: e._id,
      label: e.name,
    })
  );
  fields2.find(e => e.name == "unitIdReceived").options = toArray(listUnit).map(
    e => ({
      key: randomId(),
      value: e._id,
      label: e.name,
    })
  );
  fields2.find(e => e.name == "personTransfer").options = toArray(
    listPerson
  ).map(e => ({
    key: randomId(),
    value: e.full_name,
    label: e.full_name,
  }));
  fields2.find(e => e.name == "idLeader").options = toArray(listPerson).map(
    e => ({
      key: randomId(),
      value: e._id,
      label: e.full_name,
    })
  );
  useEffect(() => {
    console.log(id);
    if (!isValuable(id)) {
      setData(null);
    } else {
    }
  }, [id, isModalOpen]);

  useEffect(() => {
    if (data) {
      setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data, isModalOpen]);
  useEffect(() => {
    if (isModalOpen) {
      if (isValuable(id)) {
        getData(id);
      }
    }
  }, [isModalOpen]);
  const getData = async id => {
    try {
      const res = await APIServices.SoDienDi.getDetailSoDienDi(id);
      console.log(res);
      setData(res);
    } catch (error) {
      setData(null);
    }
  };
  useEffect(() => {
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  const setFieldsValue = data => {
    const formatData = {
      ...data,
      dateTransfer: convertDateStringToDateObject(data?.dateTransfer, true),
    };
    form.setFieldsValue(formatData);
  };

  const submit = async () => {
    try {
      const formValues = await getFormValues();
      if (!formValues) {
        return;
      }
      let body = {...data, ...formValues, id: id ? id : null};
      setIsLoading(true);
      const callApi = id
        ? APIServices.SoDienDi.updateSoDienDi
        : APIServices.SoDienDi.createSoDienDi;
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
        dateTransfer: formatDateToString(
          formValues?.dateTransfer,
          formatTime.unix
        ),
      };
    } catch (error) {
      return null;
    }
  };
  return (
    <div className="modal-phieu-xuat-xang">
      <Spin spinning={isLoading}>
        <Form form={form}>
          <div className="container">
            <TitleCustom text="Thông tin người truyền điện"></TitleCustom>
            <Row gutter={[8, 8]}>
              <InputFields data={fields1}></InputFields>
            </Row>
          </div>
          <div className="container">
            <TitleCustom text="Thông tin người nhận điện"></TitleCustom>
            <Row gutter={[8, 8]}>
              <InputFields data={fields2}></InputFields>
            </Row>
          </div>
          <div className="container">
            <TitleCustom text="Nội dung điện"></TitleCustom>
            <Row gutter={[8, 8]}>
              <InputFields data={fields3}></InputFields>
            </Row>
          </div>
        </Form>
      </Spin>
    </div>
  );
});
export default ModalEdit;
