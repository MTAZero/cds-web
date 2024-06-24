import {Button, Col, Form, Row, Space, Spin, Typography} from "antd";
import {useAppSelector} from "hooks";
import React, {forwardRef, useEffect, useState} from "react";
import {
  APIServices,
  NotificationService,
  capitalizeFirstLetter,
  convertNumberToWords,
  convertDateStringToDateObject,
  formatDateToString,
  isValuable,
  randomId,
  isValuableString,
  toNumber,
  convertNumberDecimalToWords,
} from "utils";
import {columns, fields} from "./config";
import {InputFields, TitleCustom} from "components";
import {formatTime} from "types";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";

const Modal = forwardRef((props: any, ref) => {
  const {id, closeModal, recallTable} = props;
  const isModalOpen = useAppSelector(state => state.global.isOpenModal);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const {listVehicle, listUnit} = useAppSelector(state => state.catalog);
  const [dataTable, setDataTable] = useState<any[]>([{}]);
  const [soKhoan, setSoKhoan] = useState<any>(0);
  const [soLuong, setSoLuong] = useState<any>(0);
  const [thanhTien, setThanhTien] = useState<any>(0);
  useEffect(() => {
    if (!isValuable(id)) {
      setData(null);
      form.resetFields();
      form.setFieldValue("materials", []);
      setDataTable([{}]);
    } else {
    }
  }, [id, isModalOpen]);
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
        const res = await APIServices.LenhXe.getDetailLenhXe(id);
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
      vehicle: data?.vehicle?._id,
    };
    form.setFieldsValue(formatData);
    form.setFieldValue("materials", data?.materials);
    setData(data?.materials?.map(e => ({...e, key: randomId()})));
  };
  useEffect(() => {
    if (data) {
      setFieldsValue(data);

      setTong();
    } else {
      form.resetFields();
      form.setFieldValue("materials", []);
      setDataTable([{}]);
      setTong();
    }
  }, [data]);

  const submit = async () => {
    try {
      const formValues = await getFormValues();

      if (!formValues) {
        return;
      }
      let body = {...data, ...formValues, id: id ? id : null};
      setIsLoading(true);
      const callApi = id
        ? APIServices.LenhXe.updateLenhXe
        : APIServices.LenhXe.createLenhXe;
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
        commandDateCreated: formatDateToString(
          formValues?.commandDateCreated,
          formatTime.dayFullRevert2
        ),
        baseFromDate: formatDateToString(
          formValues?.baseFromDate,
          formatTime.dayFullRevert2
        ),
        baseToDate: formatDateToString(
          formValues?.baseToDate,
          formatTime.dayFullRevert2
        ),
        performDateTime: formatDateToString(
          formValues?.performDateTime,
          formatTime.unix
        ),
      };
    } catch (error) {
      return null;
    }
  };
  return (
    <Spin spinning={isLoading}>
      <Form form={form}>
        <TitleCustom text="Thông tin phiếu"></TitleCustom>
        <Row gutter={[8, 8]}>
          <InputFields data={fields}></InputFields>
        </Row>

        <div style={{marginTop: 12, marginBottom: 12}}>
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
        </div>
        <Space direction="vertical" style={{width: "100%"}}>
          <Row style={{width: "100%"}}>
            <Col span={2}>
              <Typography.Text strong>* Tổng cộng: </Typography.Text>
            </Col>
            <Col flex={1}>
              {" "}
              {capitalizeFirstLetter(convertNumberToWords(soKhoan, "khoản"))}
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
              {capitalizeFirstLetter(convertNumberToWords(thanhTien, "đồng"))}
            </Col>
          </Row>
        </Space>
      </Form>
      <Row justify={"end"} style={{marginTop: 8}}>
        <Space>
          <Button onClick={closeModal}>Hủy</Button>
          <Button type="primary" onClick={submit}>
            Lưu
          </Button>
        </Space>
      </Row>
    </Spin>
  );
});
export default Modal;
