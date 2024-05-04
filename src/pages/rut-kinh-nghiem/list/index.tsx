import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "hooks";

import {
  columns,
  columns as columnsInit,
  fields as fieldsInit,
  mockData,
} from "./config";
import {useNavigate} from "react-router-dom";
import {
  ExpandSearch,
  ListActionButton,
  ModalCustom,
  TableCustom,
  TitleCustom,
} from "components";
import {Button, Col, Form, Row, Space} from "antd";
import ReactToPrint from "react-to-print";
import {formatDateToString} from "utils";
import {formatTime} from "types";
import {RouterLink} from "routers/routers";
const RutKinhNghiem = props => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useState(null);
  const nameObjectLocal = "rutKinhNghiemSearch";
  const [dataSource, setDataSource] = useState<any>(mockData);
  const [fields, setFields] = useState(fieldsInit);
  const expandRef = useRef<any>();
  const printRef = useRef<any>();
  const navigate = useNavigate();
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          navigateToDetail(record, index);
        }}
        checkFunction={() => {
          // navigateToRollcall(record, index);
        }}
        toolTips={{edit: "Chỉnh sửa", check: "Đánh giá"}}
      ></ListActionButton>
    );
  };

  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      nam: formatDateToString(searchFields?.nam, formatTime.year),
    });
  };
  const onFieldsChange = (changedFields, allFields) => {
    const searchFields = expandRef.current?.getFieldsValue();
    const valuesLocal = JSON.stringify({
      ...searchFields,
      nam: formatDateToString(searchFields?.nam, null),
    });
    localStorage.setItem(nameObjectLocal, valuesLocal);
  };
  const navigateToDetail = (record: {_id: any}, rowIndex: any) => {
    const routeRollcall = RouterLink.RUT_KINH_NGHIEM_DETAIL_ROUTE.replace(
      ":id",
      record?._id
    );
    navigate(routeRollcall);
  };
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
            <TitleCustom text="Rút kinh nghiệm"></TitleCustom>
          </Row>
          <TableCustom
            dataSource={dataSource}
            pagination={false}
            columns={columns}
            hideCheckboxCol={true}
            listActionButton={listActionButton}
            onDoubleClick={navigateToDetail}
          ></TableCustom>
        </div>
      </div>
    </div>
  );
};
export default RutKinhNghiem;
