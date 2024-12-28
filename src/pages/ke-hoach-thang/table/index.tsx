import {Button, Form, Row, Space} from "antd";
import {InputFields} from "components";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

import {fieldType, typeContentHL} from "types";
import {isValuable, NotificationService} from "utils";
import {
  useGetListPlanMonthDetailTableQuery,
  usePostPlanMonthDetailTableMutation,
  usePutPlanMonthDetailTableMutation,
} from "../../../redux/apiRtk/tablePlanMonthDetail";

const {INPUT, SELECT, INPUT_NUMBER} = fieldType;
const ModalKeHoachThangDetail = props => {
  const {id: ke_hoach_thang} = useParams();
  const {idRecord} = props;
  const [form] = Form.useForm();

  const css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 12};
  const [
    postPlanMonth,
    {isSuccess: isSuccessPost, isLoading: isLoadingPost, error: errorPost},
  ] = usePostPlanMonthDetailTableMutation();
  const [
    putPlanMonth,
    {isSuccess: isSuccessPut, isLoading: isLoadingPut, error: errorPut},
  ] = usePutPlanMonthDetailTableMutation();
  const {data: dataGet, isSuccess: isSuccessGet} =
    useGetListPlanMonthDetailTableQuery(idRecord, {
      skip: !isValuable(idRecord),
    });
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

  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return null;
    }
    const payload = {
      data: {...values, ke_hoach_thang: ke_hoach_thang, thu_tu: 1},
      id: idRecord,
    };
    // const callApi = id != "new" ? putPlanMonth : postPlanMonth;
    // callApi(payload);
    postPlanMonth(payload);
  };
  const fields = [
    {
      key: "stt",
      name: "stt",
      type: INPUT,
      label: "Số thứ tự",
      css: css,
    },

    {
      key: "noi_dung",
      name: "noi_dung",
      type: INPUT,
      label: "Nội dung",
      css: css,
    },
    {
      key: "tham_gia",
      name: "tham_gia",
      type: INPUT,
      label: "Thành phần tham gia",
      css: css,
    },
    {
      key: "cap_phu_trach",
      name: "cap_phu_trach",
      type: INPUT,
      label: "Cấp phụ trách",
      css: css,
    },
    {
      key: "tong_gio",
      name: "tong_gio",
      type: INPUT_NUMBER,
      label: "Tổng giờ",
      css: css,
    },
    {
      key: "tuan_1",
      name: "tuan_1",
      type: INPUT_NUMBER,
      label: "Tuần 1",
      css: css,
    },
    {
      key: "tuan_2",
      name: "tuan_2",
      type: INPUT_NUMBER,
      label: "Tuần 2",
      css: css,
    },
    {
      key: "tuan_3",
      name: "tuan_3",
      type: INPUT_NUMBER,
      label: "Tuần 3",
      css: css,
    },
    {
      key: "tuan_4",
      name: "tuan_4",
      type: INPUT_NUMBER,
      label: "Tuần 4",
      css: css,
    },
    {
      key: "loai_noi_dung",
      name: "loai_noi_dung",
      type: SELECT,
      label: "Loại dung",
      css: css,
      options: Object.values(typeContentHL).map(e => ({value: e, label: e})),
    },
    {
      key: "bien_phap_tien_hanh",
      name: "bien_phap_tien_hanh",
      type: INPUT,
      label: "Biện pháp tiến hành",
      css: css,
    },
  ];
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Form form={form}>
            <Row gutter={[8, 8]}>
              <InputFields data={fields}></InputFields>
            </Row>
          </Form>

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
export default ModalKeHoachThangDetail;
