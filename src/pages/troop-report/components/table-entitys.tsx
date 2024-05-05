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
import { FaSearch } from "react-icons/fa";

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
  handleTroopReport: (
    absentTroops: Array<{ user: string; reason: string }>
  ) => void;
  showButtonSave?: boolean;
  loadEntitys: (
    pageSize: number,
    pageIndex: number,
    textSearch: string,
    status: string,
    type: string
  ) => Promise<{
    items: Array<Entity>;
    total: number;
    size: number;
    page: number;
  }>;
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
  handleTroopReport,
  showButtonSave = false,
  loadEntitys,
}) => {
  const filterData = [
    { value: "", text: "Tất cả trạng thái" },
    ...selectTroopData,
  ];
  const filterTypes = [
    { value: "", text: "Tất cả loại" },
    { value: "SQ", text: "Sĩ quan" },
    { value: "QNCN", text: "Quân nhân CN" },
    { value: "CCQP", text: "CCQP" },
    { value: "HSQCS", text: "HSQCS" },
  ];

  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [entites, setEntites] = useState<Array<Entity>>([]);

  const startIndex = (pageIndex - 1) * pageSize;

  useEffect(() => {
    handleLoadEntitys();
  }, []);

  const _updateStatus = (id: string, status: TroopStatus) => {
    const temp = [];
    for (let index = 0; index < entites.length; index++) {
      let item = entites[index];

      if (id === item._id)
        item = {
          ...item,
          ...{
            status,
          },
        };

      temp.push(item);
    }

    setEntites(temp);
  };

  const handleLoadEntitys = async (
    _size: number = pageSize,
    _page: number = pageIndex,
    _textSearch: string = textSearch,
    _status: string = filterStatus,
    _type: string = filterType
  ) => {
    try {
      const data = await loadEntitys(_size, _page, _textSearch, _status, _type);
      if (!data) return;

      const { items, total, size, page } = data;
      setEntites(items);
      setTotal(total);
      if (page !== pageIndex) setPageIndex(page);
      if (size !== pageSize) setPageSize(size);
    } catch (ex) {
      console.log("error : ", ex);
    }
  };

  return (
    <Box sx={styles.containerStyle}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        {filterData.map((item, index) => {
          return (
            <Box
              onClick={() => {
                setFilterStatus(item.value);
                handleLoadEntitys(
                  pageSize,
                  1,
                  textSearch,
                  item.value,
                  filterType
                );
              }}
              key={index}
              sx={{
                background: item.value === filterStatus ? "#187DB8" : "#e2e2e2",
                color: item.value === filterStatus ? "white" : "black",
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        {filterTypes.map((item, index) => {
          return (
            <Box
              onClick={() => {
                setFilterType(item.value);
                handleLoadEntitys(
                  pageSize,
                  1,
                  textSearch,
                  filterStatus,
                  item.value
                );
              }}
              key={index}
              sx={{
                background: item.value === filterType ? "#187DB8" : "#e2e2e2",
                color: item.value === filterType ? "white" : "black",
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
      <Box sx={styles.controlPanelStyle}>
        <Box sx={styles.searchBoxStyle}>
          <FaSearch
            onClick={() => {
              handleLoadEntitys(pageSize, 1);
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
                handleLoadEntitys(pageSize, 1);
              }
            }}
          />
        </Box>
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
            {entites.map((item, index) => {
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
                        _updateStatus(item._id, e.target.value as TroopStatus)
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
        count={total}
        page={pageIndex - 1}
        onPageChange={(e, page: number) => {
          handleLoadEntitys(pageSize, page + 1);
        }}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e: any) => {
          handleLoadEntitys(e.target.value, 1);
        }}
        showFirstButton={true}
        showLastButton={true}
        rowsPerPageOptions={[1, 2, 5, 10, 20, 50, 100, 500]}
      />
      {showButtonSave && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              const _items = entites.map((item, i) => {
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
