import React from "react";
import LoginIcon from "../../assets/login_icon.png";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  DatePicker,
  Select,
  Radio,
  InputNumber,
} from "antd";
import LoadingSkeleton from "../skeleton/LoadingSkeleton";
import NumericInput from "../input/NumericInput";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const renderText = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      wrapperCol={{ span: 24 }}
      name={name}
      rules={[rules]}
      style={style}
      label={label}
    >
      <Input style={{ height: "50px" }} placeholder={placeholder} />
    </Form.Item>
  );
};

const renderNumeric = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style, label, minValue, maxValue } =
    fieldProps;

  return (
    <Form.Item
      wrapperCol={{ span: 24 }}
      name={name}
      rules={[rules]}
      style={style}
      label={label}
    >
      <InputNumber
        style={{ height: "50px", width: "100%" }}
        placeholder={placeholder}
        min={minValue}
        max={maxValue}
      />
    </Form.Item>
  );
};

const renderTextArea = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      wrapperCol={{ span: 24 }}
      name={name}
      rules={[rules]}
      style={style}
      label={label}
    >
      <TextArea
        placeholder={placeholder}
        rows={6}
        style={{
          resize: "none",
        }}
      />
    </Form.Item>
  );
};

const renderButton = ({ fieldProps, formProps }: any) => {
  const { type, htmlType, text, style, loading } = fieldProps;

  return (
    <Form.Item {...formProps}>
      <Button
        type={type}
        htmlType={htmlType}
        loading={loading}
        style={{
          width: "160px",
          height: "48px",
          borderRadius: "24px",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "18px",
          backgroundColor: "#391085",
          marginTop: "20px",
          ...style,
        }}
      >
        {text}
      </Button>
    </Form.Item>
  );
};

const renderPassword = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style } = fieldProps;
  return (
    <Form.Item
      name={name}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
      style={style}
    >
      <Input.Password style={{ height: "50px" }} placeholder={placeholder} />
    </Form.Item>
  );
};

const renderSelect = ({ fieldProps }: any) => {
  const { options, name, rules, style, label, isLoading } = fieldProps;

  if (isLoading) return <LoadingSkeleton />;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
    >
      <Checkbox.Group options={options} style={style} />
    </Form.Item>
  );
};

const renderRadio = ({ fieldProps }: any) => {
  const { options, name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
    >
      <Radio.Group options={options} style={style} />
    </Form.Item>
  );
};

const renderSelectDate = ({ fieldProps }: any) => {
  const { name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
      style={style}
    >
      <DatePicker style={{ height: "50px", width: "100%" }} />
    </Form.Item>
  );
};

const renderRangePicker = ({ fieldProps }: any) => {
  const { name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
      style={style}
    >
      <RangePicker showTime size="large" />
    </Form.Item>
  );
};

const renderRangePickerDate = ({ fieldProps }: any) => {
  const { name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
      style={style}
    >
      <RangePicker style={{ width: "100%" }} size="large" />
    </Form.Item>
  );
};

const renderSelectMultiOption = ({ fieldProps }: any) => {
  const { name, rules, style, label, options, placeholder } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
      style={{
        ...style,
      }}
    >
      <Select
        // mode="tags"
        style={{ width: "100%" }}
        size="large"
        placeholder={placeholder}
        // onChange={handleChange}
        options={options}
      />
    </Form.Item>
  );
};

export const EDIT_FIELD_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  BUTTON: "button",
  PASSWORD: "password",
  SELECT: "select",
  SELECTDATE: "selectDate",
  SELECTMULTIOPTION: "selectMultiOption",
  RADIO: "selectRadio",
  NUMERIC: "numeric",
  RANGEPICKER: "rangepicker",
  RANGEPICKERDATE: "rangePickerDate",
};

const FORM_MAPPING = {
  [EDIT_FIELD_TYPES.TEXT]: renderText,
  [EDIT_FIELD_TYPES.BUTTON]: renderButton,
  [EDIT_FIELD_TYPES.PASSWORD]: renderPassword,
  [EDIT_FIELD_TYPES.SELECT]: renderSelect,
  [EDIT_FIELD_TYPES.SELECTDATE]: renderSelectDate,
  [EDIT_FIELD_TYPES.SELECTMULTIOPTION]: renderSelectMultiOption,
  [EDIT_FIELD_TYPES.RADIO]: renderRadio,
  [EDIT_FIELD_TYPES.TEXTAREA]: renderTextArea,
  [EDIT_FIELD_TYPES.NUMERIC]: renderNumeric,
  [EDIT_FIELD_TYPES.RANGEPICKER]: renderRangePicker,
  [EDIT_FIELD_TYPES.RANGEPICKERDATE]: renderRangePickerDate,
};

const EditAndUpdateForm = ({ fields }: any) => {
  return (
    <>
      {fields.map(
        ({ type, fieldProps, formProps, cols }: any, index: number) => {
          return (
            <div key={index}>
              {FORM_MAPPING[type]({
                fieldProps: fieldProps,
                formProps: formProps,
              })}
            </div>
          );
        }
      )}
    </>
  );
};

export default EditAndUpdateForm;