import {Button, Col, DatePicker, Row, Table} from "antd";
import {InputFields, ModalCustom, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";

import {columns, fields, mockData} from "./config";
import Icons from "assests/icons";
// import useFiles from "api/fetch/useFiles";
import {useLocation} from "react-router-dom";
import {useAppDispatch} from "hooks";
import UploadFile from "./upload/UploadFile";
import PdfViewer from "components/pdf-viewer";
const VanKien = props => {
  const modalRef = useRef(null);
  const uploadRef = useRef(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = window.location.pathname;
  const [listFile, setListFile] = useState<any[]>();
  const [blob, setBlob] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const {data, error, isLoading, mutate} = useFiles(null);
  // useEffect(() => {
  //   setListFile(
  //     []
  //     // toArray(data?.metadata)
  //     //   ?.sort((a, b) => compareDate(b?.updatedAt, a?.updatedAt) - 1)
  //     //   ?.map(e => ({...e, key: randomId()}))
  //   );
  // }, [data]);

  // useEffect(() => {
  //   if (toArray(listFile)?.length > 0) {
  //     onClick(listFile?.[0]);
  //   }
  // }, [listFile]);
  const onClick = record => {
    setSelectedRowKeys([record?.key]);
    getFile(record?._id);
  };
  const getFile = async id => {
    // try {
    //   const res = await vanKienService.getFile(id);
    //   setBlob(res?.encode_file_base64 as Blob);
    // } catch (error) {
    //   Notification("error", "Đã có lỗi khi lấy thông tin file");
    // }
  };
  const ButtonOpenModal = (): JSX.Element => {
    return (
      <Button
        type="primary"
        icon={<Icons.upload></Icons.upload>}
        onClick={() => {
          modalRef?.current?.openModal();
        }}
      >
        Tải văn kiện
      </Button>
    );
  };

  return (
    <div className="page van-kien">
      <div className="main">
        <Row gutter={[4, 4]} className="container">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            {/* <Row style={{width: "100%", marginBottom: 6}}>
              <InputFields data={fields} x></InputFields>
            </Row> */}
            <Button
              style={{marginBottom: 6}}
              type="primary"
              icon={<Icons.upload></Icons.upload>}
              onClick={() => {
                modalRef?.current?.openModal();
              }}
            >
              Tải văn kiện
            </Button>
            <TableCustom
              dataSource={mockData}
              columns={columns}
              pagination={false}
              onClick={onClick}
              hideCheckboxCol={true}
              rowSelection={{selectedRowKeys}}
            ></TableCustom>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className="">
              <PdfViewer blob={mockBlob}></PdfViewer>
            </div>
          </Col>
        </Row>
      </div>
      <ModalCustom
        onOpenModal={() => {
          uploadRef?.current?.resetFields();
        }}
        centerd
        width={700}
        ref={modalRef}
        title="Tải văn kiện"
      >
        <UploadFile ref={uploadRef} mutate={() => {}}></UploadFile>
      </ModalCustom>
    </div>
  );
};
export default VanKien;