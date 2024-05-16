import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Select,
  Tooltip,
  Typography,
  Radio,
  Row,
  InputNumber,
  AutoComplete,
  TimePicker,
} from "antd";
import {useEffect, useState} from "react";
import "./FormItem.scss";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import {Option} from "antd/es/mentions";
import {fieldType, formatTime} from "types";
dayjs.locale("vi");
const {
  INPUT,
  SELECT,
  DATE,
  CHECKBOX,
  RADIO,
  RADIO_VN,
  RADIO_BUTTON,
  NUMBER,
  AUTO_COMPLETE,
  TIME_RANGE,
  COMBO_BOX,
  TEXT_AREA,
  TIME,
  INPUT_NUMBER,
  SELECT_MULTI,
  PASSWORD,
} = fieldType;

const FormItem = (props: any) => {
  const {
    placeholder,
    suffix,
    disable,
    checkbox,
    type,
    options,
    addonAfter,
    radioButtons,
    optionsTime = {showTime: false, format: formatTime.dayFull},
    className,
    labelCol,
    wrapperCol,
    rules,
    name,
    label,
    value,
    radioButton,
    onChange,
    onSearch,
    onPressEnter,
    statusDrug,
    defaultValue,
    onSelect,
    radioCustom,
    disableDate = true,
    disabledDate,
    minCurrency,
    valuePropName,
    mode,
    filterOption,
    initialValue = null,
    allowClear = true,
    changeOnBlur,
    ...rest
  } = props;
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {}, [isOpenDate]);
  const renderFormItem = () => {
    switch (type) {
      case INPUT:
        return (
          <Input
            style={{
              width: "100%",
            }}
            value={value ?? null}
            placeholder={!disable ? placeholder ?? "Nhập" : "--"}
            suffix={suffix}
            disabled={disable}
            addonAfter={addonAfter}
            allowClear
            onChange={onChange}
            {...rest}
          />
        );
      case PASSWORD:
        return (
          <Input.Password
            style={{
              width: "100%",
            }}
            value={value ?? null}
            placeholder={!disable ? placeholder ?? "Nhập" : "--"}
            suffix={suffix}
            disabled={disable}
            addonAfter={addonAfter}
            allowClear
            onChange={onChange}
            autoComplete="new-password"
            onFocus={e => {
              console.log(e);
              e?.preventDefault();
            }}
            {...rest}
          />
        );
      case INPUT_NUMBER:
        return (
          <InputNumber
            style={{
              width: "100%",
            }}
            suffix={suffix}
            disabled={disable}
            addonAfter={addonAfter}
            allowClear
            controls={false}
            onChange={onChange}
            type="number"
            {...rest}
          />
        );
      case TEXT_AREA:
        return (
          <Input.TextArea
            value={value ?? null}
            placeholder={!disable ? placeholder ?? "Nhập" : "--"}
            allowClear
            onChange={onChange}
            disabled={disable}
            {...rest}
          />
        );
      case COMBO_BOX:
        return (
          <Select
            mode={mode}
            showSearch
            style={{
              width: "100%",
            }}
            filterOption={(input, option: any) =>
              (option?.label.toString().toLowerCase() ?? "").includes(
                input.toLowerCase()
              )
            }
            defaultValue={value ?? null}
            placeholder={!disable ? placeholder ?? "Chọn" : "--"}
            options={options}
            disabled={disable}
            allowClear={allowClear}
            onChange={(value, option) => {
              if (onChange) {
                onChange(value, option);
              }

              setIsOpen(false);
              console.log("change");
            }}
            open={isOpen}
            onFocus={() => {
              setIsOpen(true);
            }}
            onBlur={() => {
              setIsOpen(false);
            }}
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true);
              }
              // setIsOpen(true);
              console.log("click");
            }}
            onSelect={() => {
              setIsOpen(false);
              console.log("select");
            }}
            {...rest}
          />
        );
      case SELECT_MULTI:
        return (
          <Select mode="tags" style={{width: "100%"}}>
            {options.map((e: any) => (
              <Option value={e.value}>{e.label}</Option>
            ))}
          </Select>
        );
      case SELECT:
        return (
          <Select
            style={{
              width: "100%",
            }}
            placeholder={!disable ? placeholder ?? "Chọn" : "--"}
            options={options}
            disabled={disable}
            onChange={onChange}
            allowClear={allowClear}
            mode={mode}
            {...rest}
            filterOption={(input, option: any) =>
              (option?.label.toString().toLowerCase() ?? "").includes(
                input.toLowerCase()
              )
            }
          />
        );

      case DATE:
        return (
          <DatePicker
            style={{
              width: "100%",
            }}
            disabled={disable}
            format={optionsTime.format}
            showTime={optionsTime.format == formatTime.dateTime}
            disabledDate={
              disableDate
                ? current => {
                    return current.isAfter(dayjs());
                  }
                : false
            }
            placeholder={
              !disable ? optionsTime.format ?? placeholder ?? "Chọn" : "--"
            }
            onChange={onChange}
            allowClear
            changeOnBlur={changeOnBlur}
            {...rest}
          />
        );

      case TIME:
        return (
          <TimePicker
            style={{
              width: "100%",
            }}
            placeholder={placeholder ?? optionsTime.format}
            disabled={disable}
            format={optionsTime.format ?? formatTime.time_24h}
            {...rest}
          />
        );
      case TIME_RANGE:
        return (
          <TimePicker.RangePicker
            style={{
              width: "100%",
            }}
            format={"hh:mm"}
            disabled={disable}
            {...rest}
          />
        );
      case CHECKBOX:
        return (
          <Checkbox.Group disabled={disable} onChange={onChange}>
            <Row>
              {checkbox?.map((item: any, index: number) => (
                <Col key={index} span={item.span}>
                  <Checkbox
                    value={item.value}
                    style={{
                      width: "100%",
                    }}
                  >
                    {item.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        );

      case RADIO:
        return (
          <Radio.Group value={true} disabled={disable}>
            {options ? (
              <Row
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {options.map((e: any) => {
                  return <Radio value={e?.value}>{e?.label}</Radio>;
                })}
              </Row>
            ) : (
              <>
                {" "}
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </>
            )}
          </Radio.Group>
        );
      case RADIO_VN:
        return (
          <Radio.Group
            defaultValue={defaultValue}
            value={true}
            disabled={disable}
            onChange={onChange}
          >
            {options ? (
              <Row
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                {options.map((e: any) => {
                  return <Radio value={e?.value}>{e?.label}</Radio>;
                })}
              </Row>
            ) : (
              <>
                {" "}
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </>
            )}
          </Radio.Group>
        );
      case RADIO_BUTTON:
        return (
          <Radio.Group
            style={{width: "100%"}}
            size="middle"
            buttonStyle="solid"
            disabled={disable}
            onChange={onChange}
          >
            <Row justify={"center"}>
              {radioButtons?.map((item: any, index: number) => {
                if (item.span) {
                  return (
                    <Col span={item.span} key={index}>
                      <Tooltip title={item.label}>
                        <Radio.Button
                          className="button-radio"
                          value={item.value}
                        >
                          {item.label}
                        </Radio.Button>
                      </Tooltip>
                    </Col>
                  );
                } else
                  return (
                    <Col flex={1} key={index}>
                      <Tooltip title={item.label}>
                        <Radio.Button
                          className="button-radio"
                          value={item.value}
                        >
                          {item.label}
                        </Radio.Button>
                      </Tooltip>
                    </Col>
                  );
              })}
            </Row>
          </Radio.Group>
        );

      case NUMBER:
        return (
          <InputNumber
            style={{width: "100%"}}
            placeholder={!disable ? placeholder ?? "Nhập" : "--"}
            disabled={disable}
            value={value}
            addonAfter={addonAfter}
            defaultValue={value}
            controls={false}
            onChange={onChange}
            {...rest}
          ></InputNumber>
        );
      case AUTO_COMPLETE:
        return (
          <AutoComplete
            showSearch
            allowClear
            placeholder={!disable ? placeholder ?? "Chọn" : "--"}
            notFoundContent={null}
            value={value}
            onSelect={onSelect}
            defaultActiveFirstOption={false}
            filterOption={
              filterOption
                ? filterOption
                : (inputValue, option) =>
                    option!.label
                      ?.toString()
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
            }
            options={options}
            disabled={disable}
            onChange={onChange}
            onSearch={onSearch}
            {...rest}
          ></AutoComplete>
        );

      default:
        break;
    }
  };

  return (
    <Form.Item
      className={className}
      rules={rules}
      labelCol={{
        xs: labelCol.xs,
        sm: labelCol.sm,
        md: labelCol.md,
        lg: labelCol.lg,
        xl: labelCol.xl,
      }}
      wrapperCol={{
        xs: wrapperCol.xs,
        sm: wrapperCol.sm,
        md: wrapperCol.md,
        lg: wrapperCol.lg,
        xl: wrapperCol.xl,
      }}
      initialValue={initialValue}
      key={name}
      label={
        label ? (
          <Tooltip placement="bottom" arrow={false} title={label}>
            <Typography.Text
              className="form-item-text"
              style={{
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginRight: "2px",
              }}
            >
              {label}
            </Typography.Text>
          </Tooltip>
        ) : (
          ""
        )
      }
      valuePropName={valuePropName}
      name={name}
    >
      {renderFormItem()}
    </Form.Item>
  );
};

export default FormItem;
