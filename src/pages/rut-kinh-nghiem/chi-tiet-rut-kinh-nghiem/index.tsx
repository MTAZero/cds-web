import {Button, Col, Divider, Form, Row, Space, Spin, Upload} from "antd";
import {InputFields, TitleCustom} from "components";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {fields1} from "./config";
import dayjs from "dayjs";
import {useAppDispatch} from "hooks";
import {APIServices} from "utils";

const DetailRutKinhNghiem = props => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [listUnit, setListUnit] = useState<any[]>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const saveButton = () => {
    return (
      <Button type="primary" loading={loading}>
        Lưu lại
      </Button>
    );
  };

  const uploadFile = () => {};
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Spin spinning={spinning}>
            <Form form={form}>
              <Divider></Divider>
              <TitleCustom text="Rút kinh nghiệm công tác huấn luyện"></TitleCustom>
              <Row gutter={[4, 4]}>
                <InputFields data={fields1}></InputFields>
              </Row>
            </Form>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default DetailRutKinhNghiem;
