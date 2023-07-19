import React, { useMemo } from "react";
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
import { JwtPayload } from "../../types/Jwt.type";
import { decode } from "../../utils/jwt";
import {
  CalculateDifferencesValues,
  calculateMultipleDifferences,
} from "../../utils/calculateStaticValue";
import {
  useGetClassStaticValueHook,
  useGetReportIncomeStaticValueHook,
} from "../../hooks/staticValueHook";

const DashBoardPage = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  var { uid }: JwtPayload = decode(access_token!);

  const {
    data: searchCourses,
    isLoading: isSearchCoursesLoading,
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["search-courses"],
    async () => await CourseAPI.getAll({ mentorId: uid })
  );

  const { data: searchClass, isLoading: isSearchClassLoading } =
    useGetClassStaticValueHook();

  // const {
  //   data: searchEnrolledClasses,
  //   isLoading: isSearchEnrolledClassesLoading,
  // }: UseQueryResult<GetClassResult[], Error> = useQuery(
  //   ["search-enrolled-classes"],
  //   async () => await ClassAPI.getClassByUserToken()
  // );
  const {
    data: searchIncomeAndEnrollment,
    isLoading: isSearchInComeAndEnrollmentLoading,
  } = useGetReportIncomeStaticValueHook();

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
            <p className={styled["data"]}>
              {searchClass?.numberOfClasses ?? 0}
            </p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>
                {searchClass.staticValue.currentDiff > 0 ? "+ " : " "}
                {searchClass.staticValue.currentDiff}
              </p>{" "}
              <p className={styled["extra"]}>
                From
                {searchClass.staticValue.pastDiff > 0 ? "+ " : " "}
                {searchClass.staticValue.pastDiff}
              </p>
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

        <Spin spinning={isSearchInComeAndEnrollmentLoading}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Enrolled Classes</p>
            <p className={styled["data"]}>
              {searchIncomeAndEnrollment?.totalCurrentEnrollment}
            </p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>
                {searchIncomeAndEnrollment.enrollmentStaticValue.currentDiff > 0
                  ? "+ "
                  : " "}
                {searchIncomeAndEnrollment.enrollmentStaticValue.currentDiff}
              </p>{" "}
              <p className={styled["extra"]}>
                From
                {searchIncomeAndEnrollment.enrollmentStaticValue.pastDiff > 0
                  ? "+ "
                  : " "}
                {searchIncomeAndEnrollment.enrollmentStaticValue.pastDiff}
              </p>
            </div>
          </div>
        </Spin>

        <Spin spinning={isSearchInComeAndEnrollmentLoading}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Earn</p>
            <p className={styled["data"]}>
              {searchIncomeAndEnrollment?.totalCurrentEarning} VND
            </p>
            <div className={styled["extra-data"]}>
              <p className={styled["value"]}>
                {searchIncomeAndEnrollment.earningStaticValue.currentDiff > 0
                  ? "+ "
                  : " "}
                {searchIncomeAndEnrollment.earningStaticValue.currentDiff}
              </p>{" "}
              <p className={styled["extra"]}>
                From
                {searchIncomeAndEnrollment.earningStaticValue.pastDiff > 0
                  ? "+ "
                  : " "}
                {searchIncomeAndEnrollment.earningStaticValue.pastDiff}
              </p>
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
