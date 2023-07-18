import { Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "../../api/UserAPI";
import { useSignUpHook } from "../../hooks/useSignUpHook";
import AuthenticateForm, { FIELD_TYPES } from "./AuthenticateForm";
import styled from "./SignUpForm.module.scss";
const { Text } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { mutate: signup, isLoading, data } = useSignUpHook();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const signupProps: SignupProps = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirm: values.confirm,
      birthdate: values.birthday.add(1, "day").toDate(),
      gender: values.gender,
    };
    console.log(signupProps)
    if (signupProps.password !== signupProps.confirm) {
      messageApi.open({
        type: "error",
        content: "Passwords does not match!",
      });
    } else {

      await signup(signupProps, {
        onSuccess(data, variables, context) {
          messageApi.open({
            type: "success",
            content: 'Sign up successful! Please check your email and follow instruction',
          });
        },
        onError(error, variables, context) {
          messageApi.open({
            type: "error",
            content: 'User already exists',
          });
        },
      });
    }
  };

  const fields = [
    {
      type: FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "First Name",
        name: "firstName",
        rules: [{ required: true, message: "First Name must not empty!" }],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Last name",
        name: "lastName",
        rules: [{ required: true, message: "Last Name must not empty!" }],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Email",
        name: "email",
        rules: [
          {
            required: true,
            message: "This field shouldn't be empty!",
          },
          {
            type: "email",
            message: "Please input valid email! ",
          },
        ],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.PASSWORD,
      fieldProps: {
        placeholder: "Password",
        name: "password",
        rules: [{ required: true, message: "Password must not empty!" }],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.PASSWORD,
      fieldProps: {
        placeholder: "Confirm password",
        name: "confirm",
        rules: [{ required: true, message: "This field must not empty!" }],
        style: {
          width: "500px",
          height: "50px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
    },
    {
      type: FIELD_TYPES.SELECT,
      fieldProps: {
        name: "gender",
        placeholder: "Gender",
        rules: [{ required: true, message: "This field must not empty!" }],
        style: {
          width: "500px",
          height: "50px",
        },
        options: [
          {
            label: "Male",
            value: "MALE",
          },
          {
            label: "Female",
            value: "FEMALE",
          },
        ],
        cols: 12,
      },
    },
    {
      type: FIELD_TYPES.SELECTDATE,
      fieldProps: {
        name: "birthday",
        placeholder: "Birthday",
        rules: { required: true, message: "Birthday must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "60px",
        },
        onChange: (value: any) => { },
      },
      cols: 12,
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
        isLoading,
      },
      cols: 12,
    },
  ];

  return (
    <div className={styled["container"]}>
      {contextHolder}
      <div className={styled["header"]}>
        <p className={styled["header-title"]}>
          Sign <span>Up</span>
        </p>
        <p className={styled["header-body"]}>
          Already have an account?{" "}
          <span onClick={() => navigate("/auth")}>Log in</span>
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
