import React from "react";
import { List, Avatar, Spin } from "antd";
import styled from "./DashBoardPage.module.scss";
import { GetCourse, GetCourseResult } from "../../types/Course.type";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../api/CourseAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { GetLessonResult } from "../../types/Lesson.type";
import { LessionAPI } from "../../api/LessonAPI";
import {
  LessonParamsType,
  getLessonParams,
} from "../../components/calendar/LessonCalendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { GetClassResult, GetSearchClass } from "../../types/Class.type";
import { ClassAPI } from "../../api/ClassAPI";
import { GetIncomeResult } from "../../types/User.type";
import { UserAPI } from "../../api/UserAPI";

const DashBoardPage = () => {
  const navigate = useNavigate();

  const {
    data: searchCourses,
    isLoading: isSearchCoursesLoading,
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["search-courses"],
    async () =>
      await CourseAPI.getAll({ mentorId: localStorage.getItem("userID")! })
  );

  const {
    data: searchClass,
    isLoading: isSearchClassLoading,
  }: UseQueryResult<GetSearchClass, Error> = useQuery(
    ["search-classes"],
    async () =>
      await ClassAPI.searchClass({ mentorId: localStorage.getItem("userID")! })
  );

  const {
    data: searchEnrolledClasses,
    isLoading: isSearchEnrolledClassesLoading,
  }: UseQueryResult<GetClassResult[], Error> = useQuery(
    ["search-enrolled-classes"],
    async () => await ClassAPI.getClassByUserToken()
  );
  const {
    data: searchIncomeMentor,
    isLoading: isSearchInComeMentorLoading,
  }: UseQueryResult<GetIncomeResult, Error> = useQuery(
    ["search-income-mentor"],
    async () =>
      await UserAPI.getMentorIncome({
        startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
        endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
      })
  );

  const {
    data: lessons,
    isLoading: isLessonsLoading,
  }: UseQueryResult<GetLessonResult[], Error> = useQuery(
    ["lessons"],
    async () =>
      await LessionAPI.getLessonByDate(
        getLessonParams(dayjs(), LessonParamsType.MONTH)
      )
  );

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <Spin spinning={isSearchClassLoading}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Created Classes</p>
            <p className={styled["data"]}>{searchClass?.totalElements}</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>+45%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
        </Spin>

        <Spin spinning={isSearchCoursesLoading}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Courses</p>
            <p className={styled["data"]}>{searchCourses?.totalElements}</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>+45%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
        </Spin>

        <Spin spinning={isSearchEnrolledClassesLoading}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Enrolled Classes</p>
            <p className={styled["data"]}>{searchEnrolledClasses?.length}</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>+45%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
        </Spin>

        <Spin spinning={isSearchInComeMentorLoading}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Earn</p>
            <p className={styled["data"]}>
              {searchIncomeMentor?.totalEarning} VND
            </p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>+45%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
        </Spin>
      </div>

      <div className={styled["body"]}>
        <List
          className={styled["body-wrapper"]}
          itemLayout="horizontal"
          dataSource={searchCourses?.result}
          header={<div>Your courses</div>}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={40} src={`${item.image.url}`} />}
                title={
                  <a onClick={() => navigate(`/home/course/edit/${item.id}`)}>
                    {item.fullName}
                  </a>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />

        <List
          className={styled["body-wrapper"]}
          itemLayout="horizontal"
          dataSource={lessons}
          header={<div>Incoming classes</div>}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={
                  <a onClick={() => navigate(`/home/class/${item.clazzId}`)}>
                    {item.sessionName}
                  </a>
                }
                description={dayjs(item.startTime).format("YYYY-MM-DD HH:mm")}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default DashBoardPage;
