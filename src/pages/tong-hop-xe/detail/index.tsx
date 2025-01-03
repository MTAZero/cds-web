import {Button, Col, Divider, Form, Row, Space, Spin, Upload} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fields1 as fieldInit} from "./config";
import dayjs from "dayjs";
import {useAppDispatch} from "hooks";
import {
  APIServices,
  NotificationService,
  convertDateStringToDateObject,
  formatDateToString,
} from "utils";
import {InputFields, TitleCustom} from "components";
import {formatTime} from "types";

const DetailTongHopXe = props => {
  const {id} = useParams();
  const [fields, setFields] = useState<any>(fieldInit);
  const [form] = Form.useForm();
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async id => {
      try {
        setLoading(true);
        const res = await APIServices.DangKiXe.getDetailDangKi(id);
        setLoading(false);
        setData(res);
      } catch (error) {
        setLoading(false);
      }
    };
    if (id != "tao-moi") {
      getData(id);
    }
  }, [id]);
  useEffect(() => {
    const setOptionsDonVi = async listUnit => {
      fields.find((e: {name: string}) => e?.name === "unit").options =
        listUnit?.map((e: {_id: any; name: any}) => ({
          value: e?._id,
          label: e?.name,
        }));

      setFields([...fields]);
    };
    setOptionsDonVi(listUnit);
  }, [listUnit]);
  useEffect(() => {
    const getListUnit = async () => {
      try {
        const res = await APIServices.QuanTri.getListUnit({
          pageIndex: 1,
          pageSize: 100,
        });
        setListUnit(res?.items);
      } catch (error) {
        setListUnit([]);
      }
    };
    getListUnit();
  }, []);

  const submit = async () => {
    try {
      const formValues = await form.validateFields();
      let data = {
        ...formValues,
        fromDateTime: formatDateToString(
          formValues?.fromDateTime,
          formatTime.unix
        ),
        toDateTime: formatDateToString(formValues?.toDateTime, formatTime.unix),
      };
      setLoading(true);
      const callApi =
        id == "tao-moi"
          ? APIServices.DangKiXe.createDangKi
          : APIServices.DangKiXe.updateDangKi;
      const res = await callApi(data, id);
      setData(res);
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
        fromDateTime: convertDateStringToDateObject(data?.fromDateTime, true),
        toDateTime: convertDateStringToDateObject(data?.toDateTime, true),
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
              <TitleCustom text="Đăng kí xe"></TitleCustom>
              <Row gutter={[4, 4]}>
                <InputFields data={fields}></InputFields>
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
export default DetailTongHopXe;
