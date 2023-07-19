import React, { useState } from "react";
import styled from "./CoursePage.module.scss";
import { Image, Tabs, Divider, Button, Avatar, Modal, Skeleton } from "antd";
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
import ClassListTable, {
  ClassListTableType,
} from "../../components/card/ClassListTable";

export type CoursePageProps = {};

const CoursePage = () => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: course, isLoading }: UseQueryResult<GetCourseResult, Error> =
    useQuery(
      ["course", params?.id],
      async () => await CourseAPI.getById(params?.id!),
      {
        enabled: Boolean(params.id),
      }
    );

  const {
    data: session,
    isLoading: isLoadingSession,
  }: UseQueryResult<GetSessionResult[], Error> = useQuery(
    ["sessions", course?.id],
    async () => await SessionAPI.getSessionByCourseID(course?.id!),
    {
      enabled: Boolean(course?.id),
    }
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
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
              {isLoading ? (
                <Skeleton.Image />
              ) : (
                <Image
                  loading="lazy"
                  preview={false}
                  height={428}
                  style={{
                    borderRadius: "3%",
                  }}
                  src={course?.image?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"}
                />
              )}
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
                  src={course?.mentor.profileImage?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"}
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
          <p className={styled["price"]}>
            {course?.status === "DISABLE" ? "CLOSED" : "OPEN"}{" "}
          </p>
          <Button
            type="primary"
            className={styled["button"]}
            onClick={showModal}
            disabled={course?.status === "DISABLE" ? true : false}
          >
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
      <Modal
        title="Choose a class"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <ClassListTable
          courseId={params?.id!}
          type={ClassListTableType.DETAIL}
        />
      </Modal>
    </>
  );
};

export default CoursePage;
