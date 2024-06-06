import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {Row, Button, Space, Form} from "antd";
import "./ExpandSearch.scss";
import Icon from "assests/icons";
import {SearchOutlined} from "@ant-design/icons";
import {Store} from "antd/es/form/interface";
import {EyeWhiteSVG} from "assests/svg";
import {ButtonExcel, InputFields} from "components";

type PropsType = {
  fields: any[];
  onClickSearch?: () => void;
  handleExportExcel?: () => void;
  onReset?: () => void;
  initialValues?: Store;
  defaultFieldsValue?: {
    label: string;
    value: any;
  }[];
  isSearchExpend?: boolean;
  isResetField?: boolean;
  isSearch?: boolean;
  isExportExcel?: boolean;
  isShowDetail?: boolean;
  onFieldsChange?: (changedFields: any, allFields: any) => void;
};

const ExpandSearch = forwardRef((props: PropsType, ref) => {
  const [expand, setExpand] = useState(false);
  const {
    fields,
    onClickSearch,
    onReset,
    initialValues,
    defaultFieldsValue,
    isSearchExpend = true,
    isExportExcel,
    isShowDetail,
    isResetField = true,
    isSearch = true,
    handleExportExcel,
    onFieldsChange,
  } = props;

  const defaultFields = fields.filter(field => !field.expand);
  const expandFields = fields.filter(field => field.expand);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    getFieldsValue: () => {
      return form.getFieldsValue();
    },
    setFieldValue: (name: any, value: any) => {
      form.setFieldValue(name, value);
    },
    getFieldValue: (name: any) => {
      return form.getFieldValue(name);
    },
    resetFields: () => {
      return form.resetFields();
    },
    getValidateField: () => {
      return form.validateFields();
    },
  }));

  const handleOnReload = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    if (defaultFieldsValue) {
      defaultFieldsValue.forEach(field => {
        form.setFieldsValue({
          [field.label]: field.value,
        });
      });
    }
  }, [JSON.stringify(defaultFieldsValue)]);

  return (
    <div className="expand-search-container" style={{width: "100%"}}>
      <Space direction="vertical" style={{width: "100%"}}>
        <Form form={form} labelAlign="left" onFieldsChange={onFieldsChange}>
          <Row gutter={[16, 8]}>
            <InputFields data={defaultFields} />
            {expand ? <InputFields data={expandFields} /> : undefined}
          </Row>
        </Form>
        <Row justify={"end"}>
          <Space>
            {isSearchExpend && (
              <Button onClick={() => setExpand(!expand)} className="custom-btn">
                Tìm kiếm nâng cao
                {!expand ? <Icon.down /> : <Icon.up />}
              </Button>
            )}
            {onReset && (
              <Button
                className="btn-sub"
                icon={<Icon.reload />}
                onClick={handleOnReload}
              >
                Xoá tìm kiếm
              </Button>
            )}
            {isSearch && (
              <Button
                htmlType="submit"
                onClick={onClickSearch}
                type="primary"
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
            )}
            {isExportExcel && (
              <ButtonExcel onClick={handleExportExcel}></ButtonExcel>
            )}
            {isShowDetail && (
              <Button
                className="btn-sub"
                icon={<EyeWhiteSVG />}
                type="primary"
                onClick={onClickSearch}
              >
                Xem chi tiết
              </Button>
            )}
          </Space>
        </Row>
      </Space>
    </div>
  );
});
// })

// ({fields, onClickSearch}: PropsType) => {

export {ExpandSearch};
