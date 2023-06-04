import React from "react";
import SignUpForm from "../../components/form/SignUpForm";
import SignUpImage from "../../assets/signup-bg.svg";
import FacebookIcon from "../../assets/facebook_icon.png";
import GoogleIcon from "../../assets/google_icon.png";
import styled from "./SignUpPage.module.scss";
import { Button, Divider } from "antd";

const SignUpPage = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["left-wrapper"]}>
        <div className={styled["header"]}>
          <p className={styled["title"]}>
            Study With
            <span style={{ color: "gray" }}> Mentor</span>
          </p>
        </div>

        <div className={styled["body"]}>
          <p className={styled["title"]}>Welcome!</p>
          <p className={styled["content"]}>
            Study With Mentors connects students and their families with
            qualified tutors for improved learning outcomes.
          </p>
          <img className={styled["image"]} src={SignUpImage} alt="" />
        </div>

        <div className={styled["footer"]}>
          <ul>
            <li>@2023 StudyWithMentors</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className={styled["right-wrapper"]}>
        <SignUpForm />

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
      </div>
    </div>
  );
};

export default SignUpPage;
