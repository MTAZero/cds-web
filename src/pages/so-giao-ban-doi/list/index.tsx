import React, {useEffect, useRef, useState} from "react";
import {columns, columns as columnsInit, fields as fieldsInit} from "./config";
import {useNavigate, useParams} from "react-router-dom";
import {
  ExpandSearch,
  ListActionButton,
  TableCustom,
  TitleCustom,
} from "components";
import {Button, Row, Space} from "antd";
import ReactToPrint from "react-to-print";
import {
  APIServices,
  formatDateToString,
  getItemLocalStorage,
  setItemLocalStorage,
} from "utils";
import {formatTime, typeMeetingBook} from "types";
import {RouterLink} from "routers/routers";
import Print from "./print/Print";
const SoGiaoBanDoi = () => {
  const [params, setParams] = useState<any>({});
  const nameObjectLocal = "soGiaoBanSearch";
  const soGiaoBanSearch = getItemLocalStorage(nameObjectLocal);
  const [fields, setFields] = useState(fieldsInit);
  const expandRef = useRef<any>();
  const tableRef = useRef(null);
  const printRef = useRef<any>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any[]>();
  const [total, setTotal] = useState();
  const {type} = useParams();
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          navigateToDetail(record, index);
        }}
        toolTips={{edit: "Chỉnh sửa"}}
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

  const onClickSearch = () => {
    const searchFields = expandRef.current?.getFieldsValue();
    setParams({
      ...searchFields,
      year: formatDateToString(searchFields?.year, formatTime.year),
    });
    setPage(1);
  };
  const onFieldsChange = (changedFields, allFields) => {
    const searchFields = expandRef.current?.getFieldsValue();
    const valuesLocal = {
      ...searchFields,
      year: formatDateToString(searchFields?.year, null),
    };
    setItemLocalStorage(nameObjectLocal, valuesLocal);
  };
  const navigateToDetail = (
    record: {_id: any; type: string},
    rowIndex: any
  ) => {
    const routeRollcall = RouterLink.SO_GIAO_BAN_DETAIL_ROUTE.replace(
      ":id",
      record?._id
    ).replace(":type", type);
    navigate(routeRollcall);
  };
  const navigateToNew = () => {
    const routeDetail = RouterLink.SO_GIAO_BAN_DETAIL_ROUTE.replace(
      ":id",
      "tao-moi"
    ).replace(":type", type);
    navigate(routeDetail);
  };
  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
  useEffect(() => {
    const setDefaultValues = () => {
      expandRef.current?.setFieldValue("unit", soGiaoBanSearch?.unit);
    };
    setDefaultValues();
    onClickSearch();
  }, []);
  useEffect(() => {
    const getData = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.SoGiaoBan.getListSoGiaoBan(params);
        setIsLoading(false);
        setData(res?.items);
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
            <TitleCustom text="Sổ giao ban"></TitleCustom>
            <Space>
              <ReactToPrint
                documentTitle={`Sổ giao ban tháng ${
                  params?.month ?? "..."
                } năm ${
                  formatDateToString(params?.year, formatTime.year) ?? "..."
                }  `}
                trigger={() => {
                  return (
                    <Button style={{marginBottom: 4}} type="primary">
                      Xuất file
                    </Button>
                  );
                }}
                content={() => printRef.current}
                bodyClass="print-so-giao-ban"
              />
              <Button type="primary" onClick={navigateToNew}>
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
            onDoubleClick={navigateToDetail}
          ></TableCustom>
        </div>
      </div>
      {/* style={{display: "none"}} */}
      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <Print dataSource={data} params={params} listUnit={listUnit}></Print>
        </div>
      </div>
    </div>
  );
};
export default SoGiaoBanDoi;
