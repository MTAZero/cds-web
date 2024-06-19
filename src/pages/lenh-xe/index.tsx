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
import {
  APIServices,
  NotificationService,
  formatDateToString,
  getItemLocalStorage,
  setItemLocalStorage,
} from "utils";
import {formatTime} from "types";
import ModalLenhXe from "./print";
import Modal from "./modal";
import "./style.scss";
import {useAppDispatch} from "hooks";
import {
  getListUnitAPI,
  getListVehicleAPI,
} from "../../redux/catalog/catalog.slice";
const LenhXe = props => {
  const [params, setParams] = useState<any>({});
  const nameObjectLocal = "LenhXeSearch";
  const [fields, setFields] = useState(fieldsInit);
  const modalLenhXeRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any[]>([{}]);
  const [total, setTotal] = useState();
  const [id, setId] = useState<any>();
  const dispatch = useAppDispatch();
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          console.log(record);
          setId(record?._id);
          modalRef?.current?.openModal();
        }}
        viewFunction={() => {
          setId(record?._id);
          modalLenhXeRef?.current?.openModal();
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

  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  const onChangePagination = (page, limit) => {
    setParams({...params, page: page, limit: limit});
  };
  const handleDelete = async id => {
    try {
      await APIServices.LenhXe.deleteLenhXe(id);
      NotificationService.success("Đã xóa lệnh điều phương tiện");
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
        const res = await APIServices.LenhXe.getListLenhXe(params);
        setIsLoading(false);
        setData(res);
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
            onFieldsChange={onFieldsChange}
          ></ExpandSearch>
        </div>
        <div className="container">
          <Row justify={"space-between"} style={{marginBottom: 4}}>
            <TitleCustom text="Lệnh điều phương tiện"></TitleCustom>
            <Space>
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
        title="Lệnh điều phương tiện"
        ref={modalLenhXeRef}
        width={"220mm"}
      >
        <ModalLenhXe id={id}></ModalLenhXe>
      </ModalCustom>
      <ModalCustom
        width={1500}
        ref={modalRef}
        title={`${id ? "Sửa thông tin" : "Thêm"} lệnh điều phương tiện`}
      >
        <Modal id={id} recallTable={recallTable}></Modal>
      </ModalCustom>
    </div>
  );
};
export default LenhXe;
