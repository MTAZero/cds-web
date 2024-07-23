import {InputFields, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {fields} from "./config";
import {APIServices, formatDateToString} from "utils";
import {
  Button,
  Col,
  Form,
  Input,
  InputRef,
  Row,
  Space,
  TableColumnType,
} from "antd";
import {formatTime} from "types";
import dayjs from "dayjs";
import {SearchOutlined} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
const ThongKeCtt = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const [params, setParams] = useState<any>();
  const [data, setData] = useState<any>();
  useEffect(() => {
    const currentDay = dayjs();
    const previousDay = dayjs().subtract(7, "day");
    form.setFieldValue("end", currentDay);
    form.setFieldValue("start", previousDay);
    setParams({
      start: formatDateToString(previousDay, formatTime.dateTime_2),
      end: formatDateToString(currentDay, formatTime.dateTime_2),
    });
  }, []);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{padding: 8}} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Nhập từ khóa`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{marginBottom: 8, display: "block"}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{width: 90}}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{width: 90}}
          >
            Xóa
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({closeDropdown: false});
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{color: filtered ? "#1677ff" : undefined}} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  useEffect(() => {
    const getData = async params => {
      try {
        const res = await APIServices.ThongKeCtt.getListBaiViet(params);
        console.log(res);
        setData(res);
      } catch (error) {}
    };
    getData(params);
  }, [params]);
  const onClickSearch = () => {
    const formValues = form.getFieldsValue();
    setParams({
      ...params,
      start: formatDateToString(formValues?.start, formatTime.dateTime_2),
      end: formatDateToString(formValues?.end, formatTime.dateTime_2),
    });
  };
  const columns: any = [
    {key: "index", width: 120},

    {
      key: "post_title",
      dataIndex: "post_title",
      title: "Tiêu đề",
      align: "left",
      ...getColumnSearchProps("post_title"),
    },
    {
      key: "user_login",
      dataIndex: "user_login",
      title: "Tác giả",
      align: "center",
      ...getColumnSearchProps("user_login"),
      width: 250,
    },
  ];
  return (
    <div className="page">
      <div className="main">
        <div
          className="container"
          style={{backgroundColor: "white", height: "100%"}}
        >
          <Form form={form}>
            <Row style={{marginBottom: 12}} gutter={[8, 8]}>
              <InputFields data={fields}></InputFields>
              <Col>
                <Button onClick={onClickSearch} type="primary">
                  Lọc
                </Button>
              </Col>
            </Row>
          </Form>

          <TableCustom columns={columns} dataSource={data}></TableCustom>
        </div>
      </div>
    </div>
  );
};
export default ThongKeCtt;
