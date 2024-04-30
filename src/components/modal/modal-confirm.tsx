import { Box, Button, Grow, Modal } from "@mui/material";
import React from "react";

import * as styles from "./modal-confirm.styles";
import { FaTimes } from "react-icons/fa";

type ModalConfirmProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  okText?: string;
  cancelText?: string;
};

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  onClose,
  okText = "Xác nhận",
  cancelText = "Huỷ",
}) => {
  return (
    <Modal open={visible} onClose={onClose} style={styles.modalStyle}>
      <Grow in={visible}>
        <Box sx={styles.containerStyle}>
          <Box sx={styles.topModalStyle}>
            <Box sx={styles.titleStyle}>{title}</Box>
            <FaTimes onClick={onClose} style={{ cursor: "pointer" }} />
          </Box>
          <Box sx={styles.contentStyle}>{message}</Box>
          <Box sx={styles.buttonPanelStyle}>
            <Button onClick={onConfirm} sx={styles.buttonOKStyle}>
              {okText}
            </Button>
            <Button onClick={onCancel} sx={styles.buttonCancelStyle}>
              {cancelText}
            </Button>
          </Box>
        </Box>
      </Grow>
    </Modal>
  );
};
