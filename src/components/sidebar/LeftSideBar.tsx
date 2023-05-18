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

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardFilled style={{ fontSize: "16px" }} />,
  },
  {
    label: "Message",
    key: "message",
    icon: <MessageFilled style={{ fontSize: "16px" }} />,
  },
  {
    label: "Calender",
    key: "calender",
    icon: <CalendarOutlined style={{ fontSize: "16px" }} />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: "alipay",
  },
];

const LeftSideBar = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className={styled["container"]}>
      <Menu
        className={styled["menu"]}
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default LeftSideBar;
