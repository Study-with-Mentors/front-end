import React from "react";
import styled from "./CourseCard.module.scss";
import { Avatar, Card, Rate, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;
export type CourseCardProps = {
  id?: string;
  image: string;
  avatar: string;
  description: string;
  courseName: string;
  mentorName: string;
};

const CourseCard = ({
  avatar,
  image,
  description,
  courseName,
}: CourseCardProps) => {
  return (
    <Card
      className={styled["container"]}
      hoverable
      cover={
        <Image style={{ aspectRatio: "3/2" }} preview={false} src={image} />
      }
    >
      <Meta
        style={{ display: "flex", alignItems: "center", fontWeight: "500" }}
        avatar={<Avatar size={42} src={avatar} />}
        description={courseName}
      />
      <p className={styled["description"]}>{description}</p>

      <Rate
        style={{
          fontSize: "12px",
        }}
      />
    </Card>
  );
};

export default CourseCard;
