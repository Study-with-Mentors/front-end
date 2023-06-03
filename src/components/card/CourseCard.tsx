import React from "react";
import styled from "./CourseCard.module.scss";
import { Avatar, Card, Rate, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;
export type CourseCardProps = {
  image: string;
  avatar: string;
  description: string;
};

const CourseCard = ({ avatar, image, description }: CourseCardProps) => {
  return (
    <Card
      className={styled["container"]}
      hoverable
      cover={<Image preview={false} src={image} />}
    >
      <Meta
        style={{ display: "flex", alignItems: "center", fontWeight: "500" }}
        avatar={<Avatar size={42} src={avatar} />}
        description="Hello_its_me"
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
