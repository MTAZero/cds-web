import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "hooks";

import {CollapseCustom, ExpandSearch} from "components";
import dayjs from "dayjs";

import {
  APIServices,
  convertDateStringToDateObject,
  formatDateToString,
  getDescendantTreeUnit,
  getItemLocalStorage,
  setItemLocalStorage,
} from "utils";
import {fieldType, formatTime} from "types";
import KetQuaHL from "./ket-qua";
import NoiDungHL from "./noi-dung/noi-dung";
import NhatKyHL from "./nhat-ky";
import {useGetUnitTreeQuery} from "../../redux/apiRtk/unit";
import {months} from "const";

const {COMBO_BOX, DATE, TREE_SELECT} = fieldType;
const ListThongKe = () => {
  const expandRef = useRef<any>();
  const [params, setParams] = useState(null);
  const nameObjectLocal = "thongKeHuanLuyen";
  const thongKeHuanLuyen = getItemLocalStorage(nameObjectLocal);
  const unitOfUser = useAppSelector(state => state.auth.info.unit);
  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  const {data: unitTree, isLoading: isLoadingUnitTree} =
    useGetUnitTreeQuery(unitOfUser);
  useEffect(() => {
    const _descendantTreeUnit = getDescendantTreeUnit(unitTree);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [unitTree]);
  const [listPosition, setListPosition] = useState<any[]>();

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

  const fields: any = [
    {
      type: DATE,
      label: "Năm",
      name: "year",
      picker: "year",
      optionsTime: {format: "YYYY"},
      allowClear: false,
    },
    {
      type: COMBO_BOX,
      label: "Tháng",
      options: months.map(e => ({value: e, label: e})),
      name: "month",
      allowClear: false,
    },

    {
      type: TREE_SELECT,
      label: "Đơn vị",
      name: "unit",
      allowClear: false,
      treeData: descendantTreeUnit,
    },
  ];
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
