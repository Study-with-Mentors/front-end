import React from "react";
import { Avatar, Button } from "antd";
import { LineBox, LineBoxProps } from "../timeline/DayTimeLine";
import styled from "./ClassCardHorizontal.module.scss";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

export type ClassCardHorizontalProps = {
  startTime: string;
  endTime: string;
  location: string;
  sessionName: string;
  mentorName: string;
  mentorImage: string;
};

export const ClassCardHorizontal = ({
  startTime,
  endTime,
  location,
  sessionName,
  mentorImage,
  mentorName,
}: ClassCardHorizontalProps) => {
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
          <p className={styled["sessionName"]}>{sessionName}</p>
          <div className={styled["avatar-wrapper"]}>
            <Avatar className={styled["avatar"]} src={mentorImage} />
            <p>{mentorName}</p>
          </div>
        </div>
        <div className={styled["footer"]}>
          <Button className={styled["button"]}>Detail</Button>
        </div>
      </div>
    </>
  );
};

export default ClassCardHorizontal;
