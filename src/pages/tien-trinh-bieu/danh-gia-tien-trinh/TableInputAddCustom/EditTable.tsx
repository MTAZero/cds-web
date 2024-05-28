import {AutoComplete, DatePicker, Form, Input, InputNumber, Select} from "antd";
import {FormInstance} from "antd/lib/form/Form";
import React, {useEffect, useRef, useState} from "react";
import type {InputRef} from "antd";
import dayjs from "dayjs";

import {Rule} from "antd/es/form";
import {fieldType, formatTime} from "types";
import {useAppSelector} from "hooks";
type EditableRowProps = {
  index: number;
};
const {INPUT, NUMBER, DATE, AUTO_COMPLETE, COMBO_BOX} = fieldType;
export type EditableCellProps = {
  title: React.ReactNode;
  editable?: boolean;
  children: React.ReactNode;
  dataIndex: any;
  record: any;
  selected: boolean;
  options: any;
  name: string;
  index: number;
  type: fieldType;
  disabled?: boolean;
  value?: any;
  onChange?: (e) => void;
  handleSave: (record, index) => void;
  onFocus?: () => void;
  onPressEnter?: (e) => void;
  addonAfter?: any;
  rules?: Rule[];
  hidden?: boolean;
  autoFocus?: boolean;
  form?: any;
};

export const EditableContext = React.createContext<FormInstance<any> | null>(
  null
);
export const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
  return (
    <>
      <tr {...props} />
    </>
  );
};

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  selected,
  options,
  handleSave,
  name,
  index,
  type,
  onChange,
  onPressEnter,
  disabled,
  value,
  hidden,
  form,
  autoFocus,
  rules,
  ...restProps
}) => {
  const listPosition = useAppSelector(state => state.catalog.listPosition);
  const [newOptions, setNewOptions] = useState(options);
  const [max, setMax] = useState(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const setFieldValue = (dataIndex: string, value: any) => {
    form?.setFieldValue([name, index, dataIndex], value);
  };
  const getFieldValue = (dataIndex: string) => {
    return form?.getFieldValue([name, index, dataIndex]);
  };

  let childNode = children;
  if (type == INPUT) {
    childNode = (
      <Form.Item
        name={[name, index, dataIndex]}
        initialValue={getFieldValue(dataIndex) ?? null}
        rules={rules}
      >
        <Input
          placeholder={disabled ? "--" : "Nhập"}
          disabled={disabled}
          onClick={() => {}}
          onChange={async e => {}}
        ></Input>
      </Form.Item>
    );
  }
  if (type == DATE) {
    childNode = (
      <Form.Item name={[name, index, dataIndex]} initialValue={null}>
        <DatePicker
          disabled={disabled}
          onChange={() => {}}
          format={formatTime.dayFull.toString()}
        ></DatePicker>
      </Form.Item>
    );
  }
  if (type == NUMBER) {
    childNode = (
      <Form.Item
        name={[name, index, dataIndex]}
        initialValue={getFieldValue(dataIndex) ?? null}
        rules={rules}
      >
        <InputNumber
          disabled={disabled}
          onChange={e => {}}
          onClick={e => {}}
          placeholder={disabled ? "--" : "Nhập"}
          max={max}
          min={0}
          controls={false}
          {...restProps}
        ></InputNumber>
      </Form.Item>
    );
  }
  if (type == AUTO_COMPLETE) {
    childNode = (
      <Form.Item
        name={[name, index, dataIndex]}
        initialValue={getFieldValue(dataIndex) ?? null}
        rules={rules}
      >
        <AutoComplete
          showSearch
          autoFocus={autoFocus}
          allowClear
          placeholder={disabled ? "--" : "Chọn"}
          notFoundContent={null}
          value={value}
          defaultActiveFirstOption={false}
          filterOption={(inputValue, option) =>
            option?.label
              .toString()
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          open={openDropdown}
          onFocus={() => {
            setOpenDropdown(true);
          }}
          onBlur={() => {
            setOpenDropdown(false);
          }}
          onSelect={() => {
            setOpenDropdown(false);
          }}
          onClick={e => {
            if (openDropdown == false) {
              setOpenDropdown(true);
            }
          }}
          options={newOptions}
          disabled={disabled}
          onClear={() => {}}
          onChange={async e => {}}
          {...restProps}
        ></AutoComplete>
      </Form.Item>
    );
  }
  if (type == COMBO_BOX) {
    childNode = (
      <Form.Item
        style={{margin: 0}}
        name={[name, index, dataIndex]}
        initialValue={getFieldValue(dataIndex) ?? null}
      >
        <Select
          showSearch
          style={{
            width: "100%",
          }}
          filterOption={(input, option) =>
            (option?.label.toString().toLowerCase() ?? "").includes(
              input.toLowerCase()
            )
          }
          open={openDropdown}
          onFocus={() => {
            setOpenDropdown(true);
          }}
          onBlur={() => {
            setOpenDropdown(false);
          }}
          onSelect={() => {
            setOpenDropdown(false);
          }}
          onClick={e => {
            if (openDropdown == false) {
              setOpenDropdown(true);
            }
          }}
          onChange={e => {}}
          placeholder={disabled ? "--" : "Chọn"}
          options={newOptions}
          disabled={disabled}
          allowClear={true}
          {...restProps}
        />
      </Form.Item>
    );
  }
  // console.log(listPosition);
  // if (
  //   listPosition.some(position => position?._id === record?.full_name) &&
  //   dataIndex == "result"
  // ) {
  //   childNode = null;
  // }

  return (
    <td
      {...restProps}
      style={{
        // fontWeight: `${list_doi_tuong?.includes(childNode?.[1]) ? "bold" : ""}`,
        textAlign: "left",
      }}
    >
      {childNode}
    </td>
  );
};
