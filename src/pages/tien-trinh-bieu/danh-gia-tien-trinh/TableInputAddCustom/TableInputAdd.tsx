import {Button, Table, Typography, Form, Space, Row} from "antd";
import React, {SetStateAction, useEffect, useState} from "react";
import {EditableCell, EditableRow} from "./EditTable";
import Icons from "assests/icons";
import "./TableInputAdd.scss";
import {randomId} from "utils";
import {TableCustom} from "components";

const TableInputAdd = ({
  data,
  columns,
  setData,
  disabled,
  name,
  form,
  ...rest
}: any): JSX.Element => {
  const addRowTb1 = () => {
    const newData = {
      key: randomId(),
    };

    setData([...data, newData]);
  };
  columns.some((item: any) => {
    if (item.key == "action") {
      item.title = (
        <Button
          disabled={disabled}
          type="primary"
          onClick={addRowTb1}
          icon={<Icons.add />}
          size="small"
        />
      );
      item.fixed = "right";
      item.render = (_: any, record: {key: string}, index: number) => (
        <Button
          disabled={disabled}
          type="primary"
          danger
          onClick={() => removeRowTb1(record?.key)}
          icon={<Icons.sub />}
          size="small"
        />
      );
    }
  });

  const removeRowTb1 = (key: string) => {
    const previousFormList = form.getFieldValue([name]);
    const indexRemove = data.findIndex((e: any) => e?.key == key);
    const afterFormList = previousFormList.filter(
      (e: any, index: number) => index != indexRemove
    );
    form.setFieldValue([name], afterFormList);
    const newData = data.filter((item: any) => item.key != key);
    setData([...newData]);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnsRender = columns
    .filter((e: any) => e.show == true)
    .map((col: any) => {
      return {
        ...col,
        onCell: (record: any, index: number) => ({
          ...col,
          ...col.onCell(record, index),
          record: data[index],
          dataIndex: col.dataIndex,
          title: col.title,
          options: col.options,
          onChange: col.onChange,
          index: index,
          type: col.type,
          disabled: disabled ?? col.disabled,
          value: col.value,
          name: name,
          form: form,
          rules: col.rules,
          autoFocus: col.autoFocus,
          fields: col.fields,
        }),
      };
    });
  return (
    <div className="table-input-add">
      <TableCustom
        {...rest}
        rowKey={record => record.key}
        components={components}
        rowClassName={"editable-row-2"}
        dataSource={data}
        columns={columnsRender as any}
        // pagination={false}
      />
    </div>
  );
};

export default TableInputAdd;
