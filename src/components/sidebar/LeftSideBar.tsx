import React, { useState } from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  DashboardFilled,
  MessageFilled,
  CalendarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styled from "./LeftSideBar.module.scss";
import LogoIcon from "../../assets/main-logo.svg";
import "./LeftSideBar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon style={{ fontSize: "26px" }} />,
  },
  {
    label: "User",
    key: "user",
    icon: <PersonIcon style={{ fontSize: "26px" }} />,
  },
  {
    label: "Course",
    key: "course",
    icon: <BookIcon style={{ fontSize: "26px" }} />,
  },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: "alipay",
  // },
];

const LeftSideBar = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className={styled["container"]}>
      <div className={styled["logo-wrapper"]}>
        <img className={styled["logo"]} src={LogoIcon} alt="" />
        <span className={styled["title"]}>Study with mentors</span>
      </div>
      <Menu
        className={styled["menu"]}
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        style={{
          fontSize: "18px",
          fontWeight: 400,
        }}
        items={items}
      />
    </div>
  );
};

export default LeftSideBar;
