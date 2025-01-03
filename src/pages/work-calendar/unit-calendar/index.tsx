import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Table from "@mui/joy/Table";

import * as styles from "./index.style";
import { data } from "./data-sample";
import React from "react";

export const UnitCalendarPage = () => {
  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.labelStyle}>
        Lịch công tác tuần 35 (16/9/2024 - 22/9/2024)
      </Box>
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
              <TableCell sx={styles.cellCenterStyle}>Thành phần</TableCell>
              <TableCell sx={styles.cellCenterStyle}>Địa điểm</TableCell>
              <TableCell sx={styles.cellCenterStyle}>Chủ trì</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((day) => (
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
                    {day.calendars[0]?.assign}
                  </TableCell>
                  <TableCell align="center">
                    {day.calendars[0]?.location}
                  </TableCell>
                  <TableCell align="center">{day.calendars[0]?.lear}</TableCell>
                </TableRow>
                {day.calendars.slice(1).map((item) => (
                  <TableRow key={item.time}>
                    <TableCell align="center">{item.time}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.assign}</TableCell>
                    <TableCell align="center">{item.location}</TableCell>
                    <TableCell align="center">{item.lear}</TableCell>
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
