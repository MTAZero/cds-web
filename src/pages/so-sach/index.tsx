import {Button, Row, Space, Spin} from "antd";
import {Descriptions, DescriptionsItem, TitleCustom} from "components";
import {data as dataInit} from "./config";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "hooks";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import "./style.scss";
import {useParams} from "react-router-dom";
import {
  APIServices,
  NotificationService,
  formatDateToString,
  isValuable,
} from "utils";
import {formatTime} from "types";
import ReactToPrint from "react-to-print";
import Print from "./print/Print";
const SoSach = prop => {
  const printRef = useRef<any>(null);
  const path = window.location.pathname;
  const [dataEditor, setDataEditor] = useState<any>();
  const {id} = useParams();
  const info: any = [
    {
      label: "Thời gian",
      span: 8,
      name: "date",
    },
    {
      label: "Nội dung",
      span: 8,
      name: "content",
    },
    {
      label: "Địa điểm",
      span: 8,
      name: "location",
    },

    {
      label: "Đơn vị phụ trách",
      span: 8,
      name: "unit_charge",
    },
    {
      label: "Vật chất",
      span: 8,
      name: "guaranteed_material",
    },
  ];
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async id => {
      try {
        setLoading(true);
        const res = await APIServices.SoSachHuanLuyen.getSoSachOfHuanLuyen(id);
        setData(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setData(null);
      }
    };
    if (isValuable(id)) {
      getData(id);
    }
  }, [id]);
  const submit = async () => {
    try {
      const valuesCreate = {
        type: "Sổ tay",
        training: id,
        note: dataEditor,
      };
      const valuesUpdate = {note: dataEditor};
      setLoading(true);
      if (data?.created) {
        await APIServices.SoSachHuanLuyen.updateSoSachOfHuanLuyen(
          valuesUpdate,
          data?._id
        );
      } else {
        await APIServices.SoSachHuanLuyen.createSoSachOfHuanLuyen(valuesCreate);
      }
      setLoading(false);
      NotificationService.success("Lưu thông tin thành công");
    } catch (error) {
      setLoading(false);
      NotificationService.error("Đã có lỗi");
    }
  };
  useEffect(() => {}, [data]);
  return (
    <div className="page so-sach-ca-nhan">
      <Spin spinning={loading}>
        <div className="main">
          <div className="container">
            <TitleCustom text="Thông tin huấn luyện"></TitleCustom>

            <Descriptions>
              {info?.map(e => (
                <DescriptionsItem label={e?.label} span={e?.span}>
                  {e?.name == "date"
                    ? formatDateToString(data?.[e?.name], formatTime.dateTime)
                    : data?.[e?.name]}
                </DescriptionsItem>
              ))}
            </Descriptions>
          </div>
          <div className="container">
            <TitleCustom text="Nội dung ghi chép"></TitleCustom>

            <CKEditor
              editor={Editor as any}
              // config={}editorConfiguration
              data={data?.note}
              onReady={event => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor: any) => {
                const _data = editor?.getData();
                setDataEditor(_data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
            <Row justify={"end"} style={{marginTop: 8}}>
              <Space>
                {" "}
                <ReactToPrint
                  documentTitle={` `}
                  trigger={() => {
                    return (
                      <Button style={{marginBottom: 4}} type="primary">
                        Xuất file
                      </Button>
                    );
                  }}
                  content={() => printRef.current}
                  bodyClass="print-so-sach-ca-nhan"
                />
                <Button type="primary" onClick={submit}>
                  Lưu lại
                </Button>
              </Space>
            </Row>
          </div>
        </div>
      </Spin>
      {/*  */}
      <div id="print" style={{display: "none"}}>
        <div ref={printRef}>
          <Print data={data}></Print>
        </div>
      </div>
    </div>
  );
};
export default SoSach;
