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
  formatDateToString,
  getItemLocalStorage,
  setItemLocalStorage,
} from "utils";
import {formatTime} from "types";
import {RouterLink} from "routers/routers";
import dayjs from "dayjs";
import Print from "./print/Print";
const TongHopXe = props => {
  const [params, setParams] = useState<any>({});
  const nameObjectLocal = "TongHopXeSearch";
  const TongHopXeSearch = getItemLocalStorage(nameObjectLocal);
  const [fields, setFields] = useState(fieldsInit);

  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const printRef = useRef<any>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any[]>();
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
  columns.find(e => e?.dataIndex == "unit").render = (value, record, index) => {
    return <>{listUnit?.find(e => e?._id == value)?.name}</>;
  };
  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      fromDateTime: formatDateToString(
        searchFields?.fromDateTime,
        formatTime.unix
      ),
      toDateTime: formatDateToString(searchFields?.toDateTime, formatTime.unix),
    });
    setPage(1);
  };
  const onFieldsChange = (changedFields, allFields) => {
    const searchFields = expandRef.current?.getFieldsValue();
    const valuesLocal = {
      ...searchFields,
    };
    setItemLocalStorage(nameObjectLocal, valuesLocal);
  };
  const navigateToDetail = (record: {_id: any}, rowIndex: any) => {
    const routeRollcall = RouterLink.QUAN_LY_KE_HOACH_XE_DETAIL_ROUTE.replace(
      ":id",
      record?._id
    );
    navigate(routeRollcall);
  };
  const navigateToNew = () => {
    const routeDetail = RouterLink.QUAN_LY_KE_HOACH_XE_DETAIL_ROUTE.replace(
      ":id",
      "tao-moi"
    );
    navigate(routeDetail);
  };
  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  useEffect(() => {
    const setDefaultValues = () => {
      expandRef.current?.setFieldValue("unit", TongHopXeSearch?.unit);
    };
    setDefaultValues();
    onClickSearch();
  }, []);
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.DangKiXe.getListDangKi(params);
        setIsLoading(false);
        setData(res);
        setTotal(res?.length);
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
            onFieldsChange={onFieldsChange}
          ></ExpandSearch>
        </div>
        <div className="container">
          <Row justify={"space-between"} style={{marginBottom: 4}}>
            <TitleCustom text="Đăng kí xe"></TitleCustom>
            <Space>
              <ReactToPrint
                documentTitle={`Đăng kí xe tháng ${
                  params?.month ?? "..."
                } năm ${
                  formatDateToString(params?.year, formatTime.year) ?? "..."
                }  `}
                trigger={() => {
                  return (
                    <Button style={{marginBottom: 4}} type="primary">
                      Xuất file
                    </Button>
                  );
                }}
                content={() => printRef.current}
                bodyClass="print-rut-kinh-nghiem"
              />
              <Button type="primary" onClick={navigateToNew}>
                Thêm mới
              </Button>
            </Space>
          </Row>
          <TableCustom
            ref={tableRef}
            pagination={false}
            isLoading={isLoading}
            dataSource={data}
            total={total}
            columns={columns}
            hideCheckboxCol={true}
            listActionButton={listActionButton}
            onDoubleClick={navigateToDetail}
          ></TableCustom>
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
export default TongHopXe;
