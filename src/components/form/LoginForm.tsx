import { Divider, Form, Button, Image, Typography } from "antd";
import AuthenticateForm, { FIELD_TYPES } from "./AuthenticateForm";
import styled from "./LoginForm.module.scss";
import FacebookIcon from "../../assets/facebook_icon.png";
import GoogleIcon from "../../assets/google_icon.png";
import MainIcon from "../../assets/main-logo.svg";
import { LoginProps, UserAPI } from "../../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../hooks/useLoginHook";

const { Text } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export type LoginFormProps = {};

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

const LoginForm = ({}: LoginFormProps) => {
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading, error, data } = useLoginUser();

  const onFinish = async (loginProps: LoginProps) => {
    await loginUser(loginProps, {
      onSuccess(data, variables, context) {
        localStorage.setItem("access_token", data);
        navigate("/home");
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
    // todo: add jwt, role, userid to cookie
    // todo: check role --> navigate
  };

  if (isLoading) return <>Loading skeleton ma` lam` bieng code qua _-_ </>;

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <Image className={styled["image"]} src={MainIcon} preview={false} />
        <p className={styled["text"]}>Study with Mentor</p>
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
