import {Button, Form, Row, Space, Spin} from "antd";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import Icon from "assests/icons";
import {
  useGetPlanMonthQuery,
  usePostPlanMonthMutation,
  usePutPlanMonthMutation,
} from "../../../redux/apiRtk/planMonth";
import {fieldType, typeContentHL} from "types";
import {
  getDescendantTreeUnit,
  isValuable,
  NotificationService,
  toArray,
} from "utils";
import {
  useDeletePlanMonthDetailTableMutation,
  useGetListPlanMonthDetailTableQuery,
} from "../../../redux/apiRtk/tablePlanMonthDetail";
import {
  InputFields,
  ListActionButton,
  ModalCustom,
  TableCustom,
} from "components";
import ModalKeHoachThangDetail from "../table";
import {useAppSelector} from "hooks";
import {RootState} from "../../../redux/store";

const {INPUT, TREE_SELECT} = fieldType;
const KeHoachThangDetail = props => {
  const {unitTree} = useAppSelector(state => state.catalog);
  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  const {id: keHoachThangId} = useParams();
  const [form] = Form.useForm();
  const [idRecord, setIdRecord] = useState();
  const [nhiemVu, setNhiemVu] = useState<any>();
  const [yeuCau, setYeuCau] = useState<any>();
  const [baoDamThucHien, setBaoDamThucHien] = useState<any>();
  const [toChucThucHien, setToChucThucHien] = useState<any>();
  const ref = useRef<any>(null);
  const [
    postPlanMonth,
    {isSuccess: isSuccessPost, isLoading: isLoadingPost, error: errorPost},
  ] = usePostPlanMonthMutation();
  const [
    putPlanMonth,
    {isSuccess: isSuccessPut, isLoading: isLoadingPut, error: errorPut},
  ] = usePutPlanMonthMutation();
  const [
    deletePlanMonthDetailTable,
    {
      isSuccess: isSuccessDeletePlanMonthDetailTable,
      isLoading: isLoadingDeletePlanMonthDetailTable,
      error: errorDeletePlanMonthDetailTable,
    },
  ] = useDeletePlanMonthDetailTableMutation();
  const {data: dataPlanMonth, isSuccess: isSuccessPlanMonth} =
    useGetPlanMonthQuery(keHoachThangId);
  const {
    data: dataTable,
    isSuccess: isSuccessDataTable,
    isFetching: isFetchingTable,
  } = useGetListPlanMonthDetailTableQuery({ke_hoach_thang: keHoachThangId});
  useEffect(() => {
    const _descendantTreeUnit = getDescendantTreeUnit(unitTree);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [unitTree]);
  const getFormValues = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const formValues = {
      ...dataPlanMonth,
      name: dataPlanMonth?.name,
      unit: dataPlanMonth?.unit?._id,
    };
    console.log(formValues);
    form.setFieldsValue(formValues);
    console.log(form.getFieldsValue());
  }, [dataPlanMonth]);
  useEffect(() => {
    if (isSuccessPost) {
      NotificationService.success("Thêm dữ liệu thành công");
    }
  }, [isSuccessPost]);
  useEffect(() => {
    if (isSuccessPut) {
      NotificationService.success("Sửa dữ liệu thành công");
    }
  }, [isSuccessPut]);
  useEffect(() => {
    if (isSuccessDeletePlanMonthDetailTable) {
      NotificationService.success("Xóa dữ liệu thành công");
    }
  }, [isSuccessDeletePlanMonthDetailTable]);

  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return;
    }
    console.log(values);
    const payload = {
      data: {
        ...values,
        nhiem_vu: nhiemVu,
        yeu_cau: yeuCau,
        bao_dam_thuc_hien: baoDamThucHien,
        to_chuc_thuc_hien: toChucThucHien,
      },
      id: keHoachThangId,
    };
    putPlanMonth(payload);
  };
  const columns = [
    {
      key: "index",
      dataIndex: "index",
    },
    {
      key: "noi_dung",
      dataIndex: "noi_dung",
      title: "Nội dung",
      align: "center",
      render: (value, record, index) => {
        console.log();
        return (
          <>
            {record?.stt} {value}
          </>
        );
      },
    },
    {
      key: "tham_gia",
      dataIndex: "tham_gia",
      title: "Thành phần tham gia",
      align: "center",
    },
    {
      key: "cap_phu_trach",
      dataIndex: "cap_phu_trach",
      title: "Cấp phụ trách",
      align: "center",
    },
    {
      key: "tong_gio",
      dataIndex: "tong_gio",
      title: "Tổng giờ",
      align: "center",
    },
    {
      key: "action",
      title: "Thao tác",
      dataIndex: "action",
      align: "center",
      render: (value, record, index) => {
        return (
          <ListActionButton
            deleteFunction={() => {
              deletePlanMonthDetailTable(record?._id);
            }}
            editFunction={() => {
              handleOpenModal(record?._id);
            }}
          ></ListActionButton>
        );
      },
    },
  ];
  const handleOpenModal = id => {
    setIdRecord(id);
    ref.current.openModal();
  };
  const data: any[] = [
    {
      type: INPUT,
      label: "Tên",
      col: 1,
      name: "name",
      rules: [{required: true, message: "Bắt buộc nhập!"}],
    },
    {
      type: TREE_SELECT,
      label: "Đơn vị",
      col: 1,
      name: "unit",
      rules: [{required: true, message: "Bắt buộc nhập!"}],
      treeData: descendantTreeUnit,
    },
  ];
  return (
    <div className="page">
      <div className="main">
        <div className="">
          <Spin spinning={isLoadingPost || isLoadingPut}>
            <div className="container">
              <Form form={form}>
                <Row gutter={[16, 8]} className="content-modal">
                  <InputFields data={data} />
                </Row>
              </Form>
            </div>
            <div className="container">
              <div>Nhiệm vụ</div>
              <CKEditor
                editor={Editor as any}
                data={dataPlanMonth?.nhiem_vu}
                onReady={event => {}}
                onChange={(event, editor: any) => {
                  const _data = editor?.getData();
                  setNhiemVu(_data);
                }}
              />
            </div>
            <div className="container">
              <div>Yêu cầu</div>
              <CKEditor
                editor={Editor as any}
                data={dataPlanMonth?.yeu_cau}
                onReady={event => {}}
                onChange={(event, editor: any) => {
                  const _data = editor?.getData();
                  setYeuCau(_data);
                }}
              />
            </div>
            <div className="container">
              <div>Bảo đảm thực hiện</div>
              <CKEditor
                editor={Editor as any}
                data={dataPlanMonth?.bao_dam_thuc_hien}
                onReady={event => {}}
                onChange={(event, editor: any) => {
                  const _data = editor?.getData();
                  setBaoDamThucHien(_data);
                }}
              />
            </div>
            <div className="container">
              <div>Tổ chức thực hiện</div>
              <CKEditor
                editor={Editor as any}
                data={dataPlanMonth?.to_chuc_thuc_hien}
                onChange={(event, editor: any) => {
                  const _data = editor?.getData();
                  setToChucThucHien(_data);
                }}
              />
            </div>

            <div style={{marginBottom: 8, marginTop: 8}} className="container">
              <Row justify={"end"} style={{marginTop: 8, marginBottom: 8}}>
                <Button
                  type="primary"
                  onClick={() => {
                    ref.current.openModal();
                  }}
                  icon={<Icon.add></Icon.add>}
                >
                  Thêm hàng
                </Button>
              </Row>
              <TableCustom
                isLoading={isFetchingTable}
                dataSource={toArray(dataTable?.items)}
                columns={columns}
                pagination={false}
              ></TableCustom>
            </div>

            <ModalCustom ref={ref} title="" onOpenModal={() => {}}>
              <ModalKeHoachThangDetail
                idRecord={idRecord}
              ></ModalKeHoachThangDetail>
            </ModalCustom>

            <Row justify={"end"} className="container">
              <Space>
                <Button type="primary" onClick={handleSubmit}>
                  Lưu lại
                </Button>
              </Space>
            </Row>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default KeHoachThangDetail;
