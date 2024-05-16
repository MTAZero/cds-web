import {Button, Row, Spin} from "antd";
import {Descriptions, DescriptionsItem, TitleCustom} from "components";
import {data as dataInit} from "./config";
import React, {useEffect, useState} from "react";
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
const SoSach = prop => {
  const dispatch = useAppDispatch();
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
        console.log(res);
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
      const values = {
        type: "Sổ tay",
        training: id,
        note: dataEditor,
      };
      setLoading(true);
      if (data?.created) {
        await APIServices.SoSachHuanLuyen.updateSoSachOfHuanLuyen(values, id);
      } else {
        await APIServices.SoSachHuanLuyen.createSoSachOfHuanLuyen(values);
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
    <Spin spinning={loading}>
      <div className="page">
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
          <div className="container" style={{width: 1200}}>
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
                console.log(_data);
                setDataEditor(_data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
            <Row justify={"end"} style={{marginTop: 8}}>
              <Button type="primary" onClick={submit}>
                Lưu lại
              </Button>
            </Row>
          </div>
        </div>
      </div>
    </Spin>
  );
};
export default SoSach;
