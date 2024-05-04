import {ListActionButton, ModalCustom, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "hooks";
import {columns as columnsInit, fields} from "./config";
// import QuanTriService from "api/QuanTri";
import {Button, Form, Row} from "antd";
import Search from "antd/es/input/Search";
import Modal from "./modal";
import {APIServices, isValuable} from "utils";
const User = () => {
  const tableRef = useRef(null);
  const modalRef = useRef(null);
  const modalChildRef = useRef(null);
  const dispatch = useAppDispatch();
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>();
  const [listRole, setListRole] = useState<any[]>();
  const [listUnit, setListUnit] = useState<any[]>();
  const [listPosition, setListPosition] = useState<any[]>();
  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  });
  const [columns, setColumns] = useState(columnsInit);

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
      const res = await APIServices.QuanTri.getListUser(params);
      setIsLoading(false);
      console.log(res);
      setData(res?.items);
      setTotal(res?.total);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const getListRole = async () => {
      try {
        const res = await APIServices.QuanTri.getListRole({
          pageIndex: 1,
          pageSize: 20,
        });
        setListRole(res?.items);
      } catch (error) {}
    };
    getListRole();
  }, []);
  useEffect(() => {
    const getListUnit = async () => {
      try {
        const res = await APIServices.QuanTri.getListUnit({
          pageIndex: 1,
          pageSize: 20,
        });
        setListUnit(res?.items);
      } catch (error) {}
    };
    getListUnit();
  }, []);
  useEffect(() => {
    const getListPosition = async () => {
      try {
        const res = await APIServices.QuanTri.getListPosition({
          pageIndex: 1,
          pageSize: 20,
        });
        setListPosition(res?.items);
      } catch (error) {}
    };
    getListPosition();
  }, []);
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
      // await QuanTriService.deleteUser(id);
      // recallTable();
    } catch (error) {}
  };
  const recallTable = () => {
    getData({...params, pageIndex: 1});
    setPage(1);
  };
  useEffect(() => {
    const renderColumnRole = () => {
      columns.find(e => e?.dataIndex == "role").render = (
        value,
        record,
        index
      ) => {
        return <>{listRole?.find(e => e?._id == value)?.name}</>;
      };
      setColumns([...columns]);
    };
    renderColumnRole();
  }, [listRole]);
  useEffect(() => {
    const renderColumnUnit = () => {
      columns.find(e => e?.dataIndex == "unit").render = (
        value,
        record,
        index
      ) => {
        return <>{listUnit?.find(e => e?._id == value)?.name}</>;
      };
      setColumns([...columns]);
    };
    renderColumnUnit();
  }, [listUnit]);
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
          onOpenModal={() => {
            console.log(id);
            if (!isValuable(id)) {
              modalChildRef?.current?.resetFields();
            }
          }}
          width={600}
          ref={modalRef}
          title={`${id ? "Cập nhật" : "Thêm"} thông tin người dùng`}
        >
          <Modal
            ref={modalChildRef}
            id={id}
            getList={recallTable}
            listUnit={listUnit}
            listRole={listRole}
            listPosition={listPosition}
          ></Modal>
        </ModalCustom>
      </div>
    </div>
  );
};
export default User;
