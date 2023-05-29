import React from "react";
import { Divider, Form, Button, Image, Typography } from "antd";
import AuthenticateForm, { FIELD_TYPES } from "./AuthenticateForm";
import styled from "./SignUpForm.module.scss";
const { Text } = Typography;

const onFinish = async (values: any) => {};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const fields = [
  {
    type: FIELD_TYPES.TEXT,
    fieldProps: {
      placeholder: "Full name",
      name: "fullname",
      rules: { required: true, message: "Fullname must not empty!" },
      style: {
        width: "500px",
        height: "50px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: FIELD_TYPES.TEXT,
    fieldProps: {
      placeholder: "Email",
      name: "email",
      rules: { required: true, message: "Email must not empty!" },
      style: {
        width: "500px",
        height: "50px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: FIELD_TYPES.PASSWORD,
    fieldProps: {
      placeholder: "Password",
      name: "password",
      rules: { required: true, message: "Password must not empty!" },
      style: {
        width: "500px",
        height: "50px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: FIELD_TYPES.PASSWORD,
    fieldProps: {
      placeholder: "Confirm password",
      name: "confirm",
      rules: { required: true, message: "This field must not empty!" },
      style: {
        width: "500px",
        height: "50px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: FIELD_TYPES.SELECT,
    fieldProps: {
      name: "role",
      // rules: { required: true, message: "This field must not empty!" },
      label: (
        <span
          style={{
            color: "#2E2C2C",
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          {" "}
          I am a
        </span>
      ),
      options: [
        {
          label: "Tutor",
          value: "Tutor",
        },
        {
          label: "Student",
          value: "Student",
        },
      ],
      cols: 12,
    },
  },
  {
    type: FIELD_TYPES.BUTTON,
    formProps: {
      wrapperCol: { span: 24, offset: 7 },
    },
    fieldProps: {
      type: "primary",
      htmlType: "submit",
      text: "Sign Up",
      style: {},
    },
    cols: 12,
  },
];

const SignUpForm = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["header-title"]}>
          Sign <span>Up</span>
        </p>
        <p className={styled["header-body"]}>
          Already have an account? <span>Log in</span>
        </p>
      </div>
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        requiredMark="optional"
        initialValues={{ remember: true }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={
          {
            // display: "flex",
            // justifyContent: "center",
            // flexDirection: "column",
            // alignItems: "center",
          }
        }
      >
        <AuthenticateForm fields={fields} />
      </Form>
    </div>
  );
};

export default SignUpForm;
