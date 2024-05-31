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
} from "utils";
import {formatTime} from "types";
import {RouterLink} from "routers/routers";
import dayjs from "dayjs";
import Print from "./print/Print";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
const QuanLyXe = props => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useState<any>({});
  const [fields, setFields] = useState(fieldsInit);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const printRef = useRef<any>();
  const navigate = useNavigate();
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
      const data = {listVehicle: formValues};
      const res = await APIServices.QuanLyXe.updateListXe(data);
      setData(res?.items?.map(e => ({...e, key: randomId()})));
      NotificationService.success("Lưu thông tin xe thành công");
    } catch (error) {
      NotificationService.error("Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      await form.validateFields();
      const formValues = form.getFieldValue("listVehicle");
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanLyXe.getListXe();
        setIsLoading(false);
        setData(res?.items?.map(e => ({...e, key: randomId()})));
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData(params);
  }, [params]);
  useEffect(() => {
    form.setFieldValue("listVehicle", data);
  }, [data]);
  return (
    <div className="page quan-ly-xe">
      <div className="main">
        <div className="container">
          <ExpandSearch
            ref={expandRef}
            fields={fields}
            isSearchExpend={false}
            onClickSearch={onClickSearch}
          ></ExpandSearch>
        </div>
        <div className="container">
          <Row justify={"space-between"} style={{marginBottom: 4}}>
            <TitleCustom text="Danh sách xe"></TitleCustom>
            <Button type="primary" onClick={updateData}>
              Lưu
            </Button>
          </Row>
          <Form form={form}>
            <TableInputAdd
              data={data}
              setData={setData}
              name="listVehicle"
              form={form}
              columns={columns}
              pagination={false}
            ></TableInputAdd>
          </Form>
        </div>
      </div>
      {/* style={{display: "none"}} */}
      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <Print dataSource={data} params={params}></Print>
        </div>
      </div>
    </div>
  );
};
export default QuanLyXe;
