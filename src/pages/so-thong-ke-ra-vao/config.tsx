import {fieldType, formatTime} from "types";
import React from "react";
import {
  convertDateStringToDateObject,
  formatDateToString,
  randomId,
  toArray,
} from "utils";
const {COMBO_BOX, DATE} = fieldType;
const columns: any = [
  {
    key: "index",
    dataIndex: "index",
    width: 60,
  },
  {
    key: "date",
    dataIndex: "date",
    title: "Ngày",
    align: "center",
    width: 120,
    render: (value, record, index) => {
      return (
        <>
          {formatDateToString(
            convertDateStringToDateObject(value, true),
            formatTime.dayFull
          )}
        </>
      );
    },
  },
  {
    key: "pickPersonName",
    dataIndex: "pickPersonName",
    title: "Họ tên người đón",
    align: "center",
    width: 180,
  },
  {
    key: randomId(),
    dataIndex: randomId(),
    title: (
      <>
        <div>Họ tên khách</div>
        <div>Loại xe</div>
        <div>Biển số xe</div>
      </>
    ),
    render: (value, record, index) => {
      return (
        <div style={{textAlign: "center"}}>
          <div>
            {toArray(record?.guestName)?.map(e => (
              <div>{e}</div>
            ))}
          </div>
          <div>{record?.license}</div>
          <div>{record?.license}</div>
        </div>
      );
    },
    width: 180,
  },
  {
    key: randomId(),
    dataIndex: randomId(),
    title: (
      <div style={{textAlign: "center"}}>
        <div>Số CCCD/CMT</div>
        <div>Ngày cấp</div>
        <div>Nơi cấp</div>
      </div>
    ),
    render: (value, record, index) => {
      return (
        <div style={{textAlign: "center"}}>
          <div>{record?.identityNumber}</div>
          <div>
            {formatDateToString(
              convertDateStringToDateObject(record?.issued, true),
              formatTime.dayFull
            )}
          </div>
          <div>{record?.addressIssued}</div>
        </div>
      );
    },
    width: 180,
  },
  {
    key: randomId(),
    dataIndex: randomId(),
    title: "Thời gian",
    align: "center",
    children: [
      {
        key: "fromDateTime",
        dataIndex: "fromDateTime",
        title: "Vào",
        align: "center",
        render: (value, record, index) => {
          return (
            <>
              {formatDateToString(
                convertDateStringToDateObject(value, true),
                formatTime.time_24h
              )}
            </>
          );
        },
        width: 60,
      },
      {
        key: "toDateTime",
        dataIndex: "toDateTime",
        title: "Ra",
        align: "center",
        render: (value, record, index) => {
          return (
            <>
              {formatDateToString(
                convertDateStringToDateObject(value, true),
                formatTime.time_24h
              )}
            </>
          );
        },
        width: 60,
      },
    ],
  },
  {
    key: "note",
    dataIndex: "note",
    title: "Ghi chú",
    align: "center",
    width: 180,
  },
  {
    key: "action",
    dataIndex: "action",
    title: "Thao tác",
    width: 100,
    fixed: "right",
  },
];

const fields: any = [
  {
    type: COMBO_BOX,
    label: "Đơn vị",
    name: "unitId",
    allowClear: true,
  },
];

export {columns, fields};
