import { ChangeEvent, FC, FormEvent, useState } from "react";
import * as styles from "./form-entity.styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Entity } from "./table-entitys";

type FormEntityProps = {
  entity: Entity | null;
  onSave: (entity: Entity) => void;
  onCancel: () => void;
};

export const FormEntity: FC<FormEntityProps> = ({
  entity,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: entity ? entity.name : "",
    description: entity ? entity.description : "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({ name: formData.name, description: formData.name, rate: 1 });
  };

  return (
    <Box sx={styles.containerStyle}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography sx={styles.labelStyle}>Tên</Typography>
          <TextField
            sx={styles.textInputStyle}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </Box>
        <Box>
          <Typography sx={styles.labelStyle}>Mô tả</Typography>
          <TextField
            sx={{ ...styles.textInputStyle, ...{ height: 80 } }}
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
          />
        </Box>
        <Box sx={styles.buttonPanelStyle}>
          <Button sx={styles.buttonSaveStyle} type="submit">
            Lưu
          </Button>
          <Button
            sx={styles.buttonCancelStyle}
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Huỷ
          </Button>
        </Box>
      </form>
    </Box>
  );
};
