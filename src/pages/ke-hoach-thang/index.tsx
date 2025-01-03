import {PlusOutlined} from "@ant-design/icons";
import {Button, Form, Row, Spin} from "antd";
import {ListActionButton, ModalCustom, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {
  useDeletePlanMonthMutation,
  useGetListPlanMonthQuery,
  usePostPlanMonthMutation,
  usePutPlanMonthMutation,
} from "../../redux/apiRtk/planMonth";
import {isValuable} from "utils/check";
import {exportFile, randomId} from "utils/common";
import {getDescendantTreeUnit, NotificationService} from "utils";
import {useNavigate} from "react-router-dom";
import {RouterLink} from "routers/routers";
import ModalEdit from "./ModalEdit/ModalEdit";
import {useAppSelector} from "hooks";
import {
  useGetListUnitQuery,
  useGetUnitTreeQuery,
} from "../../redux/apiRtk/unit";
import {useLazyGetReportQuery} from "../../redux/apiRtk/tablePlanMonthDetail";

const KeHoachThang = () => {
  const [record, setRecord] = useState<any>();
  const tableRef = useRef<any>(null);
  const [titleReport, setTitleReport] = useState();
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [params, setParams] = useState<any>({pageIndex: 1, pageSize: 10});
  const {
    data: dataPlanMonth,
    isFetching: isFetchingPlanMonth,
    isError,
  } = useGetListPlanMonthQuery(params, {
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [
    postPlanMonth,
    {isSuccess: isSuccessPost, isLoading: isLoadingPost, error: errorPost},
  ] = usePostPlanMonthMutation();
  const [
    getReport,
    {
      data: dataReport,
      isSuccess: isSuccessGetReport,
      isLoading: isLoadingGetReport,
      error: errorGetReport,
    },
  ] = useLazyGetReportQuery();
  const [
    putPlanMonth,
    {isSuccess: isSuccessPut, isLoading: isLoadingPut, error: errorPut},
  ] = usePutPlanMonthMutation();
  const modalRef = useRef<any>(null);
  const [form] = Form.useForm();

  const [
    deletePlanMonth,
    {isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete},
  ] = useDeletePlanMonthMutation();
  const unitOfUser = useAppSelector(state => state.auth.info.unit);
  const {data: unitTree, isLoading: isLoadingUnitTree} =
    useGetUnitTreeQuery(unitOfUser);
  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  const {data: allUnit} = useGetListUnitQuery({pageSize: 20, pageIndex: 1});
  useEffect(() => {
    const _descendantTreeUnit = getDescendantTreeUnit(unitTree);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [unitTree]);
  const navigate = useNavigate();
  const columns: any[] = [
    {
      key: "index",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
      showSearch: true,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      align: "center",
      render: (value, record, index) => {
        return <>{allUnit?.items?.find(e => e?._id == value)?.name}</>;
      },
    },

    {
      title: "Thao tác",
      key: "actions",
      width: "120px",
      align: "center",
      render: (_, record) => (
        <ListActionButton
          // editFunction={() => {
          //   handleOpenModal(record);
          // }}
          deleteFunction={async () => {
            await deletePlanMonth(record?._id);
            setPage(1);
            setParams({...params, pageIndex: 1});
          }}
          editFunction={() => {
            navigate(RouterLink.PLAN_MONTH_DETAIL.replace(":id", record?._id));
          }}
          downloadFunction={() => {
            setTitleReport(record?.name);
            getReport(record?._id);
          }}
        ></ListActionButton>
      ),
    },
  ];
  useEffect(() => {
    exportFile(dataReport, `${titleReport ?? "Bao_cao_thang"}`);
  }, [dataReport]);
  useEffect(() => {
    if (isSuccessDelete) {
      NotificationService.success("Xóa dữ liệu thành công");
    }
  }, [isSuccessDelete]);
  useEffect(() => {
    if (isSuccessGetReport) {
      NotificationService.success("Đã xuất báo cáo");
    }
  }, [isSuccessGetReport]);

  useEffect(() => {
    if (isValuable(errorDelete)) {
      NotificationService.error("Đã có lỗi khi xóa dữ liệu");
    }
  }, [errorDelete]);

  useEffect(() => {
    if (dataPlanMonth) {
      setDisplayData(
        dataPlanMonth?.items?.map(el => ({
          key: randomId(),
          ...el,
        })) || []
      );
    }
  }, [dataPlanMonth]);

  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };
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
  const handleOpenModal = (record: any | null) => {
    modalRef?.current?.openModal();
    setRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
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
  const handleSubmit = async () => {
    const values = await getFormValues();
    if (!values) {
      return;
    }
    const payload = {data: values, id: record?._id};
    const callApi = record ? putPlanMonth : postPlanMonth;
    await callApi(payload);
  };
  useEffect(() => {
    console.log(isFetchingPlanMonth);
  }, [isFetchingPlanMonth]);
  return (
    <div className="page">
      <div className="main">
        <div className="container">
          <Row justify={"end"} style={{marginBottom: 8}}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => handleOpenModal(null)}
            >
              Thêm mới
            </Button>
          </Row>
          <div className="">
            <TableCustom
              ref={tableRef}
              isLoading={isFetchingPlanMonth}
              total={dataPlanMonth?.total}
              dataSource={displayData}
              columns={columns}
              onChangePagination={(page, limit) => {
                setParams({...params, pageIndex: page, pageSize: limit});
              }}
            />
          </div>
          <Spin spinning={isLoadingPost || isLoadingPut}>
            <ModalCustom
              width={1000}
              ref={modalRef}
              title={`${record?._id ? "Sửa thông tin" : "Thêm"}`}
              onOk={handleSubmit}
            >
              <Form form={form}>
                <ModalEdit
                  record={record}
                  descendantTreeUnit={descendantTreeUnit}
                />
              </Form>
            </ModalCustom>
          </Spin>
        </div>
      </div>
    </div>
  );
};
export default KeHoachThang;
