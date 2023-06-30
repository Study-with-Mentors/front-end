import React from "react";
import styled from "./CourseCard.module.scss";
import { Avatar, Card, Rate, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Mentor } from "../../types/User.type";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
export type CourseCardProps = {
  id?: string;
  image: string;
  mentor: Mentor;
  description: string;
  shortName: string;
  courseLevel: string;
};

const CourseCard = ({
  id,
  image,
  description,
  mentor,
  shortName,
}: CourseCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className={styled["container"]}
      hoverable
      onClick={() => navigate(`/course/${id}`)}
      cover={
        <Image style={{ aspectRatio: "3/2" }} preview={false} src={image} />
      }
    >
      <Meta
        style={{ display: "flex", alignItems: "center", fontWeight: "500" }}
        avatar={<Avatar size={42} src={mentor.profileImage.url} />}
        description={shortName}
      />
      <p className={styled["description"]}>{description}</p>

      {/* <Rate
        style={{
          fontSize: "12px",
        }}
      /> */}
    </Card>
  );
};

export default CourseCard;
