import {
  Box,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as styles from "./table-entity.styles";
import { TroopStatus, selectTroopData } from "../../../types";

export type Entity = {
  _id?: string;
  last_update?: number;
  created_date?: number;
  __v?: number;

  stt: string;
  full_name: string;
  status: string;
  type: string;
};

type TableEntityProps = {
  data: Array<Entity>;
  handleUpdateStatus: (id: string, status: TroopStatus) => void;
  pageSize?: number;
  pageIndex?: number;
};

const columns = [
  {
    name: "STT",
    width: "60px",
  },
  { name: "Họ và tên", width: "300px" },
  { name: "Loại", width: "full" },
  { name: "Trạng thái", width: "250px" },
];

export const TableEntity: React.FC<TableEntityProps> = ({
  data,
  pageIndex = 1,
  pageSize = 10,
  handleUpdateStatus,
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
                  <TableCell sx={styles.cellStyle}>{item.full_name}</TableCell>
                  <TableCell sx={styles.cellStyle}>{item.type}</TableCell>
                  <TableCell sx={styles.cellStyle}>
                    <Select
                      size={"small"}
                      value={item.status}
                      sx={styles.selectStatusStyle}
                    >
                      {selectTroopData.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.value}>
                            {item.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
