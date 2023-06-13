import React from "react";
import LoginForm from "../../components/form/LoginForm";
import styled from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styled["container"]}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
