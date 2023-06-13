import React, { useState } from "react";
import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import styled from "./LessonCalendar.module.scss";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import DayTimeLine from "../timeline/DayTimeLine";

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const LessonCalendar: React.FC = () => {
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
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

  return (
    <>
      <div className={styled["detail-container"]}>
        <DayTimeLine />
        {/* {selectedValue?.format("YYYY-MM-DD")} */}
      </div>
      <Calendar
        cellRender={cellRender}
        mode="month"
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      ;
    </>
  );
};

export default LessonCalendar;
