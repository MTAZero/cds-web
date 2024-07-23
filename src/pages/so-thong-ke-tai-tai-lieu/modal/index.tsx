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
    }
  }, [data, isModalOpen]);
  useEffect(() => {}, [isModalOpen]);

  useEffect(() => {
    const getData = async id => {
      try {
        const res =
          await APIServices.SoThongKeTaiLieu.getDetailSoThongKeTaiLieu(id);

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
      receivedDate: convertDateStringToDateObject(data?.receivedDate, true),
      paidDate: convertDateStringToDateObject(data?.paidDate, true),
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
        ? APIServices.SoThongKeTaiLieu.updateSoThongKeTaiLieu
        : APIServices.SoThongKeTaiLieu.createSoThongKeTaiLieu;
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
        receivedDate: formatDateToString(
          formValues?.receivedDate,
          formatTime.unix
        ),
        paidDate: formatDateToString(formValues?.paidDate, formatTime.unix),
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
