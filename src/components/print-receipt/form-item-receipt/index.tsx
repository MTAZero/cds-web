import {Form, Input, InputRef} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {fieldType} from "types";
import "./style.scss";
import {render} from "node-sass";
import {isValuable, isValuableString} from "utils";
const {INPUT} = fieldType;
const FormItemReceipt = props => {
  const {type, dataIndex, form} = props;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState(null);
  let formItem = <></>;
  let childNode;
  const toggleEdit = () => {
    setEditing(!editing);
  };
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const save = () => {
    toggleEdit();
    setValue(form.getFieldValue(dataIndex));
  };
  if (type == INPUT) {
    formItem = (
      <Form.Item name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    );
  }
  let renderValue = (
    <span
      className="editable-cell-value-wrap"
      style={{paddingRight: 24}}
      onClick={toggleEdit}
    >
      {value && isValuableString(value) ? value : "........."}
    </span>
  );

  return (
    <div className="form-item-receipt">
      <div style={{display: `${editing ? "block" : "none"}`}}>{formItem}</div>
      <div style={{display: `${editing ? "none" : "block"}`}}>
        {renderValue}
      </div>
    </div>
  );
};
export {FormItemReceipt};
