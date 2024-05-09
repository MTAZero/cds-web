import {
  InputFields,
  ListActionButton,
  ModalCustom,
  TableCustom,
} from "components";
import React, {useEffect, useRef, useState} from "react";
import {columns, fields} from "./config";
import {Button, Form, Row} from "antd";
import Modal from "./modal";
import Search from "antd/es/input/Search";
import {APIServices} from "utils";
const Unit = () => {
  const tableRef = useRef(null);
  const modalRef = useRef(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>();
  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  });

  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          openUpdateModal(record?._id);
        }}
        deleteFunction={() => {
          deleteRecord(record?._id);
        }}
      ></ListActionButton>
    );
  };
  const getData = async params => {
    try {
      setIsLoading(true);
      const res = await APIServices.QuanTri.getListUnit(params);
      setIsLoading(false);
      setData(res?.items);
      setTotal(res?.total);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData(params);
  }, [params]);
  const onChangePagination = (pageIndex, pageSize) => {
    setParams({...params, pageIndex: pageIndex, pageSize: pageSize});
  };
  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  const openCreateModal = () => {
    setId(null);
    modalRef?.current?.openModal();
  };
  const openUpdateModal = id => {
    setId(id);
    modalRef?.current?.openModal();
  };
  const search = () => {
    console.log(form.getFieldValue("keyword"));
    setParams({...params, keyword: form.getFieldValue("keyword")});
  };
  const deleteRecord = async id => {
    try {
      await APIServices.QuanTri.deleteUnit(id);
      recallTable();
    } catch (error) {}
  };
  const recallTable = () => {
    getData({...params, pageIndex: 1});
    setPage(1);
  };

  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Form form={form}>
            <Row justify={"space-between"} style={{marginBottom: 8}}>
              <Form.Item name="keyword">
                <Search
                  style={{width: 200}}
                  placeholder="Nhập"
                  allowClear
                  onSearch={(value, event) => {
                    console.log(value);
                    search();
                  }}
                />
              </Form.Item>
              <Button type="primary" onClick={openCreateModal}>
                Thêm mới
              </Button>
            </Row>
          </Form>
          <TableCustom
            ref={tableRef}
            dataSource={data}
            total={total}
            columns={columns}
            onChangePagination={onChangePagination}
            isLoading={isLoading}
            onDoubleClick={(record, rowIndex) => {
              console.log(record);
              openUpdateModal(record?._id);
            }}
            listActionButton={listActionButton}
          ></TableCustom>
        </div>
        <ModalCustom
          onCloseModal={() => {
            setId(null);
          }}
          width={600}
          ref={modalRef}
          title={`${id ? "Cập nhật" : "Thêm"} thông tin đơn vị`}
        >
          <Modal id={id} getList={recallTable}></Modal>
        </ModalCustom>
      </div>
    </div>
  );
};
export default Unit;
