import styled from "./HomeHeader.module.scss";
import { Button, Dropdown, Avatar, Badge } from "antd";
import SearchCard from "../card/SearchCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import "./MainHeader.css";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { GetProfileImage, GetUserResult } from "../../types/User.type";
import { UserAPI } from "../../api/UserAPI";

export type HomeHeaderProps = {};

const HomeHeader = ({}: HomeHeaderProps) => {
  const navigate = useNavigate();

  const {
    data: image,
    isLoading,
    isFetching,
    refetch,
  }: UseQueryResult<GetProfileImage, Error> = useQuery(
    ["userImage"],
    async () => await UserAPI.getUserImageByToken()
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
          <Badge>
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
                // border: "none",
              }}
              icon={<img src={image?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"} />}
            />
          </Dropdown>
        </>
      </div>
    </div>
  );
};

export default HomeHeader;