import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as styles from "./table-entity.styles";
import { TroopStatus, selectTroopData } from "../../../types";
import { useEffect, useState } from "react";

export type Entity = {
  _id?: string;
  last_update?: number;
  created_date?: number;
  __v?: number;

  stt: string;
  full_name: string;
  status: string;
  type: string;
  unit_info?: {
    name: string;
  };
};

type TableEntityProps = {
  data: Array<Entity>;
  handleTroopReport: (
    absentTroops: Array<{ user: string; reason: string }>
  ) => void;
  pageSize?: number;
  pageIndex?: number;

  showButtonSave?: boolean;
};

const columns = [
  {
    name: "STT",
    width: "60px",
  },
  { name: "Họ và tên", width: "300px" },
  { name: "Loại", width: "full" },
  {
    name: "Đơn vị",
    with: "200px",
  },
  { name: "Trạng thái", width: "250px" },
];

export const TableEntity: React.FC<TableEntityProps> = ({
  data,
  pageIndex = 1,
  pageSize = 10,
  handleTroopReport,
  showButtonSave = false,
}) => {
  const startIndex = (pageIndex - 1) * pageSize;
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const filterData = [{ value: "all", text: "Tất cả" }, ...selectTroopData];

  const [currentData, setCurrentData] = useState<Array<Entity>>(data);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const updateStatus = (id: string, status: TroopStatus) => {
    const temp = [];
    for (let index = 0; index < currentData.length; index++) {
      let item = currentData[index];

      if (id === item._id)
        item = {
          ...item,
          ...{
            status,
          },
        };

      temp.push(item);
    }

    setCurrentData(temp);
  };

  return (
    <Box sx={styles.containerStyle}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {filterData.map((item, index) => {
          return (
            <Box
              onClick={() => setCurrentFilter(item.value)}
              key={index}
              sx={{
                background:
                  item.value === currentFilter ? "#187DB8" : "#e2e2e2",
                color: item.value === currentFilter ? "white" : "black",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "Inter",
                fontSize: "13px",
              }}
            >
              {item.text}
            </Box>
          );
        })}
      </Box>
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
            {currentData.map((item, index) => {
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
                    {item?.unit_info?.name}
                  </TableCell>
                  <TableCell sx={styles.cellStyle}>
                    <Select
                      size={"small"}
                      value={item.status}
                      sx={styles.selectStatusStyle}
                      onChange={(e) =>
                        updateStatus(item._id, e.target.value as TroopStatus)
                      }
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
      <TablePagination
        component="div"
        count={100}
        page={pageIndex - 1}
        onPageChange={(e, page: number) => {
          // loadEntitys(pageSize, page + 1);
        }}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e: any) => {
          // loadEntitys(e.target.value, 1);
        }}
        showFirstButton={true}
        showLastButton={true}
        rowsPerPageOptions={[1, 2, 10, 20, 50, 100, 500]}
      />
      {showButtonSave && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              const _items = currentData.map((item, i) => {
                if (item.status === TroopStatus.CoMat) return null;

                return {
                  user: item._id,
                  reason: item.status,
                };
              });

              handleTroopReport(_items.filter((i) => i));
            }}
            sx={styles.buttonSaveStyle}
          >
            Cập nhật tình hình quân số
          </Button>
        </Box>
      )}
    </Box>
  );
};
