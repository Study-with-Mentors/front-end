import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Avatar, Button, Radio, Spin, Timeline } from "antd";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import boxStyled from "./BoxLine.module.scss";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { GetCourseResult } from "../../types/Course.type";
import { GetLessonResult } from "../../types/Lesson.type";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../api/CourseAPI";
import dayjs from "dayjs";

export type LineBoxProps = {
  courseId: string;
  startTime: Date;
  endTime: Date;
  location: string;
};

export const LineBox = ({
  startTime,
  endTime,
  location,
  courseId,
}: LineBoxProps) => {
  const { data, isLoading }: UseQueryResult<GetCourseResult, Error> = useQuery(
    ["course", courseId],
    async () => await CourseAPI.getById(courseId)
  );
  return (
    <Spin spinning={isLoading}>
      <div className={boxStyled["container"]}>
        <div className={boxStyled["header"]}>
          <div className={boxStyled["icon-wrapper"]}>
            <AccessTimeFilledIcon className={boxStyled["icon"]} />{" "}
            {dayjs(startTime).format("LT")} - {dayjs(endTime).format("LT")}
          </div>
          <div className={boxStyled["icon-wrapper"]}>
            <FmdGoodIcon
              style={{
                fontSize: "1.3rem",
              }}
              className={boxStyled["icon"]}
            />{" "}
            {location}
          </div>
        </div>
        <div className={boxStyled["body"]}>
          <p className={boxStyled["sessionName"]}>{data?.fullName}</p>
          <Avatar.Group
            maxCount={2}
            maxStyle={{
              width: "1.6rem",
              height: "1.6rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: ".7rem",
            }}
          >
            <Avatar
              className={boxStyled["avatar"]}
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
            />
            <Avatar
              className={boxStyled["avatar"]}
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
            />
            <Avatar
              className={boxStyled["avatar"]}
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
            />
          </Avatar.Group>
        </div>
        <div className={boxStyled["footer"]}>
          <Button className={boxStyled["button"]}>Detail</Button>
        </div>
      </div>
    </Spin>
  );
};

type DateTimeLineProps = {
  date: string;
  lessonList?: GetLessonResult[];
};

const DayTimeLine = ({ date, lessonList }: DateTimeLineProps) => {
  const timelineItems = lessonList?.map((lesson: GetLessonResult) => {
    return {
      // children: <LineBox {...lesson} />,
    };
  });

  return (
    <div style={{ marginTop: "20px", padding: "2rem 0 .8rem 1rem " }}>
      <h3
        style={{
          margin: "0 0 1.5rem 0",
        }}
      >
        {date}
      </h3>
      <Timeline mode={"left"} items={timelineItems} />
    </div>
  );
};

export default DayTimeLine;
