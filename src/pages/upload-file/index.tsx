import {Button, Col, Row, Space, TreeSelect} from "antd";
import {ModalCustom, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {columns, fileInfo} from "./config";
import Icons from "assests/icons";
import ModalUpload from "./modalUpload";
import PdfViewer from "components/pdf-viewer";
import {
  APIServices,
  getDescendantTreeUnit,
  NotificationService,
  randomId,
  toArray,
} from "utils";
import {useParams} from "react-router-dom";
import {useGetUnitTreeQuery} from "../../redux/apiRtk/unit";
import {useAppSelector} from "hooks";
const UploadFile = props => {
  const modalRef = useRef(null);
  const uploadRef = useRef(null);
  const {type} = useParams();
  const [listFile, setListFile] = useState<any[]>();
  const unitOfUser = useAppSelector(state => state.auth.info.unit);
  const [blob, setBlob] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [params, setParams] = useState<any>({type: type});
  const [loading, setLoading] = useState<any>(false);
  const {data: unitTree, isLoading: isLoadingUnitTree} =
    useGetUnitTreeQuery(unitOfUser);
  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  useEffect(() => {
    const _descendantTreeUnit = getDescendantTreeUnit(unitTree);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [unitTree]);
  columns.find(e => e?.key === "name").render = (value, record, index) => {
    return (
      <>
        {fileInfo(record, () => {
          deleteVanKien(record?._id);
        })}
      </>
    );
  };
  const deleteVanKien = async id => {
    try {
      await APIServices.VanKien.deleteVanKien(id);
      await getListFile(params);
    } catch (error) {
      NotificationService.error("Có lỗi khi xóa tài liệu này");
    }
  };
  const getListFile = async params => {
    try {
      setLoading(true);
      const res = await APIServices.VanKien.getListVanKien(params);
      setListFile(
        toArray(res)
          ?.sort((a, b) => b?.update_at - a?.update_at)
          ?.map(e => ({...e, key: randomId()}))
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListFile(params);
  }, [params]);

  useEffect(() => {
    if (toArray(listFile)?.length > 0) {
      onClick(listFile?.[0]);
    } else {
      setBlob(null);
    }
  }, [listFile]);
  const onClick = record => {
    setSelectedRowKeys([record?.key]);
    getFile(record?._id);
  };
  const getFile = async id => {
    try {
      const res = await APIServices.VanKien.getDetailVanKien(id);
      console.log(res);
      setBlob(res as Blob);
    } catch (error) {}
  };

  return (
    <div className="page upload-file">
      <div className="main">
        <Row gutter={[4, 4]} className="container">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            {/* <Row style={{width: "100%", marginBottom: 6}}>
              <InputFields data={fields} x></InputFields>
            </Row> */}
            <Row gutter={[4, 4]} justify={"space-between"}>
              <TreeSelect
                style={{width: "60%"}}
                // value={selectedUnit}
                dropdownStyle={{maxHeight: 400, overflow: "auto"}}
                treeData={descendantTreeUnit}
                placeholder={"Chọn đơn vị"}
                treeDefaultExpandAll
                onChange={e => {
                  setParams({...params, keyword: e});
                }}
                treeLine
              />
              <Button
                style={{marginBottom: 6}}
                type="primary"
                icon={<Icons.upload></Icons.upload>}
                onClick={() => {
                  modalRef?.current?.openModal();
                }}
              >
                Tải lên
              </Button>
            </Row>

            <></>
            <TableCustom
              isLoading={loading}
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
        title="Tải tài liệu"
      >
        <ModalUpload
          ref={uploadRef}
          type={type}
          getListFile={getListFile}
          descendantTreeUnit={descendantTreeUnit}
        ></ModalUpload>
      </ModalCustom>
    </div>
  );
};
export default UploadFile;
