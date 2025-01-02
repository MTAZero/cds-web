import {PlusOutlined} from "@ant-design/icons";
import {Button, Form, Popconfirm, Row, Spin, Tag} from "antd";
import {ListActionButton, ModalCustom, TableCustom} from "components";
import React, {useEffect, useRef, useState} from "react";
import {
  useDeletePlanSyllabusMutation,
  useGetListPlanSyllabusQuery,
} from "../../redux/apiRtk/planSyllabus";
import {isValuable} from "utils/check";
import {randomId} from "utils/common";
import {getDescendantTreeUnit, NotificationService} from "utils";
import {useAppSelector} from "hooks";
import {
  useGetListUnitQuery,
  useGetUnitTreeQuery,
} from "../../redux/apiRtk/unit";
import SyllabusStatus from "./syllabusStatus";
import ModalViewFile from "./modalListGiaoAn";
import ModalThongQuaGiaoAnDetail from "./detail";

const ThongQuaGiaoAn = () => {
  const [idRecord, setIdRecord] = useState();
  const tableRef = useRef<any>(null);
  const [fileId, setFileId] = useState();
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [params, setParams] = useState<any>({pageIndex: 1, pageSize: 10});
  const {
    data: dataListPlanSyllabus,
    isFetching,
    isError,
  } = useGetListPlanSyllabusQuery(params, {
    // refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const modalRef = useRef<any>(null);

  const [
    deletePlanSyllabus,
    {isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete},
  ] = useDeletePlanSyllabusMutation();
  const unitOfUser = useAppSelector(state => state.auth.info.unit);
  const {data: unitTree, isLoading: isLoadingUnitTree} =
    useGetUnitTreeQuery(unitOfUser);
  const {data: allUnit} = useGetListUnitQuery({pageSize: 50, pageIndex: 1});
  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  useEffect(() => {
    const _descendantTreeUnit = getDescendantTreeUnit(unitTree);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [unitTree]);
  const modalViewFileRef = useRef<any>(null);
  const columns: any[] = [
    {
      key: "index",
      width: 90,
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      align: "center",
      showSearch: true,
    },
    {
      title: "Ngành",
      dataIndex: "nganh",
      key: "nganh",
      align: "center",
      showSearch: true,
    },
    {
      title: "Đơn vị",
      dataIndex: "don_vi",
      key: "don_vi",
      align: "center",
      render: (value, record, index) => {
        return <>{allUnit?.items?.find(e => e?._id == value)?.name}</>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      align: "center",
      render: (value, record, index) => {
        return <SyllabusStatus status={value}></SyllabusStatus>;
      },
    },

    {
      title: "Thao tác",
      key: "actions",
      width: "120px",
      align: "center",
      render: (_, record) => (
        <ListActionButton
          editFunction={() => {
            handleOpenModal(record);
          }}
          deleteFunction={async () => {
            await deletePlanSyllabus(record?._id);
            setPage(1);
            setParams({...params, pageIndex: 1});
          }}
          viewFunction={() => {
            setFileId(record?.file);
            modalViewFileRef.current.openModal();
          }}
        >
          {/* <Popconfirm
            className="danger-confirm"
            title="Bạn muốn duyệt giáo án này?"
            onConfirm={() => {}}
          >
            <Button icon={<CheckCircleOutlined />} />
          </Popconfirm> */}
        </ListActionButton>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccessDelete) {
      NotificationService.success("Xóa dữ liệu thành công");
    }
  }, [isSuccessDelete]);

  useEffect(() => {
    if (isValuable(errorDelete)) {
      NotificationService.error("Đã có lỗi khi xóa dữ liệu");
    }
  }, [errorDelete]);

  useEffect(() => {
    if (dataListPlanSyllabus) {
      setDisplayData(
        dataListPlanSyllabus?.items?.map(el => ({
          key: randomId(),
          ...el,
        })) || []
      );
    }
  }, [dataListPlanSyllabus]);

  const setPage = pageIndex => {
    tableRef?.current?.setPage(pageIndex);
  };

  const handleOpenModal = (record: any | null) => {
    modalRef?.current?.openModal();
    setIdRecord(record?._id);
  };

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
              isLoading={isFetching}
              total={dataListPlanSyllabus?.total}
              dataSource={displayData}
              columns={columns}
              onChangePagination={(page, limit) => {
                setParams({...params, pageIndex: page, pageSize: limit});
              }}
            />
          </div>
          <ModalCustom
            width={1400}
            ref={modalRef}
            title={`${idRecord ? "Sửa thông tin" : "Thêm"}`}
          >
            <ModalThongQuaGiaoAnDetail
              descendantTreeUnit={descendantTreeUnit}
              idRecord={idRecord}
            ></ModalThongQuaGiaoAnDetail>
          </ModalCustom>
          <ModalCustom ref={modalViewFileRef}>
            <ModalViewFile fileId={fileId}></ModalViewFile>
          </ModalCustom>
        </div>
      </div>
    </div>
  );
};
export default ThongQuaGiaoAn;
