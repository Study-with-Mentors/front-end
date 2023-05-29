import { Divider, Form, Button, Image, Typography } from "antd";
import { useMemo } from "react";
import AuthenticateForm, { FIELD_TYPES } from "./AuthenticateForm";
import styled from "./LoginForm.module.scss";
import FacebookIcon from "../../assets/facebook_icon.png";
import GoogleIcon from "../../assets/google_icon.png";
import { type } from "os";

const { Text } = Typography;

const onFinish = async (values: any) => {};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export type LoginFormProps = {
  icon: string;
  headerName: string;
};

const fields = [
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
    type: FIELD_TYPES.BUTTON,
    fieldProps: {
      type: "primary",
      htmlType: "submit",
      text: "Sign In",
      style: {},
    },
    formProps: { wrapperCol: { span: 24, offset: 7 } },
    cols: 12,
  },
];

const LoginForm = ({ icon, headerName }: LoginFormProps) => {
  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <Image className={styled["image"]} src={icon} preview={false} />
        <p className={styled["text"]}>{headerName}</p>
      </div>
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AuthenticateForm fields={fields} />

        <div className={styled["footer"]}>
          <Divider className={styled["divider"]}>Or Sign In</Divider>
          <div className={styled["button-wrapper"]}>
            <Button className={styled["btn"]}>
              <img className={styled["icon"]} src={GoogleIcon} alt="" /> Using
              Google
            </Button>
            <Button className={styled["btn"]}>
              <img className={styled["icon"]} src={FacebookIcon} alt="" /> Using
              Facebook
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
