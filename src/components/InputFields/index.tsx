import {Col} from "antd";
import FormItem from "./FormItem/FormItem";
import "./InputFields.scss";

const InputFields = ({data}: any): JSX.Element => {
  return (
    <>
      {data
        ?.filter(e => e?.show != false)
        .map(
          (
            {
              type,
              label = "",
              placeholder,
              disable = false,
              suffix,
              checkbox,
              options,
              optionsTime,
              rules,
              formList,
              name,
              css = {xs: 24, sm: 24, md: 24, lg: 12, xl: 8},
              wrapperCol = {xs: 14, md: 16, xl: 18, lg: 16},
              labelCol = {xs: 10, md: 8, xl: 6, lg: 8},
              className,
              addonAfter,
              radioButtons,
              value,
              onChange,
              onSearch,
              statusDrug,
              defaultValue,
              radioCustom,
              disableDate,
              disabledDate,
              initialValue,
              hide,
              mode,
              allowClear,
              changeOnBlur,
              ...rest
            }: any,
            index: number
          ) => {
            const {xs, sm, md, xl, lg} = css;
            return (
              <Col
                className={`input-fields`}
                xs={xs}
                sm={sm}
                md={md}
                xl={xl}
                lg={lg}
                key={index}
                style={{display: hide ? "none" : ""}}
              >
                <FormItem
                  suffix={suffix}
                  placeholder={placeholder}
                  disable={disable}
                  type={type}
                  options={options}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                  checkbox={checkbox}
                  rules={rules}
                  name={name}
                  label={label}
                  className={className}
                  optionsTime={optionsTime}
                  addonAfter={addonAfter}
                  radioButtons={radioButtons}
                  value={value}
                  onChange={onChange}
                  onSearch={onSearch}
                  statusDrug={statusDrug}
                  defaultValue={defaultValue}
                  radioCustom={radioCustom}
                  disableDate={disableDate}
                  disabledDate={disabledDate}
                  initialValue={initialValue}
                  allowClear={allowClear}
                  mode={mode}
                  changeOnBlur={changeOnBlur}
                  {...rest}
                />
              </Col>
            );
          }
        )}
    </>
  );
};

export {InputFields};
