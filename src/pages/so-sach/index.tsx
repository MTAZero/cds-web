import {Row} from "antd";
import {Descriptions, DescriptionsItem, TitleCustom} from "components";
import {data as dataInit} from "./config";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "hooks";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import "./style.scss";
const SoSach = prop => {
  const dispatch = useAppDispatch();
  const path = window.location.pathname;
  const [data, setData] = useState<any>(dataInit);

  const info = [
    {
      label: "Thời gian",
      value: "09:00 15/4/2024",
      span: 8,
    },
    {
      label: "Nội dung",
      value: "Huấn luyện nội bộ",
      span: 8,
    },
    {
      label: "Địa điểm",
      value: "Phòng giao ban cụm",
      span: 8,
    },
    {
      label: "Người phụ trách",
      value: "Cụm trưởng",
      span: 8,
    },
    {
      label: "Kết quả",
      value: "8",
      span: 8,
    },
  ];

  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <TitleCustom text="Thông tin huấn luyện"></TitleCustom>

          <Descriptions>
            {info?.map(e => (
              <DescriptionsItem label={e?.label} span={e?.span}>
                {e?.value}
              </DescriptionsItem>
            ))}
          </Descriptions>
        </div>
        <div className="container" style={{width: 1200}}>
          <TitleCustom text="Nội dung ghi chép"></TitleCustom>

          <CKEditor
            editor={Editor as any}
            // config={}editorConfiguration
            data={data}
            onReady={event => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor: any) => {
              const _data = editor?.getData();
              console.log(_data);
              setData(_data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
    </div>
  );
};
export default SoSach;
