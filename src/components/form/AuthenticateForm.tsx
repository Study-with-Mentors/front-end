import React from "react";
import LoginIcon from "../../assets/login_icon.png";
import { Button, Checkbox, Form, Image, Input } from "antd";
import "./AuthenticateForm.css";

const renderText = ({ fieldProps }: any) => {
  const { placeholder, name, rules, style } = fieldProps;

  return (
    <Form.Item
      wrapperCol={{ span: 24 }}
      name={name}
      rules={[rules]}
      style={style}
    >
      <Input style={{ height: "50px" }} placeholder={placeholder} />
    </Form.Item>
  );
};

const renderButton = ({ fieldProps, formProps }: any) => {
  const { type, htmlType, text } = fieldProps;

  return (
    <Form.Item {...formProps}>
      <Button
        type={type}
        htmlType={htmlType}
        style={{
          width: "212px",
          height: "64px",
          borderRadius: "48px",
          color: "#fffff",
          fontWeight: 600,
          fontSize: "18px",
          backgroundColor: "#391085",
          marginTop: "32px",
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
  const { options, name, rules, style, label } = fieldProps;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[rules]}
      wrapperCol={{ span: 24 }}
      // style={style}
    >
      <Checkbox.Group
        style={{
          marginLeft: "40px",
        }}
        options={options}
      />
    </Form.Item>
  );
};

export const FIELD_TYPES = {
  TEXT: "text",
  BUTTON: "button",
  PASSWORD: "password",
  SELECT: "select",
};

const FORM_MAPPING = {
  [FIELD_TYPES.TEXT]: renderText,
  [FIELD_TYPES.BUTTON]: renderButton,
  [FIELD_TYPES.PASSWORD]: renderPassword,
  [FIELD_TYPES.SELECT]: renderSelect,
};

const AuthenticateForm = ({ fields }: any) => {
  return (
    <div>
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
    </div>
  );
};

export default AuthenticateForm;
