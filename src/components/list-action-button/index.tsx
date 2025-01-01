import {Button, Popconfirm, Row, Space, Tooltip} from "antd";
import React from "react";
import Icon from "assests/icons";

import {
  ExcelSVG,
  SaveIconSVG,
  RecycleSVG,
  PrinterSVG,
  PenSVG,
  EyeSVG,
} from "assests/svg";
import {CheckCircleOutlined, DownloadOutlined} from "@ant-design/icons";
import {isValuable} from "utils";

type Props = {
  addFunction?: any;
  deleteFunction?: any;
  printFunction?: any;
  editFunction?: any;
  viewFunction?: any;
  saveFunction?: any;
  reportFunction?: any;
  downloadFunction?: any;
  checkFunction?: any;
  children?: any;
  toolTipSave?: any;
  toolTips?: any;
};

const ListActionButton: React.FC<Props> = ({
  addFunction,
  deleteFunction,
  printFunction,
  editFunction,
  viewFunction,
  downloadFunction,
  saveFunction,
  reportFunction,
  checkFunction,
  children,
  toolTips,
}) => {
  return (
    <Space style={{}} size="small">
      {addFunction !== undefined ? (
        <Tooltip title={toolTips.add}>
          <Button
            style={{position: "relative"}}
            onClick={addFunction}
            icon={<Icon.add></Icon.add>}
            type="primary"
          ></Button>
        </Tooltip>
      ) : (
        <></>
      )}
      {printFunction !== undefined ? (
        <Tooltip title={toolTips.print}>
          <Button
            onClick={printFunction}
            icon={<Icon.printer />}
            type="primary"
          />
        </Tooltip>
      ) : (
        <></>
      )}
      {editFunction !== undefined ? (
        <Tooltip title={toolTips?.edit}>
          <Button onClick={editFunction} icon={<Icon.edit />} type="primary" />
        </Tooltip>
      ) : (
        <></>
      )}
      {viewFunction !== undefined ? (
        <Tooltip title={toolTips?.view}>
          <Button onClick={viewFunction} icon={<Icon.eye />} type="primary" />
        </Tooltip>
      ) : (
        <></>
      )}
      {downloadFunction !== undefined ? (
        <Button
          onClick={downloadFunction}
          icon={<Icon.download />}
          type="primary"
        />
      ) : (
        <></>
      )}
      {deleteFunction !== undefined ? (
        <Popconfirm
          className="danger-confirm"
          title="Bạn muốn xóa?"
          onConfirm={deleteFunction}
        >
          <Button icon={<Icon.remove />} type="primary" danger />
        </Popconfirm>
      ) : (
        <></>
      )}
      {saveFunction !== undefined ? (
        <Tooltip title={toolTips?.save}>
          <Button
            onClick={saveFunction}
            icon={<Icon.save></Icon.save>}
            type="primary"
          ></Button>
        </Tooltip>
      ) : (
        <></>
      )}
      {reportFunction !== undefined ? (
        <Button onClick={reportFunction} icon={<ExcelSVG></ExcelSVG>}></Button>
      ) : (
        <></>
      )}
      {isValuable(checkFunction) && (
        <Tooltip title={toolTips?.check}>
          <Button
            onClick={checkFunction}
            icon={<Icon.checkFilled></Icon.checkFilled>}
            type="primary"
          ></Button>
        </Tooltip>
      )}
      {children}
    </Space>
  );
};

export {ListActionButton};
