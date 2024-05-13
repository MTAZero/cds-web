import {Table} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "hooks";

import {fields as fieldsInit} from "./config";
import {CollapseCustom, ExpandSearch} from "components";
import dayjs from "dayjs";

import {
  APIServices,
  convertDateStringToDateObject,
  formatDateToString,
  getItemLocalStorage,
  parseJson,
  setItemLocalStorage,
} from "utils";
import {formatTime} from "types";
import KetQuaHL from "./ket-qua";
import NoiDungHL from "./noi-dung/noi-dung";
import NhatKyHL from "./nhat-ky";
const ListThongKe = () => {
  const dispatch = useAppDispatch();
  const expandRef = useRef<any>();
  const [params, setParams] = useState(null);
  const [fields, setFields] = useState(fieldsInit);
  const nameObjectLocal = "thongKeHuanLuyen";
  const thongKeHuanLuyen = getItemLocalStorage(nameObjectLocal);
  const [listUnit, setListUnit] = useState<any[]>();
  const [listPosition, setListPosition] = useState<any[]>();
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
    setOptionsDonVi(listUnit);
  }, [listUnit]);
  const setOptionsDonVi = async listUnit => {
    fields.find((e: {name: string}) => e?.name === "unit").options =
      listUnit?.map((e: {_id: any; name: any}) => ({
        value: e?._id,
        label: e?.name,
      }));

    setFields([...fields]);
  };
  const onFieldsChange = (changedFields, allFields) => {
    const searchFields = expandRef.current?.getFieldsValue();
    const valuesLocal = {
      ...searchFields,
      year: formatDateToString(searchFields?.year, null),
    };
    setItemLocalStorage(nameObjectLocal, valuesLocal);
  };
  useEffect(() => {
    const setDefaultValues = () => {
      expandRef.current?.setFieldValue(
        "year",
        thongKeHuanLuyen?.year
          ? convertDateStringToDateObject(thongKeHuanLuyen?.year)
          : dayjs()
      );
      expandRef.current?.setFieldValue(
        "month",
        thongKeHuanLuyen?.month ?? dayjs().month() + 1
      );
      expandRef.current?.setFieldValue("unit", thongKeHuanLuyen?.unit);
    };
    setDefaultValues();
    onClickSearch();
  }, []);
  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      year: formatDateToString(searchFields?.year, formatTime.year),
    });
  };
  return (
    <div className="list-thong-ke page">
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
        <CollapseCustom
          title={"Kết quả huấn luyện từng người"}
          children={[
            <div className="container">
              <KetQuaHL params={params} listPosition={listPosition}></KetQuaHL>
            </div>,
          ]}
        ></CollapseCustom>
        <CollapseCustom
          title={"Nội dung huấn luyện"}
          children={[
            <div className="container">
              <NoiDungHL params={params}></NoiDungHL>
            </div>,
          ]}
        ></CollapseCustom>
        <CollapseCustom
          title={"Nhật ký huấn luyện"}
          children={[
            <div className="container">
              <NhatKyHL params={params}></NhatKyHL>
            </div>,
          ]}
        ></CollapseCustom>
      </div>
    </div>
  );
};
export default ListThongKe;
