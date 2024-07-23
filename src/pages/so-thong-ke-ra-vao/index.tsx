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
import ModalThongKeRaVaoPrint from "./print";
import ModalEdit from "./modal";
const SoThongKeRaVao = () => {
  const [params, setParams] = useState<any>({pageSize: 10, pageIndex: 1});
  const [fields, setFields] = useState(fieldsInit);
  const modalThongKeRaVaoPrintRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([{}]);
  const [total, setTotal] = useState();
  const [id, setId] = useState<any>();
  const dispatch = useAppDispatch();
  const modalThongKeRaVaoChildRef = useRef<any>();
  const {listUnit} = useAppSelector(state => state.catalog);
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
  fields.find(e => e.name == "unitId").options = toArray(listUnit).map(e => ({
    key: randomId(),
    value: e._id,
    label: e.name,
  }));
  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    console.log(searchFields);
    setParams({
      ...searchFields,
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
      await APIServices.SoThongKeRaVao.deleteSoThongKeRaVao(id);
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
        const res = await APIServices.SoThongKeRaVao.getListSoThongKeRaVao(
          params
        );
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
          ></ExpandSearch>
        </div>
        <div className="container">
          <Row justify={"space-between"} style={{marginBottom: 4}}>
            <TitleCustom text="Sổ thống kê ra vào"></TitleCustom>
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
        title="Thống kê ra vào"
        ref={modalThongKeRaVaoPrintRef}
        width={"310mm"}
      >
        <ModalThongKeRaVaoPrint id={id}></ModalThongKeRaVaoPrint>
      </ModalCustom>
      <ModalCustom
        width={1500}
        ref={modalRef}
        title={`${id ? "Sửa thông tin" : "Thêm"} thông tin ra vào
        `}
        onOk={() => {
          modalThongKeRaVaoChildRef?.current?.submit();
        }}
      >
        <ModalEdit
          ref={modalThongKeRaVaoChildRef}
          id={id}
          recallTable={recallTable}
        ></ModalEdit>
      </ModalCustom>
    </div>
  );
};
export default SoThongKeRaVao;
