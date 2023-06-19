import styled from "./HomeHeader.module.scss";
import { Button, Dropdown, Avatar, Badge } from "antd";
import SearchCard from "../card/SearchCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import "./MainHeader.css";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

export type HomeHeaderProps = {};

const HomeHeader = ({}: HomeHeaderProps) => {
  const navigate = useNavigate();

  const userID = localStorage.getItem("userID");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const items: MenuProps["items"] = [
    {
      label: <a onClick={() => navigate("/home/profile")}>Profile</a>,
      key: "0",
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "1",
    },
  ];

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

          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar
              onClick={(e: any) => e.preventDefault()}
              size={48}
              // onClick={() => navigate("/home/profile")}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                border: "none",
              }}
              icon={
                <img src="https://cdn.dribbble.com/userupload/3789040/file/original-67198d4faf8efb85544eb048e3239190.png?compress=1&resize=1024x768" />
              }
            />
          </Dropdown>
        </>
      </div>
    </div>
  );
};

export default HomeHeader;
