import React, {useEffect, useRef, useState} from "react";

import {columns, columns as columnsInit} from "./config";
import {TitleCustom} from "components";
import {Button, Col, Form, Row, Space} from "antd";
import {APIServices, NotificationService, randomId, toArray} from "utils";
import {formatTime} from "types";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
const QuanLyDauMoi = () => {
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
      const data = {listWorkAddress: formValues};
      const res = await APIServices.QuanLyDauMoi.updateListDauMoi(data);
      setData(res?.items?.map(e => ({...e, key: randomId()})));
      NotificationService.success("Lưu thông tin đầu mối thành công");
    } catch (error) {
      NotificationService.error("Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldValue("listWorkAddress");
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanLyDauMoi.getListDauMoi();
        setIsLoading(false);
        const data = toArray(res?.items)?.map(e => ({...e, key: randomId()}));
        setData(data);
        form.setFieldValue("listWorkAddress", data);
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
            <TitleCustom text="Danh sách đầu mối"></TitleCustom>
            <Button type="primary" onClick={updateData}>
              Lưu
            </Button>
          </Row>
          <Form form={form}>
            <TableInputAdd
              data={data}
              setData={setData}
              name="listWorkAddress"
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
export default QuanLyDauMoi;
