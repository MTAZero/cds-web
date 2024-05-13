import {fieldType, formatTime} from "types";
import "./VanKien.scss";
import dayjs from "dayjs";
import {formatDateToString} from "utils";
const {COMBO_BOX} = fieldType;
const fileInfo = record => {
  return (
    <div className="file-info">
      <div className="title">{record?.name}</div>
      <div className="time">
        {" "}
        <span className="bold">Cập nhật: </span>
        {formatDateToString(dayjs(), formatTime.dateTime)}
      </div>
    </div>
  );
};

const columns = [
  {
    key: "name",
    dataIndex: "name",
    title: "Danh sách văn kiện",
    align: "left",
    render: (v, r, i) => {
      return <div>{fileInfo(r)}</div>;
    },
  },
];
const mockData = [{ten_van_kien: "Lịch tuần cụm 13", updateAt: dayjs()}];
const fields = [
  {
    type: COMBO_BOX,
    label: "Loại lịch",
    css: {xs: 24, sm: 24, md: 24, lg: 24, xl: 24},
    options: [
      {value: 1, label: "Lịch tuần trung tâm 186"},
      {value: 2, label: "Lịch tuần Cụm 11"},
      {value: 3, label: "Lịch tuần Cụm 12"},
      {value: 4, label: "Lịch tuần Cụm 13"},
    ],
  },
];
export {columns, fields, mockData};
