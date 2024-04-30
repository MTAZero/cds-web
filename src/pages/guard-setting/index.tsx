import React, { useState } from "react";
import * as styles from "./styles";
import { Box, Button, Pagination, TablePagination } from "@mui/material";
import { Entity, TableEntity } from "./components/table-entitys";

import { data } from "./fake_data";
import { FaPlus, FaSearch } from "react-icons/fa";
import { ModalComponent, ModalConfirm } from "../../components";
import { FormEntity } from "./components/form-entity";

export const GuardSetting: React.FC = () => {
  const listEntities: Array<Entity> = data as Array<Entity>;

  const [modalConfirmRemove, setModalConfirmRemoveState] =
    useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [currentEntity, setCurrentEntity] = useState<Entity | null>(null);

  return (
    <Box sx={styles.containerStyles}>
      <Box sx={styles.controlPanelStyle}>
        <Box sx={styles.searchBoxStyle}>
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm"
            style={styles.searchTextBoxStyle}
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
        data={listEntities}
        handleEdit={(entity) => {
          setCurrentEntity(entity);
          setModalState(true);
        }}
        handleRemove={(entity) => {
          setCurrentEntity(entity);
          setModalConfirmRemoveState(true);
        }}
      />

      <Box sx={styles.paginatePanelStyle}>
        <TablePagination
          component="div"
          count={1000}
          page={1}
          onPageChange={() => {}}
          rowsPerPage={10}
          onRowsPerPageChange={() => {}}
          showFirstButton={true}
          showLastButton={true}
        />
      </Box>

      <ModalConfirm
        visible={modalConfirmRemove}
        title={"Thông báo"}
        message={"Bạn có chắc chẵn xoá không?"}
        onConfirm={() => {
          setModalConfirmRemoveState(false);
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
            setCurrentEntity(null);
            setModalState(false);
          }}
        />
      </ModalComponent>
    </Box>
  );
};
