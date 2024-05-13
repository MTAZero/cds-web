import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import * as styles from "./index.style";
import React from "react";
import { data, temp } from "../unit-calendar/data-sample";

import Table from "@mui/joy/Table";

export const UserCalendarPage = () => {
  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.labelStyle}>
        Lịch công tác tuần 20 (13/5/2024 - 19/5/2024)
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
            {temp.map((day) => (
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
