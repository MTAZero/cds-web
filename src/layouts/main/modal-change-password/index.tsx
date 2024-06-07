import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import * as styles from "./index.style";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { ModalComponent } from "components";
import { APIServices, NotificationService } from "utils";
// import { Entity } from "./table-entitys";

type modalChangePasswordProps = {
  visible: boolean;
  onClose: () => void;
};

export const ModalChangePassword: FC<modalChangePasswordProps> = ({
  visible,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [visible]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword)
      NotificationService.error("Xác nhận mật khẩu không chính xác");

    try {
      await APIServices.Auth.changeMyPassword(
        formData.oldPassword,
        formData.newPassword
      );

      NotificationService.success("Đổi mật khẩu thành công");
      onClose();
    } catch {
      NotificationService.error("Đổi mật khẩu thất bại");
    }

    // onSave({
    //   _id: entity?._id,
    //   name: formData.name,
    //   description: formData.description,
    //   rate: formData.rate,
    //   unit: formData.unit,
    //   is_generate: formData.is_generate,
    //   number: parseInt(formData.number.toString()),
    //   priority_display: parseInt(formData.priority_display.toString()),
    // });
  };

  return (
    <ModalComponent visible={visible} title="Đổi mật khẩu" onClose={onClose}>
      <Box sx={styles.containerStyle}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography sx={styles.labelStyle}>Mật khẩu cũ</Typography>
            <TextField
              sx={styles.textInputStyle}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="password"
            />
          </Box>
          <Box>
            <Typography sx={styles.labelStyle}>Mật khẩu mới</Typography>
            <TextField
              sx={styles.textInputStyle}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="password"
            />
          </Box>
          <Box>
            <Typography sx={styles.labelStyle}>
              Xác nhận mật khẩu mới
            </Typography>
            <TextField
              sx={styles.textInputStyle}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="password"
            />
          </Box>

          <Box sx={styles.buttonPanelStyle}>
            <Button sx={styles.buttonSaveStyle} type="submit">
              Lưu
            </Button>
            <Button
              sx={styles.buttonCancelStyle}
              onClick={onClose}
              style={{ marginLeft: "10px" }}
            >
              Huỷ
            </Button>
          </Box>
        </form>
      </Box>
    </ModalComponent>
  );
};
