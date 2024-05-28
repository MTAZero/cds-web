import {Button, Col, Row} from "antd";
import {ModalCustom, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";

import {columns} from "./config";
import Icons from "assests/icons";
import UploadFile from "./upload";
import PdfViewer from "components/pdf-viewer";
import {APIServices, randomId, toArray} from "utils";
const VanKien = props => {
  const modalRef = useRef(null);
  const uploadRef = useRef(null);
  const [listFile, setListFile] = useState<any[]>();
  const [blob, setBlob] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const getListFile = async () => {
    try {
      const res = await APIServices.VanKien.getListVanKien();
      setListFile(
        toArray(res)
          ?.sort((a, b) => b?.update_at - a?.update_at)
          ?.map(e => ({...e, key: randomId()}))
      );
    } catch (error) {}
  };
  useEffect(() => {
    getListFile();
  }, []);

  useEffect(() => {
    if (toArray(listFile)?.length > 0) {
      onClick(listFile?.[0]);
    }
  }, [listFile]);
  const onClick = record => {
    setSelectedRowKeys([record?.key]);
    getFile(record?._id);
  };
  const getFile = async id => {
    try {
      const res = await APIServices.VanKien.getDetailVanKien(id);
      setBlob(res as Blob);
    } catch (error) {}
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
              dataSource={listFile}
              columns={columns}
              pagination={false}
              onClick={onClick}
              hideCheckboxCol={true}
              rowSelection={{selectedRowKeys}}
            ></TableCustom>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className="">
              <PdfViewer base64={blob}></PdfViewer>
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
        <UploadFile ref={uploadRef} getListFile={getListFile}></UploadFile>
      </ModalCustom>
    </div>
  );
};
export default VanKien;
