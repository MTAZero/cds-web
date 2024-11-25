import {Button, DatePicker, InputNumber, Space} from "antd";
import Icons from "assests/icons";
import {TableCustom} from "components";
import {useEffect, useRef, useState} from "react";
import {formatTime} from "types";
import {APIServices, formatDateToString, toArray} from "utils";
const ThucDon = () => {
  const [params, setParams] = useState<any>({_limit: 7});
  const [limit, setLimit] = useState(null);
  const [day, setDay] = useState(null);
  const [dataSource, setDataSource] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      key: "sang",
      dataIndex: "sang",
      title: "Sáng",
      width: 150,
      align: "center",
    },
    {
      key: "trua",
      dataIndex: "trua",
      title: "Trưa",
      width: 150,
      align: "center",
    },
    {
      key: "chieu",
      dataIndex: "chieu",
      title: "Chiều",
      width: 150,
      align: "center",
    },
  ];
  const getList = async params => {
    try {
      setIsLoading(true);
      const res = await APIServices.QuanLyBep.getListThucDon(params);
      setDataSource(res?.[0]?.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList(params);
  }, [params]);
  const onSearch = () => {
    var params = {};

    if (day) {
      params = {ngay: formatDateToString(day, "YYYY-MM-DD")};
    } else {
      params = {_limit: limit ?? 7};
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
                  setLimit(null);
                }}
                value={day}
                format={formatTime.dayFull}
                placeholder="Lọc theo ngày"
              ></DatePicker>
              <InputNumber
                onChange={e => {
                  console.log(e);
                  setLimit(e);
                  setDay(null);
                }}
                value={limit}
                style={{width: 250}}
                placeholder="Lọc theo số ngày gần nhất"
              ></InputNumber>
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
export default ThucDon;
