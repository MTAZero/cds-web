import React, {useEffect, useState} from "react";

import {useGetListSyllabusQuery} from "../../../../redux/apiRtk/syllabus";
import {TableCustom} from "components";
import {randomId} from "utils";
import {SyllabusStatus} from "components";
import {Button, Row} from "antd";

const ModalListGiaoAn = props => {
  const {setGiaoAnId, setFileGiaoAnId, closeModal} = props;
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [params, setParams] = useState<any>({pageIndex: 1, pageSize: 10});
  const {
    data: dataListSyllabus,
    isSuccess: isSuccessListSyllabus,
    isFetching: isFetchingListSyllabus,
  } = useGetListSyllabusQuery(params);
  useEffect(() => {
    if (dataListSyllabus) {
      setDisplayData(
        dataListSyllabus?.items?.map(el => ({
          key: randomId(),
          ...el,
        })) || []
      );
    }
  }, [dataListSyllabus]);
  const rowSelection: any = {
    type: "radio",
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setGiaoAnId(selectedRows?.[0]?._id);
      setFileGiaoAnId(selectedRows?.[0]?.file);
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };
  const columns: any[] = [
    {
      key: "index",
      width: 90,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      showSearch: true,
    },
    {
      title: "Ngành",
      dataIndex: "nganh",
      key: "nganh",
      align: "center",
      showSearch: true,
    },

    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      align: "center",
      render: (value, record, index) => {
        return <SyllabusStatus status={value}></SyllabusStatus>;
      },
    },
  ];
  return (
    <div>
      <TableCustom
        isLoading={isFetchingListSyllabus}
        total={dataListSyllabus?.total}
        dataSource={displayData}
        columns={columns}
        onChangePagination={(page, limit) => {
          setParams({...params, pageIndex: page, pageSize: limit});
        }}
        rowSelection={rowSelection}
      />
      <Row justify={"end"}>
        <Button type="primary" onClick={closeModal}>
          Xác nhận
        </Button>
      </Row>
    </div>
  );
};
export default ModalListGiaoAn;
