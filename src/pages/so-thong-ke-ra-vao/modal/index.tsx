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
import {fields} from "./config";
import {InputFields, TitleCustom} from "components";
import "./style.scss";
import {formatTime} from "types";
import dayjs from "dayjs";
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
  fields.find(e => e.name == "unitId").options = toArray(listUnit).map(e => ({
    key: randomId(),
    value: e._id,
    label: e.name,
  }));
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
      form.setFieldValue("date", dayjs());
    }
  }, [data, isModalOpen]);
  useEffect(() => {}, [isModalOpen]);

  useEffect(() => {
    const getData = async id => {
      try {
        const res = await APIServices.SoThongKeRaVao.getDetailSoThongKeRaVao(
          id
        );

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
      date: convertDateStringToDateObject(data?.date, true),
      issued: convertDateStringToDateObject(data?.issued, true),
      fromDateTime: convertDateStringToDateObject(data?.fromDateTime, true),
      toDateTime: convertDateStringToDateObject(data?.toDateTime, true),
      guestName: toArray(data?.guestName)?.join(","),
    };
    form.setFieldsValue(formatData);
  };

  const submit = async () => {
    try {
      const formValues = await getFormValues();
      console.log(formValues);
      if (!formValues) {
        return;
      }
      let body = {...data, ...formValues, id: id ? id : null};
      setIsLoading(true);
      const callApi = id
        ? APIServices.SoThongKeRaVao.updateSoThongKeRaVao
        : APIServices.SoThongKeRaVao.createSoThongKeRaVao;
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
        date: formatDateToString(formValues?.date, formatTime.unix),
        issued: formatDateToString(formValues?.issued, formatTime.unix),
        fromDateTime: formatDateToString(
          formValues?.fromDateTime,
          formatTime.unix
        ),
        toDateTime: formatDateToString(formValues?.toDateTime, formatTime.unix),
        guestName: formValues?.guestName?.split(","),
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
            <Row gutter={[8, 8]}>
              <InputFields data={fields}></InputFields>
            </Row>
          </div>
        </Form>
      </Spin>
    </div>
  );
});
export default ModalEdit;
