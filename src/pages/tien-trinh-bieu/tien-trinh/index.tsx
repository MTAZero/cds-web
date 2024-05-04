import {useEffect, useRef, useState} from "react";

import {columns as columnsInit, fields as fieldsInit, mockData} from "./config";
import {useNavigate} from "react-router-dom";

import {Button, Row, Space} from "antd";
import PrintTienTrinh from "./print-tien-trinh";
import ReactToPrint from "react-to-print";
import {
  APIServices,
  convertDateStringToDateObject,
  formatDateToString,
  toArray,
} from "utils";
import dayjs from "dayjs";
import ModalGiaoAn from "./ModalGiaoAn/ModalGiaoAn";
import {
  ExpandSearch,
  ListActionButton,
  ModalCustom,
  TableCustom,
  TitleCustom,
} from "components";

import {parseJson} from "utils";
import {formatTime} from "types";
import {RouterLink} from "routers/routers";
import useTienTrinhBieu from "hooks/fetch/useTienTrinhBieu";
import {useAppDispatch} from "hooks";
const TienTrinh = (props: any) => {
  const printRef = useRef<any>();
  const nameObjectLocal = "tienTrinhBieuSearch";
  const [columns, setColumns] = useState<any>(columnsInit);
  const [fields, setFields] = useState(fieldsInit);
  const [listUnit, setListUnit] = useState<any[]>();
  const [dataSource, setDataSource] = useState<any>();
  const tienTrinhBieuSearch = parseJson(localStorage.getItem(nameObjectLocal));
  const [params, setParams] = useState(null);
  const navigate = useNavigate();
  const expandRef = useRef<any>();
  const giaoAnRef = useRef<any>();
  const {data, isLoading, error, mutate} = useTienTrinhBieu(params);
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
    setOptionsDonVi(listUnit);
  }, [listUnit]);
  const setOptionsDonVi = async listUnit => {
    fieldsInit.find((e: {name: string}) => e?.name === "unit").options =
      listUnit?.map((e: {_id: any; name: any}) => ({
        value: e?._id,
        label: e?.name,
      }));

    setFields([...fieldsInit]);
  };
  const listActionButton = (value: any, record: any, index: any) => {
    return (
      <ListActionButton
        editFunction={() => {
          navigateToDetail(record, index);
        }}
        checkFunction={() => {
          navigateToRollcall(record, index);
        }}
        viewFunction={() => {
          giaoAnRef?.current?.openModal();
        }}
        toolTips={{edit: "Chỉnh sửa", check: "Đánh giá", view: "Xem giáo án"}}
      ></ListActionButton>
    );
  };

  useEffect(() => {
    const formatThoiGianHL = (time_train_detail: any) => {
      let time: any;

      toArray(time_train_detail).forEach(e => {
        time = {
          ...time,
          [e?.object]: e?.time?.[0],
        };
      });
      console.log(time);
      return time;
    };
    const _setColumns = (thanh_phan: any) => {
      columnsInit.find(
        (e: {key: string}) => e?.key === "time_train_detail"
      ).children = toArray(thanh_phan).map((e: any) => ({
        title: e,
        dataIndex: e,
        key: e,
        align: "center",
      }));
      setColumns(columnsInit);
    };
    const _setDataSource = (tienTrinhTuan: any[]) => {
      const data = tienTrinhTuan?.map(e => ({
        ...e,
        ...formatThoiGianHL(e?.time_train_detail),
      }));
      setDataSource(data);
    };
    console.log(data);
    _setDataSource(data?.items);
    _setColumns(data?.items?.[data?.items?.length - 1]?.allElements);
  }, [data]);
  useEffect(() => {
    const setDefaultValues = () => {
      expandRef.current?.setFieldValue(
        "year",
        tienTrinhBieuSearch?.year
          ? convertDateStringToDateObject(tienTrinhBieuSearch?.year)
          : dayjs()
      );
      expandRef.current?.setFieldValue(
        "month",
        tienTrinhBieuSearch?.month ?? dayjs().month() + 1
      );
      expandRef.current?.setFieldValue("week", tienTrinhBieuSearch?.tuan ?? 1);
      expandRef.current?.setFieldValue(
        "unit",
        tienTrinhBieuSearch?.unit ?? localStorage.getItem("unit")
      );
    };
    setDefaultValues();

    onClickSearch();
  }, []);
  const navigateToNew = () => {
    const routeDetail = RouterLink.TIEN_TRINH_BIEU_DETAIL_ROUTE.replace(
      ":id",
      "tao-moi"
    );
    navigate(routeDetail);
  };
  const navigateToRollcall = (record: {_id: any}, rowIndex: any) => {
    const routeRollcall = RouterLink.TIEN_TRINH_BIEU_CHECK_ROUTE.replace(
      ":id",
      record?._id
    );
    navigate(routeRollcall);
  };
  const navigateToDetail = (record: {_id: any}, rowIndex: any) => {
    const routeDetail = RouterLink.TIEN_TRINH_BIEU_DETAIL_ROUTE.replace(
      ":id",
      record?._id
    );
    navigate(routeDetail);
  };
  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      year: formatDateToString(searchFields?.year, formatTime.year),
    });
    mutate();
  };

  const onFieldsChange = (changedFields: any, allFields: any) => {
    const searchFields = expandRef.current?.getFieldsValue();
    const valuesLocal = JSON.stringify({
      ...searchFields,
      year: formatDateToString(searchFields?.year, null),
    });
    localStorage.setItem(nameObjectLocal, valuesLocal);
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
            <TitleCustom text="Tiến trình biểu"></TitleCustom>
            <Space>
              <ReactToPrint
                documentTitle={`Tiến trình biểu tuần ${
                  dataSource?.[0]?.tuan ?? "..."
                } tháng ${dataSource?.[0]?.thang ?? "..."}  `}
                trigger={() => {
                  return <Button type="primary">Xuất file</Button>;
                }}
                content={() => printRef.current}
                bodyClass="print-tien-trinh"
              />
              <Button type="primary" onClick={navigateToNew}>
                Thêm mới
              </Button>
            </Space>
          </Row>
          <TableCustom
            isLoading={isLoading}
            dataSource={dataSource}
            pagination={true}
            columns={columns}
            hideCheckboxCol={true}
            onDoubleClick={navigateToDetail}
            listActionButton={listActionButton}
          ></TableCustom>
        </div>
        <div id="print" style={{display: "none"}}>
          <div ref={printRef}>
            <PrintTienTrinh
              ref={printRef}
              dataSource={dataSource}
              columns={columns?.filter(
                (e: {key: string}) => e?.key !== "action"
              )}
            ></PrintTienTrinh>
          </div>
        </div>
        <ModalCustom ref={giaoAnRef}>
          <ModalGiaoAn></ModalGiaoAn>
        </ModalCustom>
      </div>
    </div>
  );
};
export default TienTrinh;
