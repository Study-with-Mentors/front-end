import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Divider } from "antd";
import styled from "./LeftSideBar.module.scss";
import LogoIcon from "../../assets/main-logo.svg";
import "./LeftSideBar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "",
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
  {
    label: "Logout",
    key: "logout",
    icon: <LogoutIcon style={{ fontSize: "26px" }} />,
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
  const [current, setCurrent] = useState("dashboard");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      localStorage.clear();
      navigate("/signin");
    } else {
      navigate(`${e.key}`);
      setCurrent(e.key);
    }
  };

  return (
    <div className={styled["container"]}>
      <div className={styled["logo-wrapper"]}>
        {/* <img className={styled["logo"]} src={LogoIcon} alt="" /> */}
        <span className={styled["title"]}>Study with mentors</span>
      </div>
      <Divider
        style={{
          marginTop: 0,
          color: "black",
          height: "2px",
        }}
      />
      <Menu
        className={styled["menu"]}
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        style={{
          fontSize: "15px",
          fontWeight: 400,
        }}
        items={items}
      />
    </div>
  );
};

export default LeftSideBar;
