import React, { Key, useEffect, useState } from "react";
import { Menu, Divider } from "antd";
import type { MenuProps } from "antd";
import { HomeFilled } from "@ant-design/icons";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import styled from "./HomeSideBar.module.scss";
import LogoIcon from "../../assets/Logo.svg";
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from "@mui/icons-material/Logout";
import "./HomeSideBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "/home",
    icon: <HomeFilled style={{ fontSize: "26px" }} />,
  },
  {
    label: "Schedule",
    key: "/home/schedule",
    icon: <AccessTimeIcon style={{ fontSize: "26px" }} />,
  },
  {
    label: "Classes",
    key: "/home/class",
    icon: <ClassIcon style={{ fontSize: "26px" }} />,
  },
  {
    label: "Courses",
    key: "/home/course",
    icon: <CollectionsBookmarkIcon style={{ fontSize: "26px" }} />,
  },
  // {
  //   label: "Achievement",
  //   key: "achievement",
  //   icon: <EmojiEventsIcon style={{ fontSize: "26px" }} />,
  // },
  {
    label: "Logout",
    key: "/home/logout",
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

const HomeSideBar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (location) {
      items.forEach(item => {
        if (location.pathname.includes(item?.key as string)) {
          setCurrent(item?.key as string);
        }
      });
    }
  }, [location, current]);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key == "/home/logout") {
      localStorage.clear();
      navigate("/auth");
    } else {
      navigate(`${e.key}`);
      setCurrent(e.key);
    }
  };

  return (
    <div className={styled["container"]}>
      <div className={styled["logo-wrapper"]}>
        {/* <img className={styled["logo"]} src={LogoIcon} alt="" /> */}
        <Link to={"/"} style={{textDecoration: 'none'}}><div className={styled["title"]}>STUDY WITH MENTOR</div></Link>
        <Divider />
      </div>
      <Menu
        className={styled["menu"]}
        onClick={onClick}
        defaultSelectedKeys={[`${location.pathname}`]}
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

export default HomeSideBar;
