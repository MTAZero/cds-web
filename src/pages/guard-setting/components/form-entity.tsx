import { ChangeEvent, FC, FormEvent, useState } from "react";
import * as styles from "./form-entity.styles";
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
import { Entity } from "./table-entitys";

type FormEntityProps = {
  entity: Entity | null;
  units: Array<{ _id: string; name: string }>;
  onSave: (entity: Entity) => void;
  onCancel: () => void;
};

export const FormEntity: FC<FormEntityProps> = ({
  entity,
  onSave,
  onCancel,
  units,
}) => {
  const [formData, setFormData] = useState({
    name: entity ? entity.name : "",
    description: entity ? entity.description : "",
    number: entity ? entity.number : 1,
    is_generate: entity ? entity.is_generate : false,
    unit: entity ? entity.unit : null,
    rate: entity ? entity.rate : 1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      _id: entity?._id,
      name: formData.name,
      description: formData.description,
      rate: formData.rate,
      unit: formData.unit,
      is_generate: formData.is_generate,
      number: parseInt(formData.number.toString()),
    });
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
        <FormControl fullWidth>
          <InputLabel>Đơn vị</InputLabel>
          <Select name="unit" value={formData.unit} onChange={handleChange}>
            {units.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <Autocomplete
          fullWidth
          // value={formData.unit}
          onChange={(event, newValue) => {
            setFormData({ ...formData, unit: newValue });
          }}
          options={units}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Unit"
              name="unit"
              onChange={handleChange}
            />
          )}
        /> */}
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
        <TextField
          fullWidth
          label="Number"
          name="number"
          type="number"
          value={formData.number}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Switch
              name="is_generate"
              checked={formData.is_generate}
              onChange={handleSwitchChange}
            />
          }
          label="Tự động sinh lịch trực"
        />
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
