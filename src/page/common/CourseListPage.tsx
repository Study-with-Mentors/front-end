import { Avatar, List, Space, TabsProps, Tabs, Empty, Divider } from "antd";
import React, { useEffect, useMemo } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../api/CourseAPI";
import { GetCourse, GetCourseResult } from "../../types/Course.type";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import styled from "./CourseListPage.module.scss";
import CourseCardHorizontal, {
  CourseCardHorizontalType,
} from "../../components/card/CourseCardHorizontal";
import { GetClassResult } from "../../types/Class.type";
import { ClassAPI } from "../../api/ClassAPI";
import Button from "antd/lib/button";
import { useNavigate } from "react-router-dom";
import ClassCardHorizontal from "../../components/card/ClassCardHorizontal";
import dayjs from "dayjs";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const onChange = (key: string) => {
  console.log(key);
};

type renderListCourseProps = {
  listCourse: GetCourseResult[];
};

const renderListCourse = ({ listCourse }: renderListCourseProps) => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {listCourse && listCourse.length <= 0 ? (
        <Empty />
      ) : (
        listCourse.map((course) => (
          <CourseCardHorizontal
            key={course.id}
            {...course}
            image={course.image.url}
            type={CourseCardHorizontalType.EDIT}
          />
        ))
      )}
    </div>
  );
};

const ListClass = () => {
  const { data: classes, isLoading }: UseQueryResult<GetClassResult[], Error> =
    useQuery(["classes"], async () => await ClassAPI.getClassByUserToken());

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
      {classes?.map((item, index) => (
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
          />
          {index != classes.length - 1 ? <Divider /> : <></>}
        </div>
      ))}
    </div>
  );
};

const renderListClass = ({}) => {
  return <ListClass />;
};

const CourseListPage: React.FC = () => {
  const navigate = useNavigate();
  const mentorID = localStorage.getItem("userID");

  const { data: courses, isLoading }: UseQueryResult<GetCourseResult[], Error> =
    useQuery(
      ["courses", mentorID],
      async () => await CourseAPI.getCourseByMentorToken(),
      {
        enabled: Boolean(mentorID),
      }
    );

  // const {
  //   data: courses,
  //   error,
  //   isLoading,
  //   mutate,
  // } = useGetCourseByMentorToken();

  // mutate();
  // console.log(courses);

  const TabData: TabsProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: `Your courses`,
        children: renderListCourse({ listCourse: courses ?? [] }),
      },
      {
        key: "2",
        label: `Enrolled classes`,
        children: renderListClass({}),
      },
    ];
  }, [courses]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <Tabs
        defaultActiveKey="1"
        className={styled["tabs"]}
        items={TabData}
        onChange={onChange}
        tabBarExtraContent={
          <Button onClick={() => navigate("/course/create")} type="primary">
            Create course
          </Button>
        }
      />
    </div>
  );
};

export default CourseListPage;
