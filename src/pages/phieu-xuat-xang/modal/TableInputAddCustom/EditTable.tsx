import {AutoComplete, DatePicker, Form, Input, InputNumber, Select} from "antd";
import {FormInstance} from "antd/lib/form/Form";
import React, {useState} from "react";

import {Rule} from "antd/es/form";
import {fieldType, formatTime} from "types";
import {formatToCurrencyTypeToFixed, toNumber} from "utils";
type EditableRowProps = {
  index: number;
};
const {INPUT, NUMBER, DATE, AUTO_COMPLETE, COMBO_BOX, CURRENCY} = fieldType;
export type EditableCellProps = {
  title: React.ReactNode;
  editable?: boolean;
  children: any;
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
  child?: any;
  setTong?: () => void;
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
  child,
  setTong,
  ...restProps
}) => {
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
  const setThanhTien = () => {
    const soLuong = getFieldValue("actualExport");
    const donGia = getFieldValue("unitPrice");
    const thanhTien = Math.round(toNumber(soLuong) * toNumber(donGia));
    setFieldValue("sumMoney", thanhTien);
    setTong();
  };
  const setSoLuongXuatThucTe = () => {
    const soLuongXuat15 = toNumber(getFieldValue("actualExport"));
    const heSoVcf = toNumber(getFieldValue("factorVcf"), 4);
    const soLuongXuatThucTe = toNumber(soLuongXuat15 / heSoVcf, 0);
    setFieldValue("export", soLuongXuatThucTe);
  };
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
          onChange={async e => {
            if (dataIndex == "name") {
              setTong();
            }
          }}
        ></Input>
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
          onChange={e => {
            if (dataIndex == "actualExport") {
              setThanhTien();
            }
            if (dataIndex == "factorVcf" || dataIndex == "actualExport") {
              setSoLuongXuatThucTe();
            }
          }}
          // formatter={value => toNumber(value, 4).toString()}
          // parser={value => toNumber(value!.replace(/\$\s?|(.*)/g, ""), 4)}
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
  if (type == CURRENCY) {
    childNode = (
      <Form.Item
        name={[name, index, dataIndex]}
        initialValue={getFieldValue(dataIndex) ?? null}
        rules={rules}
      >
        <InputNumber
          disabled={disabled}
          defaultValue={value}
          formatter={value => formatToCurrencyTypeToFixed(value)}
          parser={value =>
            Math.round(toNumber(value!.replace(/\$\s?|(,*)/g, "")))
          }
          onChange={e => {
            if (dataIndex == "unitPrice") {
              setThanhTien();
            }
            if (dataIndex == "sumMoney") {
              setTong();
            }
          }}
          placeholder={!disabled ? "Nhập" : ""}
          addonAfter="VNĐ"
          controls={false}
          min={0}
          {...restProps}
        />
      </Form.Item>
    );
  }

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
