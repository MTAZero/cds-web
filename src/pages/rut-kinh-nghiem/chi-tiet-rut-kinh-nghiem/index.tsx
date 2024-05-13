import {Button, Col, Divider, Form, Row, Space, Spin, Upload} from "antd";
import {InputFields, TitleCustom} from "components";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fields1} from "./config";
import dayjs from "dayjs";
import {useAppDispatch} from "hooks";
import {
  APIServices,
  NotificationService,
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
} from "utils";
import {formatTime} from "types";

const DetailRutKinhNghiem = props => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any>();
  const [spinning, setSpinning] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async id => {
      try {
        setLoading(true);
        const res = await APIServices.SoRutKinhNghiem.getDetailSoRutKinhNghiem(
          id
        );
        setLoading(false);
        setData(res);
      } catch (error) {
        setLoading(false);
      }
    };
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  const submit = async () => {
    const formValues = form.getFieldsValue();
    const data = {
      ...formValues,
      _id: id,
      date: formatDateToString(formValues?.date, formatTime.dayFullRevert),
    };
    try {
      setLoading(true);
      const callApi = isValuable(id)
        ? APIServices.SoRutKinhNghiem.updateSoRutKinhNghiem
        : APIServices.SoRutKinhNghiem.createSoRutKinhNghiem;
      const res = await callApi(data);
      setLoading(false);
      NotificationService.success(`Đã lưu thành công`);
    } catch (error) {
      setLoading(false);
      NotificationService.error("Đã xảy ra lỗi");
    }
  };
  useEffect(() => {
    const setFieldsValues = data => {
      const formatData = {
        ...data,
        date: convertDateStringToDateObject(data?.date),
      };
      form.setFieldsValue(formatData);
    };
    setFieldsValues(data);
  }, [data]);
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Spin spinning={loading}>
            <Form form={form}>
              <Divider></Divider>
              <TitleCustom text="Rút kinh nghiệm công tác huấn luyện"></TitleCustom>
              <Row gutter={[4, 4]}>
                <InputFields data={fields1}></InputFields>
              </Row>
            </Form>
            <Row justify={"end"} style={{marginTop: 8}}>
              <Button type="primary" onClick={submit} loading={loading}>
                Lưu lại
              </Button>
            </Row>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default DetailRutKinhNghiem;
