import React from "react";
import LessonCalendar from "../../components/calendar/LessonCalendar";
import styled from "./LessonCalendarPage.module.scss";

const LessonCalendarPage = () => {
  return (
    <div className={styled["container"]}>
      <LessonCalendar />
    </div>
  );
};

export default LessonCalendarPage;
