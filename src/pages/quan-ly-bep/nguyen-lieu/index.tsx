import {Button, DatePicker, Space} from "antd";
import Icons from "assests/icons";
import {TableCustom} from "components";
import {useEffect, useRef, useState} from "react";
import {formatTime} from "types";
import {
  APIServices,
  formatDateToString,
  formatToCurrencyTypeToFixed,
  toArray,
  toNumber,
} from "utils";
const NguyenLieu = () => {
  const [params, setParams] = useState<any>({ngay: null});
  const [day, setDay] = useState(null);
  const [dataSource, setDataSource] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tongTien, setTongTien] = useState<any>(0);
  const columns: any = [
    {
      key: "index",
      dataIndex: "index",
      width: 60,
    },
    {
      key: "day",
      dataIndex: "day",
      title: "Ngày",
      align: "center",
      width: 120,
      render: (value, record, index) => {
        return <>{formatDateToString(value, formatTime.dayFull)}</>;
      },
    },
    {
      key: "luongthuc",
      dataIndex: "luongthuc",
      title: "Lương thực",
      width: 150,
      align: "center",
    },
    {
      key: "ntt_sl",
      dataIndex: "ntt_sl",
      title: "Cân đong (Theo đơn vị)",
      width: 150,
      align: "center",
    },
    {
      key: "ntt_dongia",
      dataIndex: "ntt_dongia",
      title: "Đơn giá (VNĐ)",
      render: (value, record, index) => {
        return <>{formatToCurrencyTypeToFixed(value)}</>;
      },
      width: 150,
      align: "center",
    },
    {
      key: "ntt_dongia",
      dataIndex: "ntt_dongia",
      title: "Thành tiền (VNĐ)",
      render: (value, record, index) => {
        return <>{formatToCurrencyTypeToFixed(value * record?.ntt_sl, 3)}</>;
      },
      width: 150,
      align: "center",
    },
    {
      key: "cmt1",
      dataIndex: "cmt1",
      title: "Xác nhận của trực ban",
      render: (value, record, index) => {
        return (
          <>
            <div style={{color: value == "ĐỦ" ? "green" : "red"}}>{value}</div>
          </>
        );
      },
      width: 150,
      align: "center",
    },
    {
      key: "cmt2",
      dataIndex: "cmt2",
      title: "Xác nhận của quản lý",
      render: (value, record, index) => {
        return (
          <>
            <div style={{color: value == "ĐỦ" ? "green" : "red"}}>{value}</div>
          </>
        );
      },
      width: 150,
      align: "center",
    },
  ];

  useEffect(() => {
    const getList = async params => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanLyBep.getListNguyenLieu(params);
        console.log(res);
        setDataSource(res?.[0]?.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getList(params);
  }, [params]);
  useEffect(() => {
    const getTongTien = dataSource => {
      var _tongTien = 0;
      toArray(dataSource).forEach(e => {
        _tongTien += toNumber(e?.ntt_sl, 3) * toNumber(e?.ntt_dongia, 3);
      });
      setTongTien(_tongTien);
    };
    getTongTien(dataSource);
  }, [dataSource]);
  const onSearch = () => {
    var params = {};

    if (day) {
      params = {ngay: formatDateToString(day, "YYYY-MM-DD")};
    }

    setParams({...params});
  };
  const tableRef = useRef(null);
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Space>
            <Space>
              <DatePicker
                onChange={e => {
                  console.log(e);
                  setDay(e);
                }}
                value={day}
                format={formatTime.dayFull}
                placeholder="Lọc theo ngày"
              ></DatePicker>

              <Button
                icon={<Icons.search></Icons.search>}
                type="primary"
                onClick={onSearch}
              >
                Lọc
              </Button>
            </Space>
          </Space>
        </div>
        <div className="container">
          <strong>
            Tổng tiền: {formatToCurrencyTypeToFixed(tongTien, 3)} (VNĐ)
          </strong>
          <TableCustom
            ref={tableRef}
            pagination={false}
            isLoading={isLoading}
            dataSource={dataSource}
            total={toArray(dataSource?.length)}
            columns={columns}
            hideCheckboxCol={true}
          ></TableCustom>
        </div>
      </div>
    </div>
  );
};
export default NguyenLieu;
