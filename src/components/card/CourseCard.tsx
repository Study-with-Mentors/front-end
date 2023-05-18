import React from "react";
import styled from "./CourseCard.module.scss";
import { Avatar, Card, Rate } from "antd";
import Image from "../../assets/310876606_2194096234108406_8917809045783773918_n.jpg";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CourseCard = () => {
  return (
    <Card
      className={styled["container"]}
      hoverable
      style={{ width: 375 }}
      cover={<img alt="example" src={Image} />}
    >
      <Meta
        style={{ display: "flex", alignItems: "center", fontWeight: "500" }}
        avatar={<Avatar src={Image} />}
        description="Hello_its_me"
      />

      <p className={styled["description"]}>
        Introduction to FPT The bet' uni ver sity in the world of this fckign
        planet
      </p>
      <Rate />
    </Card>
  );
};

export default CourseCard;
