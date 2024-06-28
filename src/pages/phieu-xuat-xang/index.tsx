import React, {useEffect, useRef, useState} from "react";

import {columns, columns as columnsInit, fields as fieldsInit} from "./config";
import {
  ExpandSearch,
  ListActionButton,
  ModalCustom,
  TableCustom,
  TitleCustom,
} from "components";
import {Button, Col, Form, Row, Space, Table} from "antd";
import {APIServices, NotificationService, formatDateToString} from "utils";
import {formatTime} from "types";
import ModalPhieuXuatXang from "./modal";
import "./style.scss";
import {useAppDispatch} from "hooks";
import {
  getListUnitAPI,
  getListVehicleAPI,
} from "../../redux/catalog/catalog.slice";
import ModalPhieuXuat from "./print";
const PhieuXuat = () => {
  const [params, setParams] = useState<any>({pageSize: 10, pageIndex: 1});
  const [fields, setFields] = useState(fieldsInit);
  const modalPhieuXuatRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any[]>([{}]);
  const [total, setTotal] = useState();
  const [id, setId] = useState<any>();
  const dispatch = useAppDispatch();
  const modalPhieuXuatChildRef = useRef<any>();
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          setId(record?._id);
          modalRef?.current?.openModal();
        }}
        viewFunction={() => {
          setId(record?._id);
          modalPhieuXuatRef?.current?.openModal();
        }}
        deleteFunction={() => {
          handleDelete(record?._id);
        }}
        toolTips={{edit: "Chỉnh sửa", view: "Xem phiếu"}}
      ></ListActionButton>
    );
  };
  useEffect(() => {
    dispatch(getListVehicleAPI());
    dispatch(getListUnitAPI());
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
  const onChangePagination = (page, limit) => {
    setParams({...params, page: page, limit: limit});
  };
  const handleDelete = async id => {
    try {
      // await APIServices.PhieuXuat.deletePhieuXuat(id);
      // NotificationService.success("Đã xóa lệnh điều phương tiện");
      // recallTable();
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
        const res = await APIServices.PhieuXuatXang.getListPhieuXuatXang(
          params
        );
        setIsLoading(false);
        setData(res?.items);
        setTotal(res?.total);
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
            <TitleCustom text="Phiếu xuất xăng dầu"></TitleCustom>
            {/* <Space>
              <Button
                type="primary"
                onClick={() => {
                  setId(null);
                  modalRef?.current?.openModal();
                }}
              >
                Thêm mới
              </Button>
            </Space> */}
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
            onDoubleClick={(record, index) => {
              setId(record?._id);
              modalRef?.current?.openModal();
            }}
            scroll={{x: 1500}}
          ></TableCustom>
        </div>
      </div>

      <ModalCustom
        title="Phiếu xuất xăng dầu"
        ref={modalPhieuXuatRef}
        width={"310mm"}
      >
        <ModalPhieuXuat id={id}></ModalPhieuXuat>
      </ModalCustom>
      <ModalCustom
        width={1500}
        ref={modalRef}
        title={`${id ? "Sửa thông tin" : "Thêm"} phiếu xuất xăng dầu`}
        onOk={() => {
          modalPhieuXuatChildRef?.current?.submit();
        }}
      >
        <ModalPhieuXuatXang
          ref={modalPhieuXuatChildRef}
          id={id}
          recallTable={recallTable}
        ></ModalPhieuXuatXang>
      </ModalCustom>
    </div>
  );
};
export default PhieuXuat;
