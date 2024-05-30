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
  convertDateStringToDateObject,
  formatDateToString,
  getItemLocalStorage,
  setItemLocalStorage,
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
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState();
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          navigateToDetail(record, index);
        }}
        toolTips={{edit: "Chỉnh sửa"}}
      ></ListActionButton>
    );
  };

  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      year: formatDateToString(searchFields?.year, formatTime.year),
    });
    setPage(1);
  };

  const navigateToDetail = (record: {_id: any}, rowIndex: any) => {
    const routeRollcall = RouterLink.RUT_KINH_NGHIEM_DETAIL_ROUTE.replace(
      ":id",
      record?._id
    );
    navigate(routeRollcall);
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
      // const res = await APIServices.QuanLyXe.updateListXe(formValues);
      NotificationService.success("Lưu thông tin xe thành công");
    } catch (error) {
      NotificationService.error("Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      console.log(formValues);
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
        setData(res?.items);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData(params);
  }, [params]);
  return (
    <div className="page">
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
          <TableInputAdd
            data={data}
            setData={setData}
            name="listVehicle"
            form={form}
            columns={columns}
            pagination={false}
          ></TableInputAdd>
        </div>
      </div>
      {/* style={{display: "none"}} */}
      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <Print dataSource={data} params={params} listUnit={listUnit}></Print>
        </div>
      </div>
    </div>
  );
};
export default QuanLyXe;
