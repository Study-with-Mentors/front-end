import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Avatar, Button, Radio, Timeline } from "antd";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import boxStyled from "./BoxLine.module.scss";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

type LineBoxProps = {
  startTime: string;
  endTime: string;
  location: string;
  sessionName: string;
};

const LineBox = ({
  startTime,
  endTime,
  location,
  sessionName,
}: LineBoxProps) => {
  return (
    <>
      <div className={boxStyled["container"]}>
        <div className={boxStyled["header"]}>
          <div className={boxStyled["icon-wrapper"]}>
            <AccessTimeFilledIcon className={boxStyled["icon"]} /> {startTime} -{" "}
            {endTime}
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
          <p className={boxStyled["sessionName"]}>{sessionName}</p>
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
    </>
  );
};

const fakeLineBoxData: LineBoxProps = {
  endTime: "end time",
  location: "online",
  sessionName: "This is course name",
  startTime: "start time",
};

type DateTimeLineProps = {
  date: string;
};

const DayTimeLine = ({ date }: DateTimeLineProps) => {
  return (
    <div style={{ marginTop: "20px", padding: "2rem 0 .8rem 1rem " }}>
      <h3
        style={{
          margin: "0 0 1.5rem 0",
        }}
      >
        {date}
      </h3>
      <Timeline
        mode={"left"}
        items={[
          {
            children: <LineBox {...fakeLineBoxData} />,
          },
          {
            children: <LineBox {...fakeLineBoxData} />,
          },
          {
            children: <LineBox {...fakeLineBoxData} />,
          },
          {
            children: <LineBox {...fakeLineBoxData} />,
          },
        ]}
      />
    </div>
  );
};

export default DayTimeLine;
