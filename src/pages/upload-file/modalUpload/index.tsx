import {Button, Col, Form, Row, Space, Spin, Upload} from "antd";
import Icons from "assests/icons";
import {InputFields} from "components";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {fieldType} from "types";
import {APIServices, NotificationService} from "utils";
const ModalUpload = forwardRef((props: any, ref) => {
  const {getListFile, closeModal} = props;
  const [loading, setLoading] = useState(false);
  useImperativeHandle(ref, () => ({
    resetFields: () => {
      form.resetFields();
      setSelectedFile(null);
    },
  }));
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const fields = [
    {
      type: fieldType.INPUT,
      name: "name",
      css: {xs: 24, sm: 24, md: 24, lg: 24, xl: 24},
      label: "Tiêu đề",
      rules: [{required: true, message: "Chưa nhập tiêu đề"}],
    },
  ];
  const handleChooseFile = options => {
    const file = options?.file;
    setSelectedFile(file);
  };
  const uploadFile = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (!selectedFile) {
        throw {message: "no file"};
      }
      const formData = new FormData();
      formData.append("file", selectedFile as Blob);
      formData.append("name", values?.name);
      formData.append("type", "Văn kiện");
      await APIServices.VanKien.uploadVanKien(formData);
      NotificationService.success("Đã tải file thành công!");
      setLoading(false);
      getListFile();
      closeModal();
    } catch (error) {
      setLoading(false);
      if (error?.errorFields) {
        return;
      }
      // if (error?.message == "no file") {
      //   Notification("warning", "Chưa chọn file");
      // } else {
      //   Notification("error", "Đã có lỗi khi upload file");
      // }
    }
  };
  return (
    <Spin spinning={loading}>
      <Space direction="vertical" size={"large"} style={{width: "100%"}}>
        <Form form={form}>
          <Row gutter={[4, 4]}>
            <InputFields data={fields}></InputFields>
          </Row>
        </Form>

        <Row justify={"space-between"}>
          {/* <Col xs={10} md={8} xl={6} lg={8}>
            Người đăng
          </Col> */}
          <Col xs={14} md={16} xl={18} lg={16} style={{fontWeight: 700}}></Col>
        </Row>
        <Row justify={"space-between"}>
          <Col xs={10} md={8} xl={6} lg={8}>
            File đã chọn
          </Col>
          <Col xs={14} md={16} xl={18} lg={16} style={{fontWeight: 700}}>
            {selectedFile?.name ?? "Chưa chọn file"}
          </Col>
        </Row>
        <Row justify={"end"} style={{marginTop: 4}}>
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
                Chọn file
              </Button>
            </Upload>

            <Button
              onClick={uploadFile}
              type="primary"
              icon={<Icons.upload></Icons.upload>}
            >
              Tải lên
            </Button>
          </Space>
        </Row>
      </Space>
    </Spin>
  );
});
export default ModalUpload;
