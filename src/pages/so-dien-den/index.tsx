import React, {useEffect, useRef, useState} from "react";

import {columns, columns as columnsInit, fields as fieldsInit} from "./config";
import {
  ExpandSearch,
  ListActionButton,
  ModalCustom,
  TableCustom,
  TitleCustom,
} from "components";
import {Button, Row, Space} from "antd";
import {
  APIServices,
  NotificationService,
  formatDateToString,
  randomId,
  toArray,
} from "utils";
import "./style.scss";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  getListPersonAPI,
  getListUnitAPI,
} from "../../redux/catalog/catalog.slice";
import Print from "./print";
import ModalEdit from "./modal";
import ReactToPrint from "react-to-print";
import {formatTime} from "types";
const SoDienDen = () => {
  const [params, setParams] = useState<any>({pageSize: 10, pageIndex: 1});
  const [fields, setFields] = useState(fieldsInit);
  const printRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([{}]);
  const [total, setTotal] = useState();
  const [id, setId] = useState<any>();
  const dispatch = useAppDispatch();
  const modalPrintChildRef = useRef<any>();

  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          setId(record?._id);
          modalRef?.current?.openModal();
        }}
        deleteFunction={() => {
          handleDelete(record?._id);
        }}
      ></ListActionButton>
    );
  };
  useEffect(() => {
    dispatch(getListUnitAPI());
    dispatch(getListPersonAPI());
  }, []);

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

  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };

  const handleDelete = async id => {
    try {
      await APIServices.SoDienDen.deleteSoDienDen(id);
      NotificationService.success("Đã xóa");
      recallTable();
    } catch (error) {
      NotificationService.error(error?.response?.data ?? "Đã xảy ra lỗi");
    }
  };
  const recallTable = () => {
    setParams({...params, pageSize: params?.limit, pageIndex: 1});
    setPage(1);
  };

  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.SoDienDen.getListSoDienDen(params);
        setIsLoading(false);
        console.log(res);
        setData(res);
        setTotal(res?.total);
      } catch (error) {
        setIsLoading(false);
        setData([]);
      }
    };
    console.log(params);
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
            <TitleCustom text="Sổ điện đến"></TitleCustom>
            <Space>
              {/* <ReactToPrint
                documentTitle={` `}
                trigger={() => {
                  return (
                    <Button style={{marginBottom: 4}} type="primary">
                      Xuất file
                    </Button>
                  );
                }}
                content={() => printRef.current}
                bodyClass="so-dien"
              /> */}
              <Button
                type="primary"
                onClick={() => {
                  setId(null);
                  modalRef?.current?.openModal();
                }}
              >
                Thêm mới
              </Button>
            </Space>
          </Row>
          <TableCustom
            ref={tableRef}
            pagination={false}
            // isLoading={isLoading}
            dataSource={data}
            total={total}
            columns={columns}
            hideCheckboxCol={true}
            listActionButton={listActionButton}
            onDoubleClick={(record, index) => {
              setId(record?._id);
              modalRef?.current?.openModal();
            }}
            scroll={{x: 1500}}
          ></TableCustom>
        </div>
      </div>

      {/* <div id="print" ref={printRef}>
        <Print id={id}></Print>
      </div> */}

      <ModalCustom
        width={1500}
        ref={modalRef}
        title={`${id ? "Sửa" : "Thêm"} sổ điện đến
        `}
        onOk={() => {
          modalPrintChildRef?.current?.submit();
        }}
      >
        <ModalEdit
          ref={modalPrintChildRef}
          id={id}
          recallTable={recallTable}
        ></ModalEdit>
      </ModalCustom>
    </div>
  );
};
export default SoDienDen;
