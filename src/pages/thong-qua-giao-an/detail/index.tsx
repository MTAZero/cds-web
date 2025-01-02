import {Button, Col, Form, Row, Space, Spin, Upload} from "antd";
import {InputFields, ModalCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {
  useGetPlanSyllabusQuery,
  usePostPlanSyllabusMutation,
  usePutPlanSyllabusMutation,
} from "../../../redux/apiRtk/planSyllabus";
import {fieldType, formatTime, planSyllabusStatus} from "types";
import {
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
  NotificationService,
  toArray,
} from "utils";
import Icons from "assests/icons";
import {useGetListUserQuery} from "../../../redux/apiRtk/user";
import {usePostFileMutation} from "../../../redux/apiRtk/uploadFile";
import ModalListGiaoAn from "../modalListGiaoAn";
import ModalViewFile from "../modalViewFile";
import {useAppSelector} from "hooks";
const {TREE_SELECT, DATE, SELECT, INPUT, INPUT_NUMBER} = fieldType;
const ModalThongQuaGiaoAnDetail = props => {
  const {idRecord, descendantTreeUnit, closeModal} = props;
  const [form] = Form.useForm();
  const modalViewFileRef = useRef<any>();
  const modalGiaoAnRef = useRef<any>();
  const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
  const [
    postPlanSyllabus,
    {isSuccess: isSuccessPost, isLoading: isLoadingPost, error: errorPost},
  ] = usePostPlanSyllabusMutation();
  const [
    putPlanSyllabus,
    {isSuccess: isSuccessPut, isLoading: isLoadingPut, error: errorPut},
  ] = usePutPlanSyllabusMutation();
  const {data: dataGet, isSuccess: isSuccessGet} = useGetPlanSyllabusQuery(
    idRecord,
    {
      skip: !isValuable(idRecord),
    }
  );
  const {data: dataUsers, isSuccess: isSuccessUsers} = useGetListUserQuery({
    pageIndex: 1,
    pageSize: 200,
  });
  const isOpenModal = useAppSelector(state => state.global.isOpenModal);
  const [postFile, {isSuccess: isSuccessUpload, data: dataUpload}] =
    usePostFileMutation();
  const [fileId, setFileId] = useState();
  const [giaoAnId, setGiaoAnId] = useState();
  const [fileGiaoAnId, setFileGiaoAnId] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    console.log(isOpenModal);
    console.log(idRecord);
    if (isOpenModal && !isValuable(idRecord)) {
      form.resetFields();
      setSelectedFile(null);
      setGiaoAnId(null);
    }
  }, [isOpenModal, idRecord]);
  useEffect(() => {
    console.log(dataGet);
    const formatValues = {
      ...dataGet,
      thoi_gian_bat_dau_phe_duyet: convertDateStringToDateObject(
        dataGet?.thoi_gian_bat_dau_phe_duyet
      ),
      thoi_gian_ket_thuc_phe_duyet: convertDateStringToDateObject(
        dataGet?.thoi_gian_ket_thuc_phe_duyet
      ),
      thoi_gian_bat_dau_thong_qua: convertDateStringToDateObject(
        dataGet?.thoi_gian_bat_dau_thong_qua
      ),
      thoi_gian_ket_thuc_thong_qua: convertDateStringToDateObject(
        dataGet?.thoi_gian_ket_thuc_thong_qua
      ),
    };
    form.setFieldsValue(formatValues);
    setSelectedFile(dataGet?.file);
    setGiaoAnId(dataGet?.giao_an);
  }, [dataGet]);

  useEffect(() => {
    if (isSuccessPost) {
      closeModal();
      NotificationService.success("Thêm dữ liệu thành công");
    }
  }, [isSuccessPost]);
  useEffect(() => {
    if (isSuccessPut) {
      closeModal();
      NotificationService.success("Sửa dữ liệu thành công");
    }
  }, [isSuccessPut]);
  const handleChooseFile = options => {
    const file = options?.file;

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append(
      "name",
      form.getFieldValue("ten") ?? "Kế hoạch thông qua giáo án"
    );
    formData.append("type", "15");
    console.log(formData);
    postFile(formData);
  };
  useEffect(() => {
    if (dataUpload) {
      setSelectedFile(dataUpload?._id);
    }
  }, [dataUpload]);
  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return;
    }
    const payload = {
      data: {
        ...values,
        thoi_gian_bat_dau_phe_duyet: formatDateToString(
          values?.thoi_gian_bat_dau_phe_duyet
        ),
        thoi_gian_ket_thuc_phe_duyet: formatDateToString(
          values?.thoi_gian_ket_thuc_phe_duyet
        ),
        thoi_gian_bat_dau_thong_qua: formatDateToString(
          values?.thoi_gian_bat_dau_thong_qua
        ),
        thoi_gian_ket_thuc_thong_qua: formatDateToString(
          values?.thoi_gian_ket_thuc_thong_qua
        ),
        file: selectedFile,
        giao_an: giaoAnId,
      },
      id: idRecord,
    };
    const callApi = isValuable(idRecord) ? putPlanSyllabus : postPlanSyllabus;
    callApi(payload);
  };
  const fields = [
    {
      key: "nguoi_phe_duyet",
      name: "nguoi_phe_duyet",
      type: SELECT,
      label: "Người phê duyệt",
      css: css,
      options: toArray(dataUsers?.items)
        ?.filter(e => e?.isPersonal)
        .map(e => ({
          label: e?.full_name,
          value: e?._id,
        })),
    },

    {
      key: "thoi_gian",
      name: "thoi_gian",
      type: INPUT_NUMBER,
      label: "Thời gian",
      css: css,
    },
    {
      key: "dia_diem_phe_duyet",
      name: "dia_diem_phe_duyet",
      type: INPUT,
      label: "Địa điểm phê duyệt",
      css: css,
    },
    {
      key: "thoi_gian_bat_dau_phe_duyet",
      name: "thoi_gian_bat_dau_phe_duyet",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian bắt đầu phê duyệt",
      css: css,
      disableDate: false,
    },
    {
      key: "thoi_gian_ket_thuc_phe_duyet",
      name: "thoi_gian_ket_thuc_phe_duyet",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian kết thúc phê duyệt",
      css: css,
      disableDate: false,
    },
    {
      key: "dia_diem_thong_qua",
      name: "dia_diem_thong_qua",
      type: INPUT,
      label: "Địa điểm thông qua",
      css: css,
    },
    {
      key: "thoi_gian_bat_dau_thong_qua",
      name: "thoi_gian_bat_dau_thong_qua",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian bắt đầu thông qua",
      css: css,
      disableDate: false,
    },
    {
      key: "thoi_gian_ket_thuc_thong_qua",
      name: "thoi_gian_ket_thuc_thong_qua",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian kết thúc thông qua",
      css: css,
      disableDate: false,
    },
    {
      key: "noi_dung_phe_duyet",
      name: "noi_dung_phe_duyet",
      type: INPUT,
      label: "Nội dung phê duyệt",
      css: css,
    },
    {
      key: "ket_luan",
      name: "ket_luan",
      type: INPUT,
      label: "Kết luận",
      css: css,
    },
    {
      key: "nganh",
      name: "nganh",
      type: INPUT,
      label: "Ngành",
      css: css,
    },
    {
      key: "trang_thai",
      name: "trang_thai",
      type: SELECT,
      options: Object.values(planSyllabusStatus).map(e => ({
        value: e,
        label: e,
      })),
      label: "Trạng thái",
      css: css,
    },
    {
      key: "don_vi",
      name: "don_vi",
      type: TREE_SELECT,
      label: "Đơn vị",
      css: css,
      treeData: descendantTreeUnit,
    },
  ];
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Spin spinning={isLoadingPost || isLoadingPut}>
            <Form form={form}>
              {" "}
              <Row gutter={[8, 8]}>
                <InputFields data={fields}></InputFields>
              </Row>
            </Form>
            <Row justify={"space-between"} style={{marginTop: 8}}>
              <Col xs={10} md={8} xl={3} lg={3}>
                Kế hoạch
              </Col>
              <Col xs={14} md={16} xl={21} lg={21} style={{fontWeight: 700}}>
                {selectedFile ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      modalViewFileRef.current.openModal();
                      setFileId(selectedFile);
                    }}
                  >
                    Xem kế hoạch
                  </Button>
                ) : (
                  "Chưa chọn kế hoạch"
                )}
              </Col>
            </Row>
            <Row justify={"space-between"} style={{marginTop: 8}}>
              <Col xs={10} md={8} xl={3} lg={3}>
                Giáo án
              </Col>
              <Col xs={14} md={16} xl={21} lg={21} style={{fontWeight: 700}}>
                {fileGiaoAnId ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      modalViewFileRef.current.openModal();
                      setFileId(fileGiaoAnId);
                    }}
                  >
                    Xem giáo án
                  </Button>
                ) : (
                  "Chưa chọn giáo án"
                )}
              </Col>
            </Row>

            <Row justify={"end"} style={{marginTop: 8}}>
              <Space>
                <Upload
                  accept=".pdf"
                  previewFile={null}
                  showUploadList={false}
                  customRequest={handleChooseFile}
                >
                  <Button type="primary" icon={<Icons.file></Icons.file>}>
                    Chọn file
                  </Button>
                </Upload>
                <Button
                  type="primary"
                  onClick={() => {
                    modalGiaoAnRef?.current?.openModal();
                  }}
                >
                  Chọn giáo án
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                  Lưu lại
                </Button>
              </Space>
            </Row>
          </Spin>
          <ModalCustom title="Danh sách giáo án" ref={modalGiaoAnRef}>
            <ModalListGiaoAn
              setGiaoAnId={setGiaoAnId}
              setFileGiaoAnId={setFileGiaoAnId}
            ></ModalListGiaoAn>
          </ModalCustom>
          <ModalCustom ref={modalViewFileRef}>
            <ModalViewFile fileId={fileId}></ModalViewFile>
          </ModalCustom>
        </div>
      </div>
    </div>
  );
};
export default ModalThongQuaGiaoAnDetail;
