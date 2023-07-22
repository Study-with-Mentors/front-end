import React from "react";
import styled from "./TutorCard.module.scss";
import { Avatar } from "antd";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./TutorCard.css";
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
      cover={
        avatar ? (
          <Avatar
            style={{
              width: "14rem",
              height: "14rem",
              marginTop: "2rem",
              border: "1px solid #ccc",
            }}
            src={avatar}
          />
        ) : (
          <Avatar
            style={{
              width: "14rem",
              height: "14rem",
              marginTop: "2rem",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
            }}
            icon={
              <UserOutlined
                style={{
                  fontSize: "2em",
                }}
              />
            }
            alt="avatar"
          />
        )
      }
      bordered={false}
      style={{
        width: "90%",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
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
              fontSize: "15px",
              fontWeight: 300,
              color: "#8c8c8c",
              lineHeight: "36px",
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
