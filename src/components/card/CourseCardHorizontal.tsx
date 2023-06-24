import React from "react";
import styled from "./CourseCardHorizontal.module.scss";
import { Avatar, Card, Rate, Image, Button } from "antd";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import { Mentor } from "../../types/User.type";

const { Meta } = Card;

export enum CourseCardHorizontalType {
  EDIT = "EDIT",
  VIEW = "VIEW",
}

type CourseCardHorizontalProps = {
  id?: string;
  images: string[];
  mentor: Mentor;
  description: string;
  shortName: string;
  courseLevel: string;
  status?: string;
  type?: CourseCardHorizontalType;
};

const CourseCardHorizontal = ({
  id,
  description,
  images,
  mentor,
  shortName,
  courseLevel,
  status,
  type,
}: CourseCardHorizontalProps) => {
  const navigate = useNavigate();

  const navigateToCourseDetail = () => {
    var url;
    if (type == CourseCardHorizontalType.EDIT) {
      url = `/home/course/edit/${id}`;
    } else {
      url = `/landing/course/${id}`;
    }
    navigate(url);
  };

  return (
    <div className={styled["container"]}>
      <div
        className={styled["image-wrapper"]}
        onClick={() => navigateToCourseDetail()}
      >
        <img className={styled["image"]} alt="example" src={images?.[0]} />
      </div>

      <div className={styled["body-wrapper"]}>
        <div className={styled["header-wrapper"]}>
          <p
            className={styled["coursename"]}
            onClick={() => navigateToCourseDetail()}
          >
            {shortName}
          </p>
          <div className={styled["tag"]}>
            {status ?? courseLevel.toUpperCase()}
          </div>
        </div>
        <div className={styled["description-wrapper"]}>
          <p className={styled["description"]}>{description}</p>
        </div>
        <div className={styled["footer-wrapper"]}>
          <div className={styled["avatar-wrapper"]}>
            <Avatar size={40} src={mentor.profileImage} />
            <p className={styled["name"]}>{mentor.lastName}</p>
          </div>
          <div className={styled["action-wrapper"]}>
            <Button
              className={styled["button"]}
              onClick={() => {
                navigateToCourseDetail();
              }}
              type="primary"
            >
              {type == CourseCardHorizontalType.EDIT ? "Edit Now" : "Enrol now"}
              <ArrowOutwardIcon
                style={{
                  marginLeft: ".1rem",
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
