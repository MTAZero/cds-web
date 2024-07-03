import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "hooks";

import {columns, columns as columnsInit, fields as fieldsInit} from "./config";
import {useNavigate} from "react-router-dom";
import {
  ExpandSearch,
  ListActionButton,
  TableCustom,
  TitleCustom,
} from "components";
import {Button, Col, Form, Row, Space} from "antd";
import ReactToPrint from "react-to-print";
import {
  APIServices,
  NotificationService,
  formatDateToString,
  randomId,
  toArray,
} from "utils";
import {formatTime} from "types";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
const QuanLyNhienLieu = props => {
  const [params, setParams] = useState<any>({});
  const [fields, setFields] = useState(fieldsInit);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const printRef = useRef<any>();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      year: formatDateToString(searchFields?.year, formatTime.year),
    });
    setPage(1);
  };

  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  const updateData = async () => {
    try {
      const formValues = await getFormValues();
      if (!formValues) {
        return;
      }
      const data = {listFuel: formValues};
      const res = await APIServices.QuanLyNhienLieu.updateListNhienLieu(data);
      setData(res?.items?.map(e => ({...e, key: randomId()})));
      NotificationService.success("Lưu thông tin nhiên liệu thành công");
    } catch (error) {
      NotificationService.error("Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldValue("listFuel");
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanLyNhienLieu.getListNhienLieu();
        setIsLoading(false);
        const data = toArray(res?.items)?.map(e => ({...e, key: randomId()}));
        setData(data);
        form.setFieldValue("listFuel", data);
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
            <TitleCustom text="Danh sách nhiên liệu"></TitleCustom>
            <Button type="primary" onClick={updateData}>
              Lưu
            </Button>
          </Row>
          <Form form={form}>
            <TableInputAdd
              data={data}
              setData={setData}
              name="listFuel"
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
export default QuanLyNhienLieu;
