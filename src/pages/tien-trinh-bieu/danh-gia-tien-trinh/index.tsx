import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Row,
  Table,
  Typography,
} from "antd";
import {columns, fields, mockData} from "./config";
import {TableRowSelection} from "antd/es/table/interface";
import {InputFields, TitleCustom} from "components";
import {useAppDispatch, useAppSelector} from "hooks";
import {APIServices, formatDateToString, randomId, toArray} from "utils";
import {formatTime} from "types";
import {setListPosition} from "../../../redux/catalog/catalog.slice";
const StatisticTienTrinh = () => {
  const dispatch = useAppDispatch();
  const listPosition = useAppSelector(state => state.catalog.listPosition);
  const [dataTTB, setDataTTB] = useState<any>();
  const [listThanhPhan, setListThanhPhan] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>();
  const [dataSource, setDataSource] = useState<any>(mockData);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const [form] = Form.useForm();
  const [listUnit, setListUnit] = useState<any[]>();
  const convertDataSource = dataSource => {
    let list = [];
    dataSource?.forEach(e => {
      if (e?.children) {
        list = [...list, e, ...e?.children];
      }
    });
    return list;
  };
  useEffect(() => {
    const getListPosition = async () => {
      try {
        const res = await APIServices.QuanTri.getListPosition({
          pageIndex: 1,
          pageSize: 20,
        });
        dispatch(setListPosition(res?.items));
      } catch (error) {
        dispatch(setListPosition([]));
      }
    };
    getListPosition();
  }, []);
  useEffect(() => {
    const getListUnit = async () => {
      try {
        const res = await APIServices.QuanTri.getListUnit({
          pageIndex: 1,
          pageSize: 20,
        });
        setListUnit(res?.items);
      } catch (error) {
        setListUnit([]);
      }
    };
    getListUnit();
  }, []);
  useEffect(() => {
    const getTienTrinhBieuById = async id => {
      try {
        const res = await APIServices.TienTrinhBieu.getDetailTienTrinhBieu(id);
        setDataTTB(res);
      } catch (error) {
        // NotificationService.error(
        //   "Đã có lỗi khi lấy thông tin tiến trình biểu"
        // );
      }
    };
    getTienTrinhBieuById(id);
  }, [id]);
  useEffect(() => {
    const getListThanhPhanByTienTrinh = async id => {
      try {
        const res = await APIServices.TienTrinhBieu.getThanhPhanTienTrinhBieu(
          id
        );
        setListThanhPhan(res);
      } catch (error) {
        setListThanhPhan([]);
      }
    };
    getListThanhPhanByTienTrinh(id);
  }, [id]);
  useEffect(() => {
    const _setDataSource = listPeople => {
      let _dataSource = listPeople?.map(e => ({
        key: randomId(),
        full_name: e?.name_object ?? e?.object,
        children: e?.list_people?.map(person => ({
          ...person,
          key: randomId(),
          object: e?.object,
        })),
      }));
      setDataSource(_dataSource);
    };
    _setDataSource(listThanhPhan);
  }, [listThanhPhan]);
  useEffect(() => {
    const setFieldsValue = () => {
      const dataConvert = convertDataSource(dataSource);
      console.log(dataConvert);
      form.setFieldValue("list", dataConvert);
    };
    setFieldsValue();
  }, [dataSource]);
  useEffect(() => {
    form.setFieldValue("danh_gia", dataTTB?.danh_gia);
  }, [dataTTB]);
  useEffect(() => {
    const _setSelectedRowKeys = () => {
      console.log(dataSource);
      let listPeople = [];
      let _selectedRowKeys = [];

      toArray(dataSource)?.forEach(e => {
        listPeople = [...listPeople, ...e?.children];
      });
      _selectedRowKeys = listPeople
        ?.filter(person => person?.joined === 1)
        .map(person => {
          return person?.key;
        });
      setSelectedRowKeys(_selectedRowKeys);
    };
    _setSelectedRowKeys();
  }, [dataSource]);
  columns.find(e => e?.key == "full_name").onCell = (value, index) => {
    if (
      listPosition.some(
        position =>
          position?._id == value?.full_name ||
          position?.name == value?.full_name
      )
    ) {
      return {colSpan: 2};
    } else {
      return {colSpan: 1};
    }
  };
  columns.find(e => e?.key == "result").onCell = (value, index) => {
    if (
      listPosition.some(
        position =>
          position?._id == value?.full_name ||
          position?.name == value?.full_name
      )
    ) {
      return {colSpan: 0};
    } else {
      return {colSpan: 1};
    }
  };
  const rowSelection: TableRowSelection<any> = {
    checkStrictly: false,
    selectedRowKeys: selectedRowKeys,
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(_selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record);
      console.log(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
    getCheckboxProps: (record: any) => ({
      disabled:
        record.joined == -1 ||
        (listPosition.some(
          position =>
            position?._id == record?.full_name ||
            position?.name == record?.full_name
        ) &&
          !record?.children?.length), // Column configuration not to be checked
    }),
  };
  const saveButton = () => {
    return (
      <Button type="primary" onClick={submit} loading={loading}>
        Lưu lại
      </Button>
    );
  };
  const submit = async () => {
    // const tableValues = form.getFieldValue("list");
    // console.log(tableValues);
    // const listThanhVienOfTable = tableValues
    //   .filter(e => !list_doi_tuong.includes(e?.full_name))
    //   .map(e => ({
    //     ...e,
    //     joined: selectedRowKeys.includes(e?.key) ? 1 : e?.joined == -1 ? -1 : 0,
    //   }));
    // console.log(listThanhVienOfTable);
    // const listThanhPhanFormat = listThanhPhan?.map(thanhPhan => ({
    //   ...thanhPhan,
    //   ds_thanh_vien: listThanhVienOfTable.filter(
    //     thanhVien => thanhVien?.object == thanhPhan?.object
    //   ),
    // }));
    // console.log(listThanhPhanFormat);
    // const data = {
    //   progressId: id,
    //   thanh_phan: listThanhPhanFormat,
    //   evaluation: form.getFieldValue("evaluation"),
    //   time_train_actual: form.getFieldValue("time_train_actual"),
    // };
    // try {
    //   const res = await APIServices.TienTrinhBieu.danhGiaHuanLuyen(data);
    // } catch (error) {}
  };

  return (
    <div className="page">
      <div className="main">
        <Form form={form} labelAlign="left">
          <div className="container">
            <TitleCustom text="Thông tin tiến trình"></TitleCustom>
            <Descriptions>
              <Descriptions.Item label="Nội dung">
                {dataTTB?.content}
              </Descriptions.Item>
              <Descriptions.Item label="Năm">{dataTTB?.year}</Descriptions.Item>
              <Descriptions.Item label="Tuần">
                {dataTTB?.week}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày thực hiện">
                {formatDateToString(dataTTB?.date, formatTime.dayMonth)}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng số thời gian">
                {dataTTB?.sum_time_train}
              </Descriptions.Item>
              <Descriptions.Item label="Đơn vị">
                {listUnit?.find(e => e?._id == dataTTB?.unit)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Cấp phụ trách">
                {dataTTB?.unit_charge}
              </Descriptions.Item>
              <Descriptions.Item label="Địa điểm">
                {dataTTB?.location}
              </Descriptions.Item>
              <Descriptions.Item label="Vật chất bảo đảm chính">
                {dataTTB?.guaranteed_material}
              </Descriptions.Item>
            </Descriptions>
            <Row gutter={[8, 8]} justify={"start"}>
              <InputFields data={fields}></InputFields>
            </Row>
          </div>

          <div className="container">
            <Row gutter={[6, 6]} justify={"space-between"}>
              <Col span={10}>
                <TitleCustom text="Danh sách tham gia"></TitleCustom>
                {dataSource && (
                  <TableInputAdd
                    data={dataSource}
                    setData={setDataSource}
                    name="list"
                    form={form}
                    columns={columns}
                    rowSelection={rowSelection}
                    defaultExpandAllRows={true}
                    pagination={false}
                  ></TableInputAdd>
                )}
              </Col>
            </Row>
            <Row justify={"end"} className="container">
              <Button type="primary" onClick={submit} loading={loading}>
                Lưu lại
              </Button>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default StatisticTienTrinh;
