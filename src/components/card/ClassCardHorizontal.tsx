import React from "react";
import { Avatar, Button, Spin } from "antd";
import styled from "./ClassCardHorizontal.module.scss";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../api/CourseAPI";
import { GetCourseResult } from "../../types/Course.type";
import { useNavigate } from "react-router-dom";

export type ClassCardHorizontalProps = {
  startTime: string;
  endTime: string;
  location: string;
  sessionName: string;
  courseId: string;
  mentorName?: string;
  mentorImage?: string;
  class_id: string;
};

export const ClassCardHorizontal = ({
  startTime,
  endTime,
  location,
  sessionName,
  mentorImage,
  courseId,
  mentorName,
  class_id,
}: ClassCardHorizontalProps) => {
  const navigate = useNavigate();

  const { data: course, isLoading }: UseQueryResult<GetCourseResult, Error> =
    useQuery(
      ["course", courseId],
      async () => await CourseAPI.getById(courseId)
    );

  if (isLoading) return <Spin />;

  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["header"]}>
          <div className={styled["icon-wrapper"]}>
            <AccessTimeFilledIcon className={styled["icon"]} /> {startTime} to{" "}
            {endTime}
          </div>
          <div className={styled["icon-wrapper"]}>
            <FmdGoodIcon
              style={{
                fontSize: "1.3rem",
              }}
              className={styled["icon"]}
            />{" "}
            {location}
          </div>
        </div>
        <div className={styled["body"]}>
          <p className={styled["sessionName"]}>{course?.fullName}</p>
          <div className={styled["avatar-wrapper"]}>
            <Avatar
              className={styled["avatar"]}
              src={course?.mentor.profileImage.url}
            />
            <p>{course?.mentor.lastName}</p>
          </div>
        </div>
        <div className={styled["footer"]}>
          <Button
            onClick={() => navigate(`/home/class/${class_id}`)}
            className={styled["button"]}
          >
            Detail
          </Button>
        </div>
      </div>
    </>
  );
};

export default ClassCardHorizontal;
