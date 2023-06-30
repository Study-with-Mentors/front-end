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

export enum LessonParamsType {
  DATE = "DATE",
  MONTH = "MONTH",
}

export const getLessonParams = (
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
      if (
        value.date() == dayjs(lessonInday.startTime).subtract(7, "hour").date()
      ) {
        listData.push({ type: "success", content: "Incoming class" });
      }
    });
    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    return (
      <>
        {listData.map((item) => (
          <Badge
            status={item.type as BadgeProps["status"]}
            text={item.content}
          />
        ))}
      </>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    return dateCellRender(current);
  };

  // if (isLoading) return <Spin />;
  console.log(lessons);

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
