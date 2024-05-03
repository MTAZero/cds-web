import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as styles from "./table-entity.styles";
import { FaEdit, FaTrash } from "react-icons/fa";

export type Entity = {
  _id?: string;
  last_update?: number;
  created_date?: number;
  __v?: number;

  stt: string;
  name: string;
  status: string;
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
  { name: "Mô tả", width: "full" },
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
      <TableContainer>
        <Table sx={styles.tableContainerStyle}>
          <TableHead>
            <TableRow sx={styles.headerRowStyle}>
              {columns.map((item, index) => {
                let _style = styles.headerCellStyle;

                if (item.width !== "full")
                  _style = {
                    ..._style,
                    ...{
                      width: item.width,
                    },
                  };

                return (
                  <TableCell sx={_style} key={index}>
                    {item.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              let _style = styles.rowOddStyle;
              if (index % 2 === 1) _style = styles.rowEventStyle;

              return (
                <TableRow sx={_style} key={`item-${index}`}>
                  <TableCell sx={styles.cellStyle}>
                    {index + 1 + startIndex}
                  </TableCell>
                  <TableCell sx={styles.cellStyle}>{item.name}</TableCell>
                  <TableCell sx={styles.cellStyle}>
                    {/* {item.description} */}
                  </TableCell>
                  <TableCell sx={styles.cellStyle}>
                    <Box sx={styles.cellContentStyle}>
                      <Box
                        sx={styles.buttonEditStyle}
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </Box>
                      <Box
                        style={styles.buttonRemoveStyle}
                        onClick={() => handleRemove(item)}
                      >
                        <FaTrash />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
