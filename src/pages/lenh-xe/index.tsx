import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "hooks";

import {columns, columns as columnsInit, fields as fieldsInit} from "./config";
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
import {
  APIServices,
  formatDateToString,
  getItemLocalStorage,
  setItemLocalStorage,
} from "utils";
import {formatTime} from "types";
import ModalLenhXe from "./print";
import Modal from "./modal";
const LenhXe = props => {
  const [params, setParams] = useState<any>({});
  const nameObjectLocal = "LenhXeSearch";
  const LenhXeSearch = getItemLocalStorage(nameObjectLocal);
  const [fields, setFields] = useState(fieldsInit);
  const modalLenhXeRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any[]>([{}]);
  const [total, setTotal] = useState();
  const [record, setRecord] = useState<any>();
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          setRecord(record);
          modalRef?.current?.openModal();
        }}
        viewFunction={() => {
          view();
          setRecord(record);
        }}
        deleteFunction={() => {}}
        toolTips={{edit: "Chỉnh sửa", view: "Xem phiếu"}}
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

  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  const onChangePagination = (page, limit) => {
    setParams({...params, page: page, limit: limit});
  };

  const recallTable = () => {
    setParams({...params, pageSize: params?.limit, pageIndex: 1});
    setPage(1);
  };

  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        // const res = await APIServices.DangKiXe.getListKeHoach(params);
        setIsLoading(false);
        // setData(res);
        // setTotal(res?.length);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData(params);
  }, [params]);
  const view = () => {
    modalLenhXeRef?.current?.openModal();
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
            <TitleCustom text="Lệnh điều phương tiện"></TitleCustom>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setRecord(null);
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
            // onDoubleClick={navigateToDetail}
          ></TableCustom>
        </div>
      </div>

      <ModalCustom
        title="Lệnh điều phương tiện"
        ref={modalLenhXeRef}
        width={"220mm"}
      >
        <ModalLenhXe></ModalLenhXe>
      </ModalCustom>
      <ModalCustom
        ref={modalRef}
        title={`${record ? "Sửa thông tin" : "Thêm"} lệnh điều phương tiện`}
      >
        <Modal></Modal>
      </ModalCustom>
    </div>
  );
};
export default LenhXe;
