import React from "react";
import styled from "./MainHeader.module.scss";
import MainLogo from "../../assets/main-logo.svg";
import { Button, Card, Avatar, Badge, Skeleton } from "antd";
import SearchCard from "../card/SearchCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "./MainHeader.css";
import { useNavigate } from "react-router-dom";
import { UseQueryResult, useQuery } from "react-query";
import { GetUserResult } from "../../types/User.type";
import { UserAPI } from "../../api/UserAPI";

export type MainHeaderProps = {};

const MainHeader = ({}: MainHeaderProps) => {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  }: UseQueryResult<GetUserResult, Error> = useQuery(
    ["user"],
    async () => await UserAPI.getByUserToken()
  );

  return (
    <div className={styled["container"]}>
      <div onClick={() => navigate("/home")} className={styled["logo-wrapper"]}>
        <img className={styled["logo"]} src={MainLogo} alt="" />
        <p className={styled["body"]}>
          STUDY WITH
          <br />
          MENTORS
        </p>
      </div>

      <div className={styled["body-wrapper"]}>
        <SearchCard />
      </div>

      <div className={styled["action-wrapper"]}>
        {!userID ? (
          <>
            <Button
              className={styled["button-signIn"] + " " + styled["button"]}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Button>
            <Button
              className={styled["button-signUp"] + " " + styled["button"]}
              onClick={() => navigate("/signup")}
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
            {isLoading ? (
              <Skeleton.Avatar
                active={true}
                size={"default"}
                style={{
                  width: 48,
                  height: 48,
                }}
              ></Skeleton.Avatar>
            ) : (
              <Avatar
                size={48}
                onClick={() => navigate("/home/profile")}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                icon={<img src={user?.profileImage} />}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
