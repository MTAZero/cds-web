import {Button, Divider, Form, Row, Space, Spin, Tree} from "antd";
import {InputFields, ListActionButton, TitleCustom} from "components";
import React, {useEffect, useState} from "react";
import {
  APIServices,
  NotificationService,
  isValuable,
  randomId,
  toArray,
} from "utils";
import {fields as fieldsInit} from "./config";
import Icons from "assests/icons";
const Modal = props => {
  const {id, getList, closeModal} = props;
  const [data, setData] = useState();
  const [listDescendantsChild, setListDescendantsChild] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [listUnit, setListUnit] = useState();
  const [fields, setFields] = useState<any>(fieldsInit);
  const [treeData, setTreeData] = useState<any>();
  useEffect(() => {
    const getListUnit = async () => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getListUnit({
          pageSize: 100,
          pageIndex: 1,
        });
        setListUnit(res?.items);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getListUnit();
  }, []);
  useEffect(() => {
    const setOptionsDonVi = async listUnit => {
      fields.find((e: {name: string}) => e?.name === "parent").options =
        listUnit?.map((e: {_id: any; name: any}) => ({
          value: e?._id,
          label: e?.name,
          key: randomId(),
        }));
      setFields([...fieldsInit]);
    };
    setOptionsDonVi(listUnit);
  }, [listUnit]);
  useEffect(() => {
    const setDisabledFields = () => {
      fields.find(e => e?.name === "parent").disabled = isValuable(id);
    };
    setDisabledFields();
  }, [id]);
  useEffect(() => {
    const getDetailUnit = async id => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getDetailUnit(id);
        setData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isValuable(id)) {
      getDetailUnit(id);
    } else {
      setData(null);
    }
  }, [id]);
  useEffect(() => {
    const getListDescendantsUnit = async id => {
      try {
        setIsLoading(true);
        const res = await APIServices.QuanTri.getListDescendantsUnit(id);
        console.log(res);
        setListDescendantsChild(res);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isValuable(id)) {
      getListDescendantsUnit(id);
    } else {
      setListDescendantsChild(null);
    }
  }, [id]);
  useEffect(() => {
    const pushChildrenOfUnit = unit => {
      const data = unit?.childs?.map(e => ({
        title: e?.name,
        key: randomId(),
        children: pushChildrenOfUnit(e),
      }));
      return data;
    };
    const formatListDescendantsChild = listDescendantsChild => {
      const _treeData = pushChildrenOfUnit(listDescendantsChild);
      setTreeData(_treeData);
    };
    formatListDescendantsChild(listDescendantsChild);
  }, [listDescendantsChild]);
  const submit = async () => {
    try {
      let values = await getFormValues();
      if (!values) {
        return;
      }
      if (id) {
        values = {
          name: values?.name,
          description: values?.description,
          id: id,
        };
      }
      const apiFunc = id
        ? APIServices.QuanTri.updateUnit
        : APIServices.QuanTri.createUnit;
      setIsLoading(true);
      const res = await apiFunc(values, id);

      setIsLoading(false);
      getList();
      NotificationService.success("Lưu thông tin thành công");
      closeModal();
    } catch (error) {
      NotificationService.error(
        error?.response?.data?.message ?? "Lưu thông tin lỗi"
      );
      setIsLoading(false);
    }
  };
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data]);
  return (
    <Spin spinning={isLoading}>
      <div>
        <Form form={form}>
          <Row gutter={[8, 8]}>
            <InputFields data={fields}></InputFields>
          </Row>
        </Form>
        {toArray(listDescendantsChild?.childs)?.length > 0 && (
          <div>
            <Divider></Divider>
            <TitleCustom text="Các đơn vị trực thuộc"></TitleCustom>
            <div>
              <Tree
                showLine
                switcherIcon={<Icons.down />}
                treeData={treeData}
              ></Tree>
            </div>
          </div>
        )}

        <Row justify={"end"} style={{marginTop: 8}}>
          <Space>
            {" "}
            <Button onClick={closeModal}>Hủy</Button>
            <Button onClick={submit} type="primary">
              Lưu
            </Button>
          </Space>
        </Row>
      </div>
    </Spin>
  );
};
export default Modal;
