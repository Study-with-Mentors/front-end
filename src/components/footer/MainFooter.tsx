import React from "react";
import styled from "./MainFooter.module.scss";
import { Row, Col, Button, Input } from "antd";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { InsuranceFilled } from "@ant-design/icons";
import MainLogo from "../../assets/main-logo.svg";

const MainFooter = () => {
  return (
    // <Row className={styled["container"]}>
    //   <Col xl={10} className={styled["icon-wrapper"]}>
    //     <p>STUDY WITH MENTORS</p>
    //     <FacebookOutlinedIcon className={styled["icon"]} />
    //     <InstagramIcon className={styled["icon"]} />
    //     <YouTubeIcon className={styled["icon"]} />
    //     <TwitterIcon className={styled["icon"]} />
    //     <InsuranceFilled className={styled["icon"]} />
    //   </Col>
    //   <Col xl={4} className={styled["link"]}></Col>
    //   <Col xl={10} className={styled["contact"]}></Col>
    // </Row>
    <div className={styled["container"]}>
      {/* <div className={styled["get_started"]}>
        <div className={styled["title"]}>
          <p>Ready to get started?</p>
          <p>Talk to us today</p>
        </div>
        <div className={styled["button-wrapper"]}>
          <Button className={styled["button"]}>Get started</Button>
        </div>
      </div> */}
      <Row className={styled["footer"]}>
        <Col className={styled["section"]} xl={4}>
          <img src={MainLogo} alt="Main logo" />
          <p
            style={{
              fontSize: "20px",
            }}
          >
            STUDY WITH MENTORS
          </p>
        </Col>
        <Col className={styled["section"]} xl={4}>
          <div className={styled["wrapper"]}>
            <p className={styled["title"]}>ABOUT US</p>
            <p className={styled["item"]}>Home</p>
            <p className={styled["item"]}>Courses</p>
            <p className={styled["item"]}>Pricing</p>
          </div>
        </Col>
        <Col className={styled["section"]} xl={4}>
          <div className={styled["wrapper"]}>
            <p className={styled["title"]}>CONTACT US</p>
            <p className={styled["item"]}>contact@studywithmentor.id.vn</p>
            <p className={styled["item"]}>FPT University HCM</p>
            <p className={styled["item"]}>Group 5</p>
          </div>
        </Col>
        <Col className={styled["section"]} xl={12}>
          <div className={styled["wrapper"]}>
            <p className={styled["title"]}>NOT QUITE READY FOR SURVAY?</p>
            <div className={styled["combobox"]}>
              <Input
                className={styled["input"]}
                placeholder="enter your email"
              />
              <Button className={styled["button"]}>subcribe</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainFooter;
