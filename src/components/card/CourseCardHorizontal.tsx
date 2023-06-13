import React from "react";
import styled from "./CourseCardHorizontal.module.scss";
import { Avatar, Card, Rate, Image, Button } from "antd";
import { CourseCardProps } from "./CourseCard";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const CourseCardHorizontal = ({
  avatar,
  image,
  courseName,
  description,
  id,
  mentorName,
}: CourseCardProps) => {
  const navigate = useNavigate();

  const navigateToCourseDetail = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div className={styled["container"]}>
      <div
        className={styled["image-wrapper"]}
        onClick={() => navigateToCourseDetail()}
      >
        <img className={styled["image"]} alt="example" src={image} />
      </div>

      <div className={styled["body-wrapper"]}>
        <div className={styled["header-wrapper"]}>
          <p
            className={styled["coursename"]}
            onClick={() => navigateToCourseDetail()}
          >
            {courseName}
          </p>
          <div className={styled["tag"]}>ADVANCE</div>
        </div>
        <div className={styled["description-wrapper"]}>
          <p className={styled["description"]}>{description}</p>
        </div>
        <div className={styled["footer-wrapper"]}>
          <div className={styled["avatar-wrapper"]}>
            <Avatar size={40} src={avatar} />
            <p className={styled["name"]}>{mentorName}</p>
          </div>
          <div className={styled["action-wrapper"]}>
            <Button className={styled["button"]} type="primary">
              Enrol Now
              <ArrowOutwardIcon
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.2rem",
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
