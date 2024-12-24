import {fieldType, formatTime} from "types";
import "./upload.scss";
import dayjs from "dayjs";
import {formatDateToString} from "utils";
import {Button, Col, Divider, Popconfirm, Row} from "antd";
import {RecycleSVG} from "assests/svg";
const {COMBO_BOX} = fieldType;
const fileInfo = (record, onDelete) => {
  return (
    <div className="file-info">
      <div>
        <Row>
          <Col flex={1}>
            <div className="title">{record?.name}</div>
            <div className="time">
              {" "}
              <span className="bold">Cập nhật: </span>
              {formatDateToString(
                dayjs(record?.update_at),
                formatTime.dateTime
              )}
            </div>
          </Col>
          <Divider type="vertical"></Divider>
          <Col flex={"50px"}>
            <div className="center">
              <Popconfirm
                className="danger-confirm"
                title="Bạn muốn xóa tài liệu này?"
                onConfirm={onDelete}
              >
                <Button
                  type="text"
                  danger
                  icon={<RecycleSVG></RecycleSVG>}
                ></Button>
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const columns: any = [
  {
    key: "name",
    dataIndex: "name",
    title: "Danh sách tài liệu",
    align: "left",
  },
];
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
export {columns, fields, fileInfo};
