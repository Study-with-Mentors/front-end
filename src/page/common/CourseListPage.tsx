import { Avatar, List, Space, TabsProps, Tabs, Empty } from "antd";
import React, { useEffect, useMemo } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../api/CourseAPI";
import { GetCourse, GetCourseResult } from "../../types/Course.type";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import styled from "./CourseListPage.module.scss";
import CourseCardHorizontal, {
  CourseCardHorizontalType,
} from "../../components/card/CourseCardHorizontal";
import Button from "antd/lib/button";
import { useNavigate } from "react-router-dom";
import { JwtPayload } from "../../types/Jwt.type";
import { decode } from "../../utils/jwt";

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
            image={course.image?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"}
            type={CourseCardHorizontalType.EDIT}
          />
        ))
      )}
    </div>
  );
};

const CourseListPage: React.FC = () => {
  const navigate = useNavigate();
  var access_token = localStorage.getItem("access_token");
  var { uid }: JwtPayload = decode(access_token!);

  const { data: courses, isLoading }: UseQueryResult<GetCourseResult[], Error> =
    useQuery(
      ["courses", uid],
      async () => await CourseAPI.getCourseByMentorToken(),
      {
        enabled: Boolean(uid),
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
      // {
      //   key: "2",
      //   label: `Enrolled classes`,
      //   children: renderListClass({}),
      // },
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
