import React from "react";
import styled from "./TutorCard.module.scss";
import { Avatar } from "antd";
import { Card } from "antd";

const { Meta } = Card;

export type TutorCardProps = {
  avatar: string;
  name: string;
  description: string;
};

const TutorCard = ({ avatar, description, name }: TutorCardProps) => {
  return (
    <Card
      className={styled["container"]}
      cover={<Avatar size={272} icon={<img src={avatar} />} />}
    >
      <Meta
        style={{
          textAlign: "center",
        }}
        title={
          <p
            style={{
              fontSize: "22px",
              fontWeight: 500,
              margin: 0,
            }}
          >
            {name}
          </p>
        }
        description={
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "#2E2C2C",
              lineHeight: "30px",
            }}
          >
            {description}
          </p>
        }
      />
    </Card>
  );
};

export default TutorCard;
