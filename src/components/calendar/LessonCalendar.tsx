import React, { useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar, Spin } from "antd";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import styled from "./LessonCalendar.module.scss";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DayTimeLine from "../timeline/DayTimeLine";
import "./LessonCalendar.css";
import { UseQueryResult, useQuery } from "react-query";
import { GetLessonResult } from "../../types/Lesson.type";
import { GetLessonByDateParams, LessionAPI } from "../../api/LessonAPI";

type GetListDataType = {
  type?: string;
  content?: string;
};

enum LessonParamsType {
  DATE = "DATE",
  MONTH = "MONTH",
}

const getLessonParams = (
  value: Dayjs,
  type: LessonParamsType
): GetLessonByDateParams => {
  var params: GetLessonByDateParams = { upperTime: "", lowerTime: "" };

  switch (type) {
    case LessonParamsType.DATE:
      params = {
        lowerTime: value.format("YYYY-MM-DD 00:00:00"),
        upperTime: value.format("YYYY-MM-DD 23:59:99"),
      };
      break;
    case LessonParamsType.MONTH:
      console.log(
        value.startOf("month").format("YYYY-MM-DD 00:00:00"),
        value.add(1, "month").startOf("month").format("YYYY-MM-DD 23:59:99")
      );

      params = {
        lowerTime: value.startOf("month").format("YYYY-MM-DD 00:00:00"),
        upperTime: value
          .add(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD 23:59:99"),
      };
      break;
    default:
  }

  return params;
};

const LessonCalendar: React.FC = () => {
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState<Dayjs>(() =>
    dayjs(Date.now())
  );

  const { data: lessons, isLoading }: UseQueryResult<GetLessonResult[], Error> =
    useQuery(
      ["lessons", selectedValue],
      async () =>
        await LessionAPI.getLessonByDate(
          getLessonParams(selectedValue, LessonParamsType.DATE)
        )
    );

  const {
    data: lessonsInMonth,
    isLoading: isLessonInMonthLoading,
  }: UseQueryResult<GetLessonResult[], Error> = useQuery(
    ["lessonsInMonth", value],
    async () =>
      await LessionAPI.getLessonByDate(
        getLessonParams(value, LessonParamsType.MONTH)
      )
  );

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const getListData = (value: Dayjs) => {
    let listData: GetListDataType[] = [];
    lessonsInMonth?.forEach((lessonInday: GetLessonResult) => {
      if (value.date() == dayjs(lessonInday.startTime).date()) {
        listData.push({ type: "success", content: "Incoming class" });
      }
    });
    // switch (value.date()) {
    //   case 8:
    //     listData = [
    //       { type: "warning", content: "This is warning event." },
    //       { type: "success", content: "This is usual event." },
    //     ];
    //     break;
    //   case 10:
    //     listData = [
    //       { type: "warning", content: "This is warning event." },
    //       { type: "success", content: "This is usual event." },
    //       { type: "error", content: "This is error event." },
    //     ];
    //     break;
    //   case 15:
    //     listData = [
    //       { type: "warning", content: "This is warning event" },
    //       { type: "success", content: "This is very long usual event。。...." },
    //       { type: "error", content: "This is error event 1." },
    //       { type: "error", content: "This is error event 2." },
    //       { type: "error", content: "This is error event 3." },
    //       { type: "error", content: "This is error event 4." },
    //     ];
    //     break;
    //   default:
    // }
    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    return dateCellRender(current);
  };

  // if (isLoading) return <Spin />;
  // console.log(lessonsInMonth);

  return (
    <>
      <div className={styled["detail-container"]}>
        <Spin spinning={isLoading}>
          <DayTimeLine
            lessonList={lessons}
            date={selectedValue?.format("ddd DD-MM-YYYY")}
          />
        </Spin>
      </div>

      <div className={styled["calendar-container"]}>
        <Spin spinning={isLessonInMonthLoading}>
          <Calendar
            cellRender={cellRender}
            style={{
              padding: "2rem",
            }}
            mode="month"
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
          />
        </Spin>
      </div>
    </>
  );
};

export default LessonCalendar;
