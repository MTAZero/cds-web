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
  name: string;
  description: string;
  rate: number;
  startIndex?: number;
};

type TableEntityProps = {
  data: Array<Entity>;
  handleEdit: (entity: Entity) => void;
  handleRemove: (entity: Entity) => void;
  startIndex?: number;
};

const columns = [
  {
    name: "STT",
    width: "100px",
  },
  { name: "Tên", width: "250px" },
  { name: "Mô tả", width: "full" },
  { name: "Hành động", width: "80px" },
];

export const TableEntity: React.FC<TableEntityProps> = ({
  data,
  startIndex = 0,
}) => {
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
                    {item.description}
                  </TableCell>
                  <TableCell sx={styles.cellStyle}>
                    <Box sx={styles.cellContentStyle}>
                      <Box sx={styles.buttonEditStyle}>
                        <FaEdit />
                      </Box>
                      <Box style={styles.buttonRemoveStyle}>
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
