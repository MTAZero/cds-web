import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "hooks";

import {columns, fields} from "./config";
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
  randomId,
  toArray,
} from "utils";
import {formatTime} from "types";

import Print from "./print/Print";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
import {
  getListPersonAPI,
  getListUnitAPI,
} from "../../redux/catalog/catalog.slice";
const SoTheoDoiCongTac = props => {
  const [params, setParams] = useState<any>({});
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const printRef = useRef<any>();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const {listUnit, listPerson} = useAppSelector(state => state.catalog);
  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
    });
    setPage(1);
  };
  fields.find(e => e.name == "unitId").options = toArray(listUnit).map(e => ({
    key: randomId(),
    value: e._id,
    label: e.name,
  }));
  columns.find(e => e.dataIndex == "personId").options = toArray(
    listPerson
  ).map(e => ({
    key: randomId(),
    value: e._id,
    label: e.full_name,
  }));
  columns.find(e => e.dataIndex == "unitId").options = toArray(listUnit).map(
    e => ({
      key: randomId(),
      value: e._id,
      label: e.name,
    })
  );
  useEffect(() => {
    dispatch(getListUnitAPI());
    dispatch(getListPersonAPI());
  }, []);
  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  const updateData = async () => {
    try {
      const formValues = await getFormValues();
      console.log(formValues);
      if (!formValues) {
        return;
      }
      const data = {listTrackWork: formValues};
      const res = await APIServices.SoTheoDoiCongTac.updateSoTheoDoiCongTac(
        data
      );
      setData(res?.items?.map(e => ({...e, key: randomId()})));
      NotificationService.success("Lưu thông tin thành công");
    } catch (error) {
      NotificationService.error("Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      await form.validateFields();
      let formValues = form.getFieldValue("listTrackWork");
      formValues = formValues?.map(e => ({
        ...e,
        fromDate: formatDateToString(e?.fromDate, formatTime.unix),
        toDate: formatDateToString(e?.toDate, formatTime.unix),
      }));
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.SoTheoDoiCongTac.getSoTheoDoiCongTac(
          params
        );
        setIsLoading(false);
        const data = toArray(res)?.map(e => ({
          ...e,
          key: randomId(),
          fromDate: convertDateStringToDateObject(e?.fromDate, true),
          toDate: convertDateStringToDateObject(e?.toDate, true),
        }));
        setData(data);
        form.setFieldValue("listTrackWork", data);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData(params);
  }, [params]);

  return (
    <div className="page ">
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
            <TitleCustom text="Sổ theo dõi đi công tác"></TitleCustom>
            <Space>
              <ReactToPrint
                documentTitle={` `}
                trigger={() => {
                  return (
                    <Button style={{marginBottom: 4}} type="primary">
                      Xuất file
                    </Button>
                  );
                }}
                content={() => printRef.current}
                bodyClass="print-track-work"
              />

              <Button type="primary" onClick={updateData}>
                Lưu
              </Button>
            </Space>
          </Row>
          <Form form={form}>
            <TableInputAdd
              className={[""]}
              isLoading={isLoading}
              data={data}
              setData={setData}
              name="listTrackWork"
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
export default SoTheoDoiCongTac;
