import {Button, Col, Form, Row, Space, Spin, Upload} from "antd";
import {InputFields, ModalCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {
  useGetSyllabusQuery,
  usePostSyllabusMutation,
  usePutSyllabusMutation,
} from "../../../redux/apiRtk/syllabus";
import {fieldType, formatTime, syllabusStatus} from "types";
import {
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
  NotificationService,
} from "utils";
import Icons from "assests/icons";
import {usePostFileMutation} from "../../../redux/apiRtk/uploadFile";
import ModalViewFile from "../modalViewFile";
const {INPUT, TREE_SELECT, DATE, SELECT} = fieldType;
const ModalGiaoAnDetail = props => {
  const {idGiaoAn, descendantTreeUnit, setPage} = props;
  const [form] = Form.useForm();
  const modalRef = useRef<any>();
  const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
  const [
    postSyllabus,
    {isSuccess: isSuccessPost, isLoading: isLoadingPost, error: errorPost},
  ] = usePostSyllabusMutation();
  const [
    putSyllabus,
    {isSuccess: isSuccessPut, isLoading: isLoadingPut, error: errorPut},
  ] = usePutSyllabusMutation();
  const {data: dataGet, isSuccess: isSuccessGet} = useGetSyllabusQuery(
    idGiaoAn,
    {
      skip: !isValuable(idGiaoAn),
    }
  );
  const [postFile, {isSuccess: isSuccessUpload, data: dataUpload}] =
    usePostFileMutation();
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
    const formatValues = {
      ...dataGet,
      thoi_gian_bat_dau_thong_qua: convertDateStringToDateObject(
        dataGet?.thoi_gian_bat_dau_thong_qua
      ),

      thoi_gian_ket_thuc_thong_qua: convertDateStringToDateObject(
        dataGet?.thoi_gian_ket_thuc_thong_qua
      ),
      thoi_gian_bat_dau_phe_duyet: convertDateStringToDateObject(
        dataGet?.thoi_gian_bat_dau_phe_duyet
      ),
      thoi_gian_ket_thuc_phe_duyet: convertDateStringToDateObject(
        dataGet?.thoi_gian_ket_thuc_phe_duyet
      ),
      thoi_gian_hoan_thanh_cong_tac_chuan_bi: convertDateStringToDateObject(
        dataGet?.thoi_gian_hoan_thanh_cong_tac_chuan_bi
      ),
    };
    form.setFieldsValue(formatValues);
    setSelectedFile(dataGet?.file);
  }, [dataGet]);
  useEffect(() => {
    if (isSuccessPost) {
      NotificationService.success("Thêm dữ liệu thành công");
      setPage(1);
    }
  }, [isSuccessPost]);
  useEffect(() => {
    if (isSuccessPut) {
      NotificationService.success("Sửa dữ liệu thành công");
    }
  }, [isSuccessPut]);
  // useEffect(() => {
  //   if (isSuccessUpload) {
  //     NotificationService.success("Sửa dữ liệu thành công");
  //   }
  // }, [isSuccessUpload]);
  useEffect(() => {
    if (dataUpload) {
      setSelectedFile(dataUpload?._id);
    }
  }, [dataUpload]);

  const handleChooseFile = options => {
    const file = options?.file;
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append("name", form.getFieldValue("ten"));
    formData.append("unit", form.getFieldValue("don_vi"));
    formData.append("type", "14");
    postFile(formData);
  };
  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return;
    }
    const payload = {
      data: {
        ...values,
        thoi_gian_bat_dau_thong_qua: formatDateToString(
          dataGet?.thoi_gian_bat_dau_thong_qua
        ),

        thoi_gian_ket_thuc_thong_qua: formatDateToString(
          dataGet?.thoi_gian_ket_thuc_thong_qua
        ),
        thoi_gian_bat_dau_phe_duyet: formatDateToString(
          dataGet?.thoi_gian_bat_dau_phe_duyet
        ),
        thoi_gian_ket_thuc_phe_duyet: formatDateToString(
          dataGet?.thoi_gian_ket_thuc_phe_duyet
        ),
        thoi_gian_hoan_thanh_cong_tac_chuan_bi: formatDateToString(
          dataGet?.thoi_gian_hoan_thanh_cong_tac_chuan_bi
        ),
        file: selectedFile,
      },
      id: idGiaoAn,
    };
    const callApi = isValuable(idGiaoAn) ? putSyllabus : postSyllabus;
    callApi(payload);
  };
  const fields = [
    {
      key: "ten",
      name: "ten",
      type: INPUT,
      label: "Tên",
      css: css,
    },
    {
      key: "nguoi_xay_dung",
      name: "nguoi_xay_dung",
      type: INPUT,
      label: "Người xây dựng",
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
      key: "thoi_gian_bat_dau_thong_qua",
      name: "thoi_gian_bat_dau_thong_qua",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian bắt đầu thông qua",
      css: css,
    },

    {
      key: "dia_diem_thong_qua",
      name: "dia_diem_thong_qua",
      type: INPUT,
      label: "Địa điểm thông qua",
      css: css,
    },
    {
      key: "thoi_gian_ket_thuc_thong_qua",
      name: "thoi_gian_ket_thuc_thong_qua",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian kết thúc thông qua",
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
    },
    {
      key: "thoi_gian_ket_thuc_phe_duyet",
      name: "thoi_gian_ket_thuc_phe_duyet",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian kết thúc phê duyệt",
      css: css,
    },
    {
      key: "noi_dung_phe_duyet",
      name: "noi_dung_phe_duyet",
      type: INPUT,
      label: "Nội dung phê duyệt",
      css: css,
    },
    {
      key: "ket_luan_phe_duyet",
      name: "ket_luan_phe_duyet",
      type: INPUT,
      label: "Nội dung phê duyệt",
      css: css,
    },
    {
      key: "nguoi_phe_duyet",
      name: "nguoi_phe_duyet",
      type: INPUT,
      label: "Người phê duyệt",
      css: css,
    },
    {
      key: "muc_dich",
      name: "muc_dich",
      type: INPUT,
      label: "Mục đích",
      css: css,
    },
    {
      key: "yeu_cau",
      name: "yeu_cau",
      type: INPUT,
      label: "Yêu cầu",
      css: css,
    },
    {
      key: "thoi_gian_hoan_thanh_cong_tac_chuan_bi",
      name: "thoi_gian_hoan_thanh_cong_tac_chuan_bi",
      type: DATE,
      optionsTime: {format: formatTime.dateTime},
      label: "Thời gian hoàn thành công tác chuẩn bị",
      css: css,
    },
    {
      key: "thoi_gian_len_lop_ly_thuyet",
      name: "thoi_gian_len_lop_ly_thuyet",
      type: INPUT,
      label: "Thời gian lên lớp lý thuyết",
      css: css,
    },
    {
      key: "thoi_gian_len_lop_thuc_hanh",
      name: "thoi_gian_len_lop_thuc_hanh",
      type: INPUT,
      label: "Thời gian lên lớp thực hành",
      css: css,
    },
    {
      key: "kiem_tra",
      name: "kiem_tra",
      type: INPUT,
      label: "Kiểm tra",
      css: css,
    },
    {
      key: "tong_thoi_gian_len_lop",
      name: "tong_thoi_gian_len_lop",
      type: INPUT,
      label: "Tổng thời gian lên lớp",
      css: css,
    },
    {
      key: "trang_thai",
      name: "trang_thai",
      type: SELECT,
      options: Object.values(syllabusStatus).map(e => ({value: e, label: e})),
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
                Giáo án
              </Col>
              <Col xs={14} md={16} xl={21} lg={21} style={{fontWeight: 700}}>
                {selectedFile ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      modalRef.current.openModal();
                    }}
                  >
                    Xem giáo án
                  </Button>
                ) : (
                  "Chưa chọn tài liệu"
                )}
              </Col>
            </Row>
            <Row justify={"end"}>
              <Space>
                <Upload
                  accept=".pdf"
                  previewFile={null}
                  showUploadList={false}
                  customRequest={handleChooseFile}
                >
                  <Button
                    type="primary"
                    className="btn-sub"
                    icon={<Icons.file></Icons.file>}
                  >
                    Chọn tài liệu
                  </Button>
                </Upload>
                <Button type="primary" onClick={handleSubmit}>
                  Lưu lại
                </Button>
              </Space>
              <ModalCustom ref={modalRef}>
                <ModalViewFile fileId={selectedFile}></ModalViewFile>
              </ModalCustom>
            </Row>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default ModalGiaoAnDetail;
