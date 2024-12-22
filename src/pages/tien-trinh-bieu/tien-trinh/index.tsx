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
  getItemLocalStorage,
  randomId,
  toArray,
} from "utils";
import dayjs from "dayjs";
import {
  ExpandSearch,
  ListActionButton,
  ModalCustom,
  TableCustom,
  TitleCustom,
} from "components";

import {formatTime} from "types";
import {RouterLink} from "routers/routers";
import useTienTrinhBieu from "hooks/fetch/useTienTrinhBieu";
import ModalPdf from "../modal-pdf";
const TienTrinh = (props: any) => {
  const printRef = useRef<any>();
  const nameObjectLocal = "tienTrinhBieuSearch";
  const [columns, setColumns] = useState<any>(columnsInit);
  const [fields, setFields] = useState(fieldsInit);
  const [listUnit, setListUnit] = useState<any[]>();
  const [dataSource, setDataSource] = useState<any>();
  const tienTrinhBieuSearch = getItemLocalStorage(nameObjectLocal);
  const [params, setParams] = useState(null);
  const navigate = useNavigate();
  const expandRef = useRef<any>();
  const modalPdfRef = useRef(null);
  const [base64, setBase64] = useState(null);
  const {data, isLoading, error, mutate} = useTienTrinhBieu(params);
  useEffect(() => {
    const getListUnit = async () => {
      try {
        const res = await APIServices.QuanTri.getListUnit({
          pageIndex: 1,
          pageSize: 100,
        });
        setListUnit(toArray(res?.items).filter(e => e?.name?.includes("Đội")));
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
        key: randomId(),
      }));

    setFields([...fieldsInit]);
  };
  const getFile = async idTienTrinh => {
    try {
      const _base64 = await APIServices.TienTrinhBieu.getDetailFile(
        idTienTrinh
      );
      setBase64(_base64);
    } catch (error) {
      setBase64(null);
    }
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
          getFile(record?._id);
          modalPdfRef?.current?.openModal();
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
          [e?.object]: e?.time,
        };
      });
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
        render: (value, record, index) => {
          return (
            <div>
              {value?.map(time => (
                <div>{time}</div>
              ))}
            </div>
          );
        },
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
      expandRef.current?.setFieldValue("unit", tienTrinhBieuSearch?.unit);
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
                  dataSource?.[0]?.week ?? "..."
                } tháng ${dataSource?.[0]?.month ?? "..."}  `}
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
              listUnit={listUnit}
            ></PrintTienTrinh>
          </div>
        </div>
      </div>
      <ModalCustom ref={modalPdfRef}>
        <ModalPdf base64={base64}></ModalPdf>
      </ModalCustom>
    </div>
  );
};
export default TienTrinh;
