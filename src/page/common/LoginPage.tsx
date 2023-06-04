import React from "react";
import LoginForm from "../../components/form/LoginForm";
import styled from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["top"]}></div>
      <div className={styled["bot"]}></div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
