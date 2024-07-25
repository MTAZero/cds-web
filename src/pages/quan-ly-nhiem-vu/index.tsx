import React, {useEffect, useRef, useState} from "react";

import {columns, columns as columnsInit, fields as fieldsInit} from "./config";
import {TitleCustom} from "components";
import {Button, Col, Form, Row, Space} from "antd";
import {APIServices, NotificationService, randomId, toArray} from "utils";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
const QuanLyNhiemVu = () => {
  const [params, setParams] = useState<any>({});
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const updateData = async () => {
    try {
      const formValues = await getFormValues();
      if (!formValues) {
        return;
      }
      const data = {listTask: formValues};
      const res = await APIServices.QuanLyNhiemVu.updateListNhiemVu(data);
      setData(res?.items?.map(e => ({...e, key: randomId()})));

      NotificationService.success("Lưu thông tin nhiệm vụ thành công");
    } catch (error) {
      NotificationService.error("Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldValue("listTask");
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanLyNhiemVu.getListNhiemVu();
        setIsLoading(false);
        const data = toArray(res?.items)?.map(e => ({...e, key: randomId()}));
        setData(data);

        form.setFieldValue("listTask", data);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData(params);
  }, [params]);

  return (
    <div className="page quan-ly-xe">
      <div className="main">
        <div className="container">
          <Row justify={"space-between"} style={{marginBottom: 4}}>
            <TitleCustom text="Danh sách nhiệm vụ"></TitleCustom>
            <Button type="primary" onClick={updateData}>
              Lưu
            </Button>
          </Row>
          <Form form={form}>
            <TableInputAdd
              data={data}
              setData={setData}
              name="listTask"
              form={form}
              columns={columns}
              pagination={false}
            ></TableInputAdd>
          </Form>
        </div>
      </div>
      {/* style={{display: "none"}} */}
    </div>
  );
};
export default QuanLyNhiemVu;
