import React, { useEffect, useState } from "react";
import * as styles from "./styles";
import { Box, Button, TablePagination } from "@mui/material";
import { Entity, TableEntity } from "./components/table-entitys";

import { FaPlus, FaSearch } from "react-icons/fa";
import { ModalComponent, ModalConfirm } from "../../components";
import { FormEntity } from "./components/form-entity";
import { APIServices, NotificationService } from "../../utils";

export const GuardSetting: React.FC = () => {
  const [modalConfirmRemove, setModalConfirmRemoveState] =
    useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [currentEntity, setCurrentEntity] = useState<Entity | null>(null);

  const [entites, setEntites] = useState<Array<Entity>>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [textSearch, setTextSearch] = useState<string>("");

  const loadEntitys = async (
    _size: number = pageSize,
    _page: number = pageIndex
  ) => {
    try {
      const req = await APIServices.GuardDutty.getListEntity(
        _page,
        _size,
        textSearch
      );
      const { data } = req;
      const { items, total, size, page } = data;

      setEntites(items);
      setTotal(total);
      if (page !== pageIndex) setPageIndex(page);
      if (size !== pageSize) setPageSize(size);
    } catch (ex) {
      console.log("error : ", ex);
    }
  };

  useEffect(() => {
    loadEntitys();
  }, []);

  const handleSaveEntity = async (entity: Entity) => {
    if (entity) {
      try {
        if (entity._id)
          await APIServices.GuardDutty.updateEntity(entity._id, entity);
        else await APIServices.GuardDutty.insertEntity(entity);

        loadEntitys();

        NotificationService.success("Lưu thông tin thành công");
      } catch {
        NotificationService.error("Lưu thông tin thất bại");
      }
    }
  };

  const handleRemoveEntity = async (entity: Entity) => {
    if (entity._id) {
      try {
        await APIServices.GuardDutty.removeEntity(entity._id);
        loadEntitys();

        NotificationService.success("Xoá thành công");
      } catch (ex) {
        NotificationService.error("Xoá thất bại");
      }
    }
  };

  return (
    <Box sx={styles.containerStyles}>
      <Box sx={styles.controlPanelStyle}>
        <Box sx={styles.searchBoxStyle}>
          <FaSearch
            onClick={() => {
              loadEntitys();
            }}
          />
          <input
            type="text"
            placeholder="Tìm kiếm"
            style={styles.searchTextBoxStyle}
            value={textSearch}
            onChange={(e) => {
              setTextSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadEntitys();
              }
            }}
          />
        </Box>
        <Button
          sx={styles.buttonAddStyle}
          onClick={() => {
            setCurrentEntity(null);
            setModalState(true);
          }}
        >
          <FaPlus />
          Thêm vị trí trực
        </Button>
      </Box>

      <TableEntity
        data={entites}
        handleEdit={(entity) => {
          setCurrentEntity(entity);
          setModalState(true);
        }}
        handleRemove={(entity) => {
          setCurrentEntity(entity);
          setModalConfirmRemoveState(true);
        }}
        pageSize={pageSize}
        pageIndex={pageIndex}
      />

      <Box sx={styles.paginatePanelStyle}>
        <TablePagination
          component="div"
          count={total}
          page={pageIndex - 1}
          onPageChange={(e, page: number) => {
            loadEntitys(pageSize, page + 1);
          }}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e: any) => {
            loadEntitys(e.target.value, 1);
          }}
          showFirstButton={true}
          showLastButton={true}
          rowsPerPageOptions={[1, 2, 10, 20, 50, 100, 500]}
        />
      </Box>

      <ModalConfirm
        visible={modalConfirmRemove}
        title={"Thông báo"}
        message={"Bạn có chắc chẵn xoá không?"}
        onConfirm={() => {
          setModalConfirmRemoveState(false);
          if (currentEntity) handleRemoveEntity(currentEntity);
        }}
        onClose={() => {
          setModalConfirmRemoveState(false);
        }}
        onCancel={() => {
          setModalConfirmRemoveState(false);
        }}
      />

      <ModalComponent
        visible={modalState}
        title={"Chi tiết vị trí trực"}
        onClose={() => {
          setModalState(false);
        }}
      >
        <FormEntity
          entity={currentEntity}
          onCancel={() => {
            setCurrentEntity(null);
            setModalState(false);
          }}
          onSave={(entity: Entity) => {
            handleSaveEntity(entity);
            setCurrentEntity(null);
            setModalState(false);
          }}
        />
      </ModalComponent>
    </Box>
  );
};
