import {Button, Col, Form, Row, Space, Spin, Typography, Upload} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fields1 as fieldInit} from "./config";
import {
  APIServices,
  NotificationService,
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
} from "utils";
import {InputFields, TitleCustom} from "components";
import {formatTime, selectTroopData} from "types";
import dayjs from "dayjs";

const DetailSoGiaoBanTrungTam = () => {
  const {id, type} = useParams();
  const [fields, setFields] = useState<any>(fieldInit);
  const [form] = Form.useForm();
  const [listUnit, setListUnit] = useState<any[]>();
  const [listUser, setListUser] = useState<any[]>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async id => {
      try {
        setLoading(true);
        const res = await APIServices.SoGiaoBan.getDetailSoGiaoBan(id);

        setData(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (id != "tao-moi") {
      getData(id);
    }
  }, [id, type]);

  useEffect(() => {
    const getListUser = async params => {
      try {
        const res = await APIServices.QuanTri.getListUser(params);
        setListUser(res?.items);
      } catch (error) {}
    };
    getListUser({pageIndex: 1, pageSize: 200});
  }, []);
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
    const setOptionsUser = async listUser => {
      fields.find(e => e?.name === "dutyLeader").options = listUser?.map(e => ({
        value: e?._id,
        label: e?.full_name,
      }));
      fields.find(e => e?.name === "dutySecondPerson").options = listUser?.map(
        e => ({
          value: e?._id,
          label: e?.full_name,
        })
      );
      setFields([...fields]);
    };
    setOptionsUser(listUser);
  }, [listUser]);

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
        date: formatDateToString(formValues?.date, formatTime.unix),
        type: type,
      };
      if (id != "tao-moi") {
        data = {...data, _id: id};
      }
      setLoading(true);
      const callApi =
        id == "tao-moi"
          ? APIServices.SoGiaoBan.createSoGiaoBan
          : APIServices.SoGiaoBan.updateSoGiaoBan;
      const res = await callApi(data);
      setData(res);
      NotificationService.success(`Đã lưu thành công`);
    } catch (error) {
      NotificationService.error("Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const setFieldsValues = data => {
      const formatData = {
        ...data,
        date: convertDateStringToDateObject(data?.date, true),
      };
      form.setFieldsValue(formatData);
    };
    if (isValuable(data)) {
      setFieldsValues(data);
    } else {
      form.setFieldValue("date", dayjs());
    }
  }, [data]);
  return (
    <div className="page">
      <div className="main">
        <div className="">
          <Spin spinning={loading}>
            <Form form={form}>
              <div className="container">
                <TitleCustom text="Sổ giao ban ngày"></TitleCustom>
                {data && (
                  <div style={{marginBottom: 12}}>
                    <Space
                      direction="vertical"
                      size={"middle"}
                      style={{width: "100%"}}
                    >
                      <Typography.Text strong>* Quân số:</Typography.Text>
                      <Row gutter={[4, 4]}>
                        <Col>
                          - Có mặt: {data?.totalAttendance}/{data?.total}{" "}
                        </Col>
                        <Col>
                          ({" "}
                          {data?.troopEachTypes?.map(e => (
                            <span>
                              {e?.type}: {e?.totalAttendance}/{e?.total}; &nbsp;
                            </span>
                          ))}
                          )
                        </Col>
                      </Row>
                      <Row gutter={[4, 4]}>
                        <Col>
                          - Vắng mặt: {data?.totalLeft}/{data?.total}{" "}
                        </Col>
                        {data?.leftReasons?.length > 0 && (
                          <Col>
                            (
                            {data?.leftReasons?.map(e => (
                              <span>
                                {
                                  selectTroopData?.find(
                                    item => item.value == e?.status
                                  )?.text
                                }
                                : {e?.number}; &nbsp;
                              </span>
                            ))}
                            )
                          </Col>
                        )}
                      </Row>
                    </Space>
                  </div>
                )}
              </div>
              <div className="container">
                <Typography.Text strong>* Nội dung:</Typography.Text>
                <Row gutter={[8, 8]} style={{marginTop: 12}}>
                  <InputFields data={fields}></InputFields>
                </Row>
              </div>
            </Form>
            <div className="container">
              <Row justify={"end"} style={{marginTop: 8}}>
                <Button type="primary" onClick={submit} loading={loading}>
                  Lưu lại
                </Button>
              </Row>
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default DetailSoGiaoBanTrungTam;
