import {ExpandSearch, ListActionButton, TableCustom} from "components";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "hooks";
import {columns, data, fields} from "./config";
import {useNavigate} from "react-router-dom";
import {RouterLink} from "routers/routers";
import {APIServices} from "utils";
const ThongKeHLCaNhan = prop => {
  const dispatch = useAppDispatch();
  const path = window.location.pathname;
  const [dataSource, setDataSource] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [total, setTotal] = useState();
  const [params, setParams] = useState(null);
  const navigateToDetail = (record, rowIndex) => {
    const routeRollcall = RouterLink.SO_SACH_CA_NHAN_DETAIL_ROUTE.replace(
      ":id",
      record?._id
    );
    navigate(routeRollcall);
  };
  const listActionButton = (value, record, index) => {
    return (
      <ListActionButton
        editFunction={() => {
          navigateToDetail(record, index);
        }}
        toolTips={{edit: "Ghi sổ sách"}}
      ></ListActionButton>
    );
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        // const res = await APIServices.SoSachHuanLuyen.getListHuanLuyenCaNhan(
        //   params
        // );
        setDataSource([{noi_dung: "123", thoi_gian: "123", ket_qua: 1}]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
  }, [params]);
  return (
    <div className="page">
      <div className="main">
        {/* <div className="container">
          <ExpandSearch
            // ref={expandRef}
            fields={fields}
            isSearchExpend={false}
            // onClickSearch={onClickSearch}
            // onFieldsChange={onFieldsChange}
          ></ExpandSearch>
        </div> */}
        <div className="container">
          <TableCustom
            isLoading={isLoading}
            dataSource={dataSource}
            total={total}
            pagination={false}
            columns={columns}
            hideCheckboxCol={true}
            listActionButton={listActionButton}
          ></TableCustom>
        </div>
      </div>
    </div>
  );
};
export default ThongKeHLCaNhan;
