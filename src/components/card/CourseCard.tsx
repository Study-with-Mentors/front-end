import React from "react";
import styled from "./CourseCard.module.scss";
import { Avatar, Card, Rate, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Mentor } from "../../types/User.type";
import { Image as ImageCourse } from "../../types/Image.type";

const { Meta } = Card;
export type CourseCardProps = {
  id?: string;
  image: ImageCourse;
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
  return (
    <Card
      className={styled["container"]}
      hoverable
      cover={
        <Image
          style={{ aspectRatio: "3/2" }}
          preview={false}
          src={image.url}
        />
      }
    >
      <Meta
        style={{ display: "flex", alignItems: "center", fontWeight: "500" }}
        avatar={<Avatar size={42} src={mentor.profileImage} />}
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
