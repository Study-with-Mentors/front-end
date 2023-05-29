import React from "react";
import styled from "./CourseCard.module.scss";
import { Avatar, Card, Rate } from "antd";
import Image from "../../assets/310876606_2194096234108406_8917809045783773918_n.jpg";
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
      style={{ width: 450 }}
      cover={<img alt="example" src={image} />}
    >
      <Meta
        style={{ display: "flex", alignItems: "center", fontWeight: "500" }}
        avatar={<Avatar src={avatar} />}
        description="Hello_its_me"
      />

      <p className={styled["description"]}>{description}</p>
      <Rate />
    </Card>
  );
};

export default CourseCard;
