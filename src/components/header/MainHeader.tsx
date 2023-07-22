import React from "react";
import styled from "./MainHeader.module.scss";
import MainLogo from "../../assets/main-logo.svg";
import { Button, Card, Avatar, Badge, Skeleton, Dropdown } from "antd";
import SearchCard from "../card/SearchCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "./MainHeader.css";
import { useNavigate } from "react-router-dom";
import { UseQueryResult, useQuery } from "react-query";
import { GetProfileImage, GetUserResult } from "../../types/User.type";
import { UserAPI } from "../../api/UserAPI";
import type { MenuProps } from "antd";
import { JwtPayload } from "../../types/Jwt.type";
import { decode } from "../../utils/jwt";

export type MainHeaderProps = {};

const MainHeader = ({}: MainHeaderProps) => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  var { uid }: JwtPayload = decode(access_token!);

  const {
    data: image,
    isLoading,
    isFetching,
    refetch,
  }: UseQueryResult<GetProfileImage, Error> = useQuery(
    ["user", uid],
    async () => await UserAPI.getUserImageByToken(),
    {
      enabled: !!uid && uid != "0",
    }
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      label: <a onClick={() => navigate("/home/profile")}>Profile</a>,
      key: "0",
    },
    {
      label: <a onClick={() => navigate("/home")}>Dashboard</a>,
      key: "1",
    },

    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "2",
    },
  ];

  return (
    <div className={styled["container"]}>
      <div onClick={() => navigate("/")} className={styled["logo-wrapper"]}>
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
        {!uid || uid == "0" ? (
          <>
            <Button
              className={styled["button-signIn"] + " " + styled["button"]}
              onClick={() => navigate("/auth")}
            >
              Sign in
            </Button>
            <Button
              className={styled["button-signUp"] + " " + styled["button"]}
              onClick={() => navigate("/auth/signup")}
            >
              Sign up
            </Button>
          </>
        ) : (
          <>
            {/* <Badge>
              <NotificationsOutlinedIcon
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                }}
              />
            </Badge> */}
            {/* <SettingsOutlinedIcon
              style={{
                fontSize: "28px",
                margin: "0 12px",
                cursor: "pointer",
              }}
            /> */}
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
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Avatar
                  size={48}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  icon={
                    <img
                      src={
                        image?.url ||
                        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                      }
                    />
                  }
                />
              </Dropdown>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
