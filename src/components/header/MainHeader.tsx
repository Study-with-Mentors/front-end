import React from "react";
import styled from "./MainHeader.module.scss";
import MainLogo from "../../assets/main-logo.svg";
import { Button, Card, Avatar, Badge } from "antd";
import SearchCard from "../card/SearchCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "./MainHeader.css";

export type MainHeaderProps = {
  isLogined?: boolean;
};

const MainHeader = ({ isLogined }: MainHeaderProps) => {
  return (
    <div className={styled["container"]}>
      <div className={styled["logo-wrapper"]}>
        <img className={styled["logo"]} src={MainLogo} alt="" />
        <p className={styled["body"]}>
          STUDY WITH
          <br />
          MENTORS
        </p>
      </div>

      <div className={styled["body-wrapper"]}>
        {/* <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item className={styled["list-item"]}>
              <a className={styled["link"]}>{item.title}</a>
            </List.Item>
          )}
        /> */}
        <SearchCard />
      </div>

      <div className={styled["action-wrapper"]}>
        {!isLogined ? (
          <>
            <Button
              className={styled["button-signIn"] + " " + styled["button"]}
            >
              Sign in
            </Button>
            <Button
              className={styled["button-signUp"] + " " + styled["button"]}
            >
              Sign up
            </Button>
          </>
        ) : (
          <>
            <Badge dot>
              <NotificationsOutlinedIcon
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                }}
              />
            </Badge>
            <SettingsOutlinedIcon
              style={{
                fontSize: "28px",
                margin: "0 12px",
                cursor: "pointer",
              }}
            />
            <Avatar
              size={48}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
              }}
              icon={
                <img src="https://cdn.dribbble.com/userupload/3789040/file/original-67198d4faf8efb85544eb048e3239190.png?compress=1&resize=1024x768" />
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
