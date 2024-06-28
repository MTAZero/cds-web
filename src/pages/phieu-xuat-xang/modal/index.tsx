import {Button, Col, Form, Row, Space, Spin, Typography} from "antd";
import {useAppSelector} from "hooks";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  APIServices,
  NotificationService,
  capitalizeFirstLetter,
  convertNumberToWords,
  convertDateStringToDateObject,
  isValuable,
  randomId,
  toNumber,
  convertNumberDecimalToWords,
} from "utils";
import {columns, fields, fields2} from "./config";
import {InputFields, TitleCustom} from "components";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
import "./style.scss";
const ModalPhieuXuatXang = forwardRef((props: any, ref) => {
  const {id, closeModal, recallTable, belongCommandID, commandNumber} = props;
  const isModalOpen = useAppSelector(state => state.global.isOpenModal);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const {listVehicle, listUnit} = useAppSelector(state => state.catalog);
  const [dataTable, setDataTable] = useState<any[]>([{}]);
  const [soKhoan, setSoKhoan] = useState<any>(0);
  const [soLuong, setSoLuong] = useState<any>(0);
  const [thanhTien, setThanhTien] = useState<any>(0);
  useImperativeHandle(ref, () => ({
    submit: () => {
      submit();
    },
  }));
  useEffect(() => {
    console.log(id);
    if (!isValuable(id)) {
    } else {
    }
  }, [id, isModalOpen]);
  useEffect(() => {
    console.log(data);
    if (data) {
      setFieldsValue(data);
      setTong();
    } else {
      form.resetFields();
      form.setFieldValue("materials", [{}]);
      setDataTable([{}]);
      setTong();
    }
  }, [data, isModalOpen]);
  useEffect(() => {
    console.log(belongCommandID);
    if (isValuable(belongCommandID)) {
      form.setFieldValue("belongCommandID", belongCommandID);
    }
    if (isValuable(commandNumber)) {
      form.setFieldValue("commandNumber", commandNumber);
    }
  }, [belongCommandID, commandNumber, isModalOpen]);
  const setTong = () => {
    const dataTable = form.getFieldValue("materials");
    console.log(dataTable);
    let _soKhoan = 0;
    let _soLuong = 0;
    let _thanhTien = 0;
    dataTable?.forEach((e, index) => {
      _soKhoan += 1;
      _soLuong += toNumber(e?.actualExport);
      _thanhTien += toNumber(e?.sumMoney);
    });
    console.log(_soLuong);

    setSoKhoan(_soKhoan);
    setSoLuong(_soLuong);
    setThanhTien(_thanhTien);
  };
  useEffect(() => {
    const getData = async id => {
      try {
        const res = await APIServices.PhieuXuatXang.getDetailPhieuXuatXang(id);

        setData(res);
      } catch (error) {}
    };
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  const setFieldsValue = data => {
    const formatData = {
      ...data,
      date: convertDateStringToDateObject(data?.date),
      expiryDate: convertDateStringToDateObject(data?.expiryDate),
    };
    form.setFieldsValue(formatData);
    form.setFieldValue("materials", data?.materials);
    setDataTable(data?.materials?.map(e => ({...e, key: randomId()})));
  };

  const submit = async () => {
    try {
      const formValues = await getFormValues();
      console.log(formValues);
      if (!formValues) {
        return;
      }
      let body = {...data, ...formValues, id: id ? id : null};
      setIsLoading(true);
      const callApi = id
        ? APIServices.PhieuXuatXang.updatePhieuXuatXang
        : APIServices.PhieuXuatXang.createPhieuXuatXang;
      await callApi(body);
      setIsLoading(false);
      NotificationService.success("Lưu thông tin thành công");
      if (recallTable) {
        recallTable();
      }

      closeModal();
    } catch (error) {
      setIsLoading(false);
      setFieldsValue(data);
      NotificationService.error(error?.response?.data ?? "Đã có lỗi");
    }
  };
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return {
        ...formValues,
        // commandDateCreated: formatDateToString(
        //   formValues?.commandDateCreated,
        //   formatTime.dayFullRevert2
        // ),
      };
    } catch (error) {
      return null;
    }
  };
  return (
    <div className="modal-phieu-xuat-xang">
      <Spin spinning={isLoading}>
        <Form form={form}>
          <div className="container">
            <TitleCustom text="Thông tin phiếu"></TitleCustom>
            <Row gutter={[8, 8]}>
              <InputFields data={fields}></InputFields>
            </Row>
          </div>

          <div className="container" style={{marginTop: 12, marginBottom: 12}}>
            <TitleCustom text="Chi tiết xăng dầu"></TitleCustom>
            <TableInputAdd
              name="materials"
              form={form}
              columns={columns}
              data={dataTable}
              setData={setDataTable}
              setTong={setTong}
              pagination={false}
            ></TableInputAdd>
            <Space direction="vertical" style={{width: "100%", marginTop: 12}}>
              <Row style={{width: "100%"}}>
                <Col span={2}>
                  <Typography.Text strong>* Tổng cộng: </Typography.Text>
                </Col>
                <Col flex={1}>
                  {capitalizeFirstLetter(
                    convertNumberToWords(soKhoan, "khoản")
                  )}
                </Col>
              </Row>
              <Row style={{width: "100%"}}>
                <Col span={2}>
                  <Typography.Text strong>* Số lượng:</Typography.Text>
                </Col>
                <Col flex={1}>
                  {capitalizeFirstLetter(
                    convertNumberDecimalToWords(soLuong, "lít/kg")
                  )}
                </Col>
              </Row>
              <Row style={{width: "100%"}}>
                <Col span={2}>
                  <Typography.Text strong>* Thành tiền: </Typography.Text>
                </Col>
                <Col flex={1}>
                  {capitalizeFirstLetter(
                    convertNumberToWords(thanhTien, "đồng")
                  )}
                </Col>
              </Row>
            </Space>
          </div>

          <div style={{marginTop: 12}} className="container">
            <TitleCustom text="Thông tin cán bộ kí"></TitleCustom>
            <Row gutter={[8, 8]}>
              <InputFields data={fields2}></InputFields>
            </Row>
          </div>
        </Form>
      </Spin>
    </div>
  );
});
export default ModalPhieuXuatXang;
