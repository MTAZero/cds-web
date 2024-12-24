import {Button, Col, Form, Row, Space, Upload} from "antd";
import {InputFields} from "components";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  useGetPlanMonthQuery,
  usePostPlanMonthMutation,
  usePutPlanMonthMutation,
} from "../../../redux/apiRtk/planMonth";
import {fieldType} from "types";
import {isValuable, NotificationService} from "utils";
import Icons from "assests/icons";
const {INPUT, SELECT} = fieldType;
const GiaoAnDetail = () => {
  const {id} = useParams();
  const [form] = Form.useForm();

  const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
  const [
    postPlanMonth,
    {isSuccess: isSuccessPost, isLoading: isLoadingPost, error: errorPost},
  ] = usePostPlanMonthMutation();
  const [
    putPlanMonth,
    {isSuccess: isSuccessPut, isLoading: isLoadingPut, error: errorPut},
  ] = usePutPlanMonthMutation();
  const {data: dataGet, isSuccess: isSuccessGet} = useGetPlanMonthQuery(id, {
    skip: id == "new",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {}, [dataGet]);
  useEffect(() => {
    if (isSuccessPost) {
      NotificationService.success("Thêm dữ liệu thành công");
    }
  }, [isSuccessPost]);
  useEffect(() => {
    if (isSuccessPut) {
      NotificationService.success("Sửa dữ liệu thành công");
    }
  }, [isSuccessPut]);
  const handleChooseFile = options => {
    const file = options?.file;
    setSelectedFile(file);
  };
  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return;
    }
    const payload = {data: values, id: id};
    const callApi = id != "new" ? putPlanMonth : postPlanMonth;
    callApi(payload);
  };
  const fields = [
    {
      key: "name",
      name: "name",
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
      type: INPUT,
      label: "Thời gian bắt đầu thông qua",
      css: css,
    },
    {
      key: "thoi_gian_thong_qua",
      name: "thoi_gian_thong_qua",
      type: INPUT,
      label: "Thời gian thông qua",
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
      type: INPUT,
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
      type: INPUT,
      label: "Thời gian bắt đầu phê duyệt",
      css: css,
    },
    {
      key: "thoi_gian_ket_thuc_phe_duyet",
      name: "thoi_gian_ket_thuc_phe_duyet",
      type: INPUT,
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
      type: INPUT,
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
      type: INPUT,
      label: "Trạng thái",
      css: css,
    },
    {
      key: "don_vi",
      name: "don_vi",
      type: INPUT,
      label: "Đơn vị",
      css: css,
    },
  ];
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Row gutter={[8, 8]}>
            <InputFields data={fields}></InputFields>
            <Col>
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
            </Col>
          </Row>
          <Row justify={"end"}>
            <Space>
              <Button type="primary" onClick={handleSubmit}>
                Lưu lại
              </Button>
            </Space>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default GiaoAnDetail;
