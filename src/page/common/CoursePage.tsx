import React from "react";
import styled from "./CoursePage.module.scss";
import { Image, Tabs, Divider, Button, Avatar } from "antd";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useParams } from "react-router-dom";
import { UseQueryResult, useQuery } from "react-query";
import { GetCourseResult } from "../../types/Course.type";
import { CourseAPI } from "../../api/CourseAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { GetSessionResult } from "../../types/Session.type";
import { SessionAPI } from "../../api/SessionAPI";
import { SessionCard } from "../../components/card/SessionCard";

export type CoursePageProps = {};

const CoursePage = () => {
  const params = useParams();

  const { data: course, isLoading }: UseQueryResult<GetCourseResult, Error> =
    useQuery(
      ["course", params?.id],
      async () => await CourseAPI.getById(params?.id ?? "0"),
      {
        enabled: Boolean(params.id),
      }
    );

  const {
    data: session,
    isLoading: isLoadingSession,
  }: UseQueryResult<GetSessionResult[], Error> = useQuery(
    ["sessions", course?.id],
    async () => await SessionAPI.getSessionByCourseID(course?.id ?? "0"),
    {
      enabled: Boolean(params.id),
    }
  );

  if (isLoading && isLoadingSession) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <div className={styled["body-wrapper"]}>
        <div className={styled["header"]}>
          <p className={styled["title"]}>Discover</p>
          <p className={styled["description"]}>
            Courses &gt; <span>{course?.shortName}</span>
          </p>
        </div>
        <div className={styled["body"]}>
          <div className={styled["image"]}>
            <Image
              preview={false}
              height={428}
              style={{
                borderRadius: "3%",
              }}
              src="https://cdn.dribbble.com/userupload/5814653/file/original-f197c4a6a7350813f3d6d941a7e1dc2f.png?compress=1&resize=1024x768"
            />
          </div>
          <div className={styled["body_header-wrapper"]}>
            <p className={styled["title"]}>{course?.fullName}</p>
            <p className={styled["create-by"]}>
              By{" "}
              <Avatar
                style={{
                  border: "1px solid #ccc",
                  margin: "0 .1rem 0 .2rem",
                }}
                src={course?.mentor.profileImage}
              />{" "}
              <span>{course?.mentor.lastName}</span>
            </p>
            <Tabs
              defaultActiveKey="2"
              items={[
                {
                  label: "Information",
                  key: "Information",
                  children: course?.description,
                },
                {
                  label: "Lession",
                  key: "Lession",
                  children: session?.map((item, index) =>
                    SessionCard({
                      key: index,
                      title: item.sessionName,
                      sessionNumber: item.sessionNum,
                      descrition: item.description,
                    })
                  ),
                },
              ]}
              // items={["Information", "Content"].map((item, i) => {
              //   return {
              //     label: <span>Tab {item}</span>,
              //     key: item,
              //     children: `Tab ${item}`,
              //   };
              // })}
            />
            <Divider />
          </div>
        </div>
      </div>
      <div className={styled["sidebar"]}>
        <p className={styled["price"]}>VND 200</p>
        <Button type="primary" className={styled["button"]}>
          <ShoppingCartOutlinedIcon
            style={{
              marginRight: "16px",
            }}
          />{" "}
          Buy Now
        </Button>
        <Divider />
        <p className={styled["title"]}>What you'll learn</p>
        <p className={styled["description"]}>{course?.description}</p>
        <Divider />
        <p className={styled["title"]}>This course includes:</p>
        <p className={styled["course-activity"]}>
          <StarBorderOutlinedIcon className={styled["icon"]} />
          {" 100% Positive review (10)"}
        </p>
        <p className={styled["course-activity"]}>
          <AccessibleForwardOutlinedIcon className={styled["icon"]} />
          {" 15 Students"}
        </p>
        <p className={styled["course-activity"]}>
          <PlayLessonOutlinedIcon className={styled["icon"]} />
          {session?.length + " Lessons"}
        </p>
        {/* <p className={styled["course-activity"]}>
          <BackupTableOutlinedIcon className={styled["icon"]} />
          {" 5 Courses"}
        </p> */}
        <p className={styled["course-activity"]}>
          <BarChartOutlinedIcon className={styled["icon"]} />
          {" Level: " + course?.courseLevel}
        </p>
        <Divider />
        <p className={styled["title"]}>Tags:</p>
        <div className={styled["tag"]}>{course?.learningOutcome}</div>
      </div>
    </div>
  );
};

export default CoursePage;
