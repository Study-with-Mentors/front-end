import { UseQueryResult, useQuery } from "react-query";
import { GetClassResult } from "../../types/Class.type";
import { ClassAPI } from "../../api/ClassAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { Empty, Divider, TabsProps, Button, Tabs } from "antd";
import ClassCardHorizontal from "../../components/card/ClassCardHorizontal";
import dayjs from "dayjs";
import { useMemo } from "react";
import styled from "./EnrolledListClassPage.module.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

const EnrolledListClassPage = () => {
  const navigate = useNavigate();

  const ListClass = () => {
    const {
      data: classes,
      isLoading,
    }: UseQueryResult<GetClassResult[], Error> = useQuery(
      ["classes"],
      async () => await ClassAPI.getClassByUserToken()
    );

    if (isLoading) return <LoadingSkeleton />;
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem 0 1rem  0",
          paddingLeft: ".5rem",
          borderRadius: ".8rem",
        }}
      >
        {classes?.length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          classes?.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "1rem",
              }}
            >
              <ClassCardHorizontal
                startTime={dayjs(item.startDate).format("DD-MM-YYYY")}
                endTime={dayjs(item.endDate).format("DD-MM-YYYY")}
                location="online"
                sessionName="session name"
                mentorImage="none"
                mentorName="none"
                courseId={item.courseId}
                class_id={item.id}
              />
              {index != classes.length - 1 ? <Divider /> : <></>}
            </div>
          ))
        )}
      </div>
    );
  };
  const renderListClass = () => {
    return <ListClass />;
  };

  const TabData: TabsProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: `Enrolled classes`,
        children: renderListClass(),
      },
    ];
  }, []);

  return (
    <div className={styled["container"]}>
      <Tabs
        defaultActiveKey="1"
        className={styled["tabs"]}
        items={TabData}
        // onChange={onChange}
      />
    </div>
  );
};

export default EnrolledListClassPage;
