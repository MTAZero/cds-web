import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
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
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { MAX_ENTITY_REQUEST } from "const";
import { APIServices } from "utils";
import { SimpleTreeView } from "@mui/x-tree-view";
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeUserItem } from "./tree-user-item";
import { FaSearch } from "react-icons/fa";

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
    assignUsers: [],
    location: entity?.location ? entity.location : "",
    lead: entity?.lead ? entity.lead : "",
    time_start: entity?.time_start ? entity.time_start : new Date().getTime(),
    time_end: entity?.time_start ? entity.time_start : new Date().getTime(),
  });

  const [selectUser, setSelectUser] = useState<any>([]);
  const [dataUsers, setDataUsers] = useState<Array<any>>(null);
  const [textSearch, setTextSearch] = useState<string>("");
  const [assignUsers, setAssignUsers] = useState<Array<any>>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getIdsOfTree = (data) => {
    let ans = [];
    ans.push(data._id);
    if (data?.users && data?.users.length) {
      for (let index = 0; index < data.users?.length; index++)
        ans.push(data.users[index]._id);
    }

    for (let index = 0; index < data?.childs.length; index++)
      ans = [...ans, ...getIdsOfTree(data?.childs[index])];

    return ans;
  };

  const loadUserAssignData = async () => {
    try {
      const data = await APIServices.WorlCalendar.findUserFromTree(textSearch);
      setDataUsers(data);
      const allNodeIds = getIdsOfTree(data);
      setSelectUser(allNodeIds);
    } catch {}
  };

  useEffect(() => {
    loadUserAssignData();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      _id: entity?._id,
      name: formData.name,
      location: formData.location,
      lead: formData.lead,
      time_start: formData.time_start,
      time_end: formData.time_end,
      assigns: assignUsers,
    });
  };

  return (
    <Box sx={styles.containerStyle}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Box sx={styles.formPanelStyle}>
          <Box sx={styles.leftColumnStyle}>
            <Box sx={styles.rowInfoStyle}>
              <Typography sx={styles.labelStyle}>Nội dung công việc</Typography>
              <TextField
                sx={{ ...styles.textInputStyle, ...{ height: "80px" } }}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                multiline
                margin="normal"
              />
            </Box>
            <Box sx={styles.rowInfoStyle}>
              <Typography sx={styles.labelStyle}>Chủ trì</Typography>
              <TextField
                sx={styles.textInputStyle}
                name="lead"
                value={formData.lead}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Box sx={{ ...styles.rowInfoStyle, ...{ flex: 1 } }}>
                <Typography sx={styles.labelStyle}>Bắt đầu</Typography>
                <DateTimePicker
                  name="start_time"
                  sx={{
                    marginBottom: 1,
                    width: "100%",
                  }}
                />
              </Box>
              <Box sx={{ ...styles.rowInfoStyle, ...{ flex: 1 } }}>
                <Typography sx={styles.labelStyle}>Kết thúc</Typography>
                <DateTimePicker
                  name="end_time"
                  sx={{
                    marginBottom: 1,
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography sx={styles.labelStyle}>Thành phần</Typography>
              <Box sx={styles.listUserSelectStyle}>
                {assignUsers?.map((user, i) => {
                  return (
                    <Box sx={styles.selectUserStyle} key={`user-${i}`}>
                      {user?.rank ? user?.rank + " " : ""}
                      {user?.full_name}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box sx={styles.rightColumnStyle}>
            <Typography sx={styles.labelStyle}>Thành phần</Typography>
            <Box sx={styles.searchBoxStyle}>
              <FaSearch
                onClick={() => {
                  loadUserAssignData();
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
                    loadUserAssignData();
                  }
                }}
              />
            </Box>
            <SimpleTreeView
              expandedItems={selectUser}
              onExpandedItemsChange={(e, ids) => setSelectUser(ids)}
            >
              {dataUsers && (
                <TreeUserItem
                  onCheckUpdate={(item, value: boolean) => {
                    if (value) {
                      const it = assignUsers.find((i) => i._id === item?._id);
                      if (it) return;
                      setAssignUsers([...assignUsers, item]);
                    } else {
                      const temp = assignUsers.filter(
                        (i) => i._id !== item._id
                      );
                      setAssignUsers(temp);
                    }
                  }}
                  item={dataUsers}
                  assignUsers={assignUsers}
                />
              )}
            </SimpleTreeView>
          </Box>
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
