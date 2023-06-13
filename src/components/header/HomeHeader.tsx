import React from "react";
import styled from "./HomeHeader.module.scss";
import MainLogo from "../../assets/main-logo.svg";
import { Button, Card, Avatar, Badge } from "antd";
import SearchCard from "../card/SearchCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "./MainHeader.css";
import { useNavigate } from "react-router-dom";

export type HomeHeaderProps = {};

const HomeHeader = ({}: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={styled["container"]}>
      <div className={styled["body-wrapper"]}>
        <SearchCard />
      </div>

      <div className={styled["action-wrapper"]}>
        <>
          <Badge dot>
            <NotificationsOutlinedIcon
              style={{
                color: "rgba(95, 105, 128, 1)",
                cursor: "pointer",
                fontSize: "28px",
              }}
            />
          </Badge>

          <Avatar
            size={48}
            onClick={() => navigate("/home/profile")}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              border: "none",
            }}
            icon={
              <img src="https://cdn.dribbble.com/userupload/3789040/file/original-67198d4faf8efb85544eb048e3239190.png?compress=1&resize=1024x768" />
            }
          />
        </>
      </div>
    </div>
  );
};

export default HomeHeader;
