import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as styles from "./table-entity.styles";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "@mui/joy/Table";
import { data as fakeData } from "./data-sample";
import React from "react";

export type Entity = {
  _id?: string;
  name: string;
  description?: string;
  rate: number;
  unit: string;
  unit_info?: {
    name: string;
  };
  is_generate: boolean;
  number: number;
  priority_display: number;
  last_update?: number;
  created_date?: number;
  __v?: number;
};

type TableEntityProps = {
  data: Array<Entity>;
  handleEdit: (entity: Entity) => void;
  handleRemove: (entity: Entity) => void;
  pageSize?: number;
  pageIndex?: number;
};

const columns = [
  {
    name: "STT",
    width: "60px",
  },
  { name: "Tên", width: "300px" },
  { name: "Đơn vị đảm nhiệm", width: "full" },
  { name: "Số lượng", witdh: "70px" },
  { name: "Hành động", width: "100px" },
];

export const TableEntity: React.FC<TableEntityProps> = ({
  data,
  pageIndex = 1,
  pageSize = 10,
  handleRemove,
  handleEdit,
}) => {
  const startIndex = (pageIndex - 1) * pageSize;

  return (
    <Box sx={styles.containerStyle}>
      {/* <Box sx={styles.labelStyle}>
      Lịch công tác tuần 20 (13/5/2024 - 19/5/2024)
    </Box> */}
      <TableContainer>
        <Table borderAxis="both">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ ...{ width: "110px" }, ...styles.cellCenterStyle }}
              >
                Ngày
              </TableCell>
              <TableCell
                sx={{ ...{ width: "100px" }, ...styles.cellCenterStyle }}
              >
                Thời gian
              </TableCell>
              <TableCell
                sx={{ ...{ width: "500px" }, ...styles.cellCenterStyle }}
              >
                Nội dung công việc
              </TableCell>
              <TableCell
                sx={{ ...{ width: "100px" }, ...styles.cellCenterStyle }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeData.map((day) => (
              <React.Fragment key={day.title}>
                <TableRow>
                  <TableCell
                    align="center"
                    rowSpan={day.calendars.length ? day.calendars.length : 1}
                  >
                    {day.title}
                  </TableCell>
                  <TableCell align="center">{day.calendars[0]?.time}</TableCell>
                  <TableCell align="center">{day.calendars[0]?.name}</TableCell>
                  <TableCell align="center">
                    <Box sx={styles.cellContentStyle}>
                      <Box
                        sx={styles.buttonEditStyle}
                        // onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </Box>
                      <Box
                        style={styles.buttonRemoveStyle}
                        // onClick={() => handleRemove(item)}
                      >
                        <FaTrash />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                {day.calendars.slice(1).map((item) => (
                  <TableRow key={item.time}>
                    <TableCell align="center">{item.time}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <Box sx={styles.cellContentStyle}>
                        <Box
                          sx={styles.buttonEditStyle}
                          // onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </Box>
                        <Box
                          style={styles.buttonRemoveStyle}
                          // onClick={() => handleRemove(item)}
                        >
                          <FaTrash />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
