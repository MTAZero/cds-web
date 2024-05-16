import {Button, Col, Divider, Form, Row, Space, Spin, Upload} from "antd";
import {InputFields, TitleCustom} from "components";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "hooks";

import {fields2 as fields2Init, fields1, columns} from "./config";
import dayjs from "dayjs";
import {
  APIServices,
  NotificationService,
  convertDateStringToDateObject,
  formatDateToString,
  getItemLocalStorage,
  parseJson,
  randomId,
  setItemLocalStorage,
  toArray,
  toNumber,
} from "utils";
import TableInputAdd from "./TableInputAddCustom/TableInputAdd";
import {formatTime} from "types";
import Icons from "assests/icons";
import {RecycleSVG} from "assests/svg";
import {setListPosition} from "../../../redux/catalog/catalog.slice";
const DetailTienTrinh = props => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [fields2, setFields2] = useState(fields2Init);
  const [dataTime, setDataTime] = useState<any>([{object: null, time: null}]);
  const nameObjectLocal = "tienTrinhBieuDetail";
  const [listUnit, setListUnit] = useState<any[]>();

  useEffect(() => {
    const getTienTrinhBieuById = async id => {
      try {
        setSpinning(true);
        const res = await APIServices.TienTrinhBieu.getDetailTienTrinhBieu(id);
        console.log(res);
        setData(res);
        setSpinning(false);
      } catch (error) {
        setSpinning(false);
        NotificationService.error(
          "Đã có lỗi khi lấy thông tin tiến trình biểu"
        );
      }
    };
    if (id != "tao-moi") {
      getTienTrinhBieuById(id);
    }
  }, [id]);
  useEffect(() => {
    const getListPosition = async () => {
      try {
        const res = await APIServices.QuanTri.getListPosition({
          pageIndex: 1,
          pageSize: 20,
        });
        dispatch(setListPosition(res?.items));
      } catch (error) {
        dispatch(setListPosition([]));
      }
    };
    getListPosition();
  }, []);

  useEffect(() => {
    const getListUnit = async () => {
      try {
        const res = await APIServices.QuanTri.getListUnit({
          pageIndex: 1,
          pageSize: 40,
        });
        setListUnit(res?.items);
      } catch (error) {
        setListUnit([]);
      }
    };
    getListUnit();
  }, []);

  useEffect(() => {
    const setOptionsDonVi = async listUnit => {
      fields2.find((e: {name: string}) => e?.name === "unit").options =
        listUnit?.map((e: {_id: any; name: any}) => ({
          value: e?._id,
          label: e?.name,
        }));

      setFields2([...fields2]);
    };
    setOptionsDonVi(listUnit);
  }, [listUnit]);

  useEffect(() => {
    const setFieldsValue = data => {
      const formatData = {
        ...data,
        year: convertDateStringToDateObject(data?.year?.toString()),
        date: convertDateStringToDateObject(data?.date),
        from_date: convertDateStringToDateObject(data?.from_date),
        to_date: convertDateStringToDateObject(data?.to_date),
        time_train_detail: data?.time_train_detail?.map(e => ({
          ...e,
          key: randomId(),
          time: convertThoiGianHLToDateArray(e?.time),
        })),
      };
      console.log(formatData);
      form.setFieldsValue(formatData);
      setDataTime(
        toArray(data?.time_train_detail).map(e => ({...e, key: randomId()}))
      );
    };
    setFieldsValue(data);
  }, [data]);
  const convertThoiGianHLToDateArray = time_train_detail => {
    const timeRangeString = time_train_detail?.[0]?.split("-");
    const timeStartString =
      "01/01/1970 " + timeRangeString?.[0].replace(".", ":");
    const timeEndString =
      "01/01/1970 " + timeRangeString?.[1].replace(".", ":");
    console.log(timeStartString);
    const timeRangeDate = [
      convertDateStringToDateObject(timeStartString),
      convertDateStringToDateObject(timeEndString),
    ];
    console.log(timeRangeDate);
    return timeRangeDate;
  };
  const convertDateArrayToThoiGianHL = dateArray => {
    const timeStart = formatDateToString(dateArray?.[0], formatTime.time_24h);
    const timeEnd = formatDateToString(dateArray?.[1], formatTime.time_24h);
    const thoiGianHL = [`${timeStart}-${timeEnd}`];
    return thoiGianHL;
  };
  const submit = async () => {
    try {
      setLoading(true);
      const formValues = await form.validateFields();
      console.log(formValues);
      let callApi =
        id == "tao-moi"
          ? APIServices.TienTrinhBieu.createTienTrinhBieu
          : APIServices.TienTrinhBieu.updateTienTrinhBieu;
      let data = {
        ...formValues,
        year: toNumber(formatDateToString(formValues?.year, formatTime.year)),
        date: formatDateToString(formValues?.date, formatTime.dayFullRevert),
        from_date: formatDateToString(
          formValues?.from_date,
          formatTime.dayFullRevert
        ),
        to_date: formatDateToString(
          formValues?.to_date,
          formatTime.dayFullRevert
        ),
        time_train_detail: formValues?.time_train_detail?.map(e => ({
          ...e,
          time: convertDateArrayToThoiGianHL(e?.time),
        })),
      };
      if (id != "tao-moi") {
        data = {...data, _id: id};
      }
      await callApi(data);
      setLoading(false);
      NotificationService.success(
        `Đã ${id == "tao-moi" ? "tạo mới" : "cập nhật"} tiến trình biểu`
      );
    } catch (error) {
      setLoading(false);
      if (!error?.errorFields?.length) {
        NotificationService.error(
          error?.response?.data?.message ?? "Lưu tiến trình biểu lỗi"
        );
      }
    }
  };

  const saveLocal = () => {
    const searchFields = form.getFieldsValue();
    const valuesLocal = {
      ...searchFields,
      year: formatDateToString(searchFields?.year, null),
      from_date: formatDateToString(searchFields?.from_date, null),
      to_date: formatDateToString(searchFields?.to_date, null),
    };
    setItemLocalStorage(nameObjectLocal, valuesLocal);
  };
  const setFieldThu = () => {
    const date = form.getFieldValue("date");
    const dateOfWeek = dayjs(date).day() + 1;
    const textThu = dateOfWeek == 1 ? "Chủ nhật" : `Thứ ${dateOfWeek}`;
    form.setFieldValue("day_of_week", date ? textThu : null);
  };
  const onFieldsChange = (changedFields, allFields) => {
    saveLocal();
    setFieldThu();
  };
  useEffect(() => {
    const setDefaultValues = () => {
      let tienTrinhBieuDetailLocal = getItemLocalStorage(nameObjectLocal);
      form.setFieldValue(
        "year",
        tienTrinhBieuDetailLocal?.year
          ? convertDateStringToDateObject(tienTrinhBieuDetailLocal?.year)
          : dayjs()
      );
      form.setFieldValue(
        "month",
        tienTrinhBieuDetailLocal?.thang ?? dayjs().month() + 1
      );
      form.setFieldValue("week", tienTrinhBieuDetailLocal?.tuan ?? 1);
      console.log(
        convertDateStringToDateObject(tienTrinhBieuDetailLocal?.from_date)
      );
      form.setFieldValue(
        "from_date",
        tienTrinhBieuDetailLocal?.from_date
          ? convertDateStringToDateObject(tienTrinhBieuDetailLocal?.from_date)
          : dayjs()
      );
      form.setFieldValue(
        "to_date",
        tienTrinhBieuDetailLocal?.to_date
          ? convertDateStringToDateObject(tienTrinhBieuDetailLocal?.to_date)
          : dayjs()
      );
    };
    setDefaultValues();
  }, []);

  const handleChooseFile = options => {
    const file = options?.file;
    setSelectedFile(file);
    // if (file.size <= 5000000) {
    //   setSelectedFile(file);
    // } else {
    //   Notification("warning", "Kích thước file vượt quá giới hạn (2MB)");
    // }
  };
  const uploadFile = () => {};
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Spin spinning={spinning}>
            <Form form={form} onFieldsChange={onFieldsChange}>
              <Divider></Divider>
              <TitleCustom text="Thời gian tiến trình biểu"></TitleCustom>
              <Row gutter={[4, 4]}>
                <InputFields data={fields1}></InputFields>
              </Row>
              <Divider></Divider>
              <TitleCustom text="Thông tin nội dung huấn luyện"></TitleCustom>
              <Row gutter={[8, 8]}>
                <InputFields data={fields2}></InputFields>
              </Row>
              <Divider></Divider>
              {/* <TitleCustom text="Tải giáo án"></TitleCustom>
              <Row justify={"start"} style={{marginTop: 4}}>
                <Space split={<Divider></Divider>}>
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
                      Chọn giáo án
                    </Button>
                  </Upload>
                  {selectedFile && (
                    <Space>
                      <div> {selectedFile?.name}</div>

                      <Button
                        icon={<RecycleSVG></RecycleSVG>}
                        onClick={() => {
                          setSelectedFile(null);
                        }}
                      ></Button>

                      <Button
                        onClick={uploadFile}
                        type="primary"
                        icon={<Icons.upload></Icons.upload>}
                      >
                        Tải lên
                      </Button>
                    </Space>
                  )}
                </Space>
              </Row> */}
              <Divider></Divider>
              <TitleCustom text="Thời gian nội dung huấn luyện"></TitleCustom>

              {/* <Col span={10}>
                <Row gutter={[8, 8]}>
                  <InputFields data={fields3}></InputFields>
                </Row>
              </Col> */}
              <Row>
                <Col>
                  <TableInputAdd
                    data={dataTime}
                    setData={setDataTime}
                    name="time_train_detail"
                    form={form}
                    columns={columns}
                    pagination={false}
                  ></TableInputAdd>
                </Col>
              </Row>
            </Form>
            <Row justify={"end"}>
              <Button type="primary" onClick={submit} loading={loading}>
                Lưu lại
              </Button>
            </Row>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default DetailTienTrinh;
