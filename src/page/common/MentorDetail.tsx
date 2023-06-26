import React from "react";
import styled from "./MentorDetail.module.scss";
import { Avatar, Image, Table } from "antd";
import VoIu from "../../assets/voiu.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { UseQueryResult, useQuery } from "react-query";
import { GetUserResult } from "../../types/User.type";
import { UserAPI } from "../../api/UserAPI";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { GetCourse, GetCourseResult } from "../../types/Course.type";
import { CourseAPI } from "../../api/CourseAPI";

export type MentorDetailProps = {
  // id: string;
  // mentorName: string;
  // workPosition: string;
  // decription: string;
  // skillList: string[];
  // location: string;
  // email: string;
  // mentorBackgrounds: MentorBackground[];
};

export type MentorBackground = {
  image: string;
  name: string;
  position: string;
  time: string;
};

export type CourseDetail = {
  courseName: string;
  field: string;
  level: string;
  status: string;
};
export const LEVELTYPE = {
  ADVANCE: "ADVANCE",
  FUNDAMENTAL: "FUNDAMENTAL",
};

const LEVEL_MAPPING = {
  [LEVELTYPE.ADVANCE]: "green",
  [LEVELTYPE.FUNDAMENTAL]: "#eab676",
};

var mentorCourses: CourseDetail[] = [];

const columns = [
  {
    title: "Course Name",
    dataIndex: "courseName",
    key: "courseName",
    render: (item: string) => <p style={{ fontWeight: 700 }}>{item}</p>,
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
    render: (text: string) => {
      return (
        <p
          style={{
            color: LEVEL_MAPPING[text],
          }}
        >
          {text}
        </p>
      );
    },
  },
  {
    title: "Field",
    dataIndex: "field",
    key: "field",
    render: (item: string) => <p style={{ fontWeight: 500 }}>{item}</p>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (item: string) => <p style={{ fontWeight: 600 }}>{item}</p>,
  },
];

const MentorDetail = ({}: MentorDetailProps) => {
  const params = useParams();

  const { data, isLoading }: UseQueryResult<GetUserResult, Error> = useQuery(
    ["user", params?.id],
    async () => await UserAPI.getMentorProfileById(params?.id ?? "")
  );

  const {
    data: courses,
    isLoading: isCoursesLoading,
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses", params?.id],
    async () =>
      await CourseAPI.getAll({ mentorId: params?.id }).then(
        (courses: GetCourse) =>
          (mentorCourses = courses?.result.map(
            (course: GetCourseResult): CourseDetail => {
              return {
                courseName: course.fullName,
                level: course.courseLevel,
                field: course.field.name,
                status: course.status,
              };
            }
          ))
      )
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <div className={styled["profile-container"]}>
        <div className={styled["avatar-wrapper"]}>
          <div className={styled["image-wrapper"]}>
            <Image className={styled["image"]} src={data?.profileImage} />
          </div>
          <p className={styled["name"]}>{data?.lastName}</p>
          <p className={styled["desctiption"]}>Degree: {data?.mentor.degree}</p>
        </div>

        <div className={styled["contact-info"]}>
          <p className={styled["title"]}>Contact Info</p>
          <p className={styled["sub-title"]}>Location</p>
          <div className={styled["content"]}>
            <LocationOnIcon className={styled["icon"]} />
            HCM City
          </div>
          <p className={styled["sub-title"]}>Email</p>
          <div className={styled["content"]}>
            <EmailIcon className={styled["icon"]} />
            {data?.email}
          </div>
        </div>
      </div>
      <div className={styled["course-container"]}>
        <div className={styled["about-wrapper"]}>
          <p className={styled["title"]}>About me</p>
          <p className={styled["description"]}>{data?.mentor.bio}</p>
          <div className={styled["skill-wrapper"]}>
            {/* {skillList?.map((item, index) => ( */}
            <span className={styled["skill"]}>{data?.mentor.field.name}</span>
            {/* ))} */}
          </div>
        </div>
        {/* <div className={styled["certificate-container"]}>
          <p className={styled["title"]}> Education Background</p>
          {mentorBackgrounds?.map((item, index) => (
            <div key={index} className={styled["certificate-wrapper"]}>
              {" "}
              <Avatar
                size={68}
                style={{
                  border: "1px solid #ccc",
                }}
                src={item.image}
                alt=""
              />
              <div className={styled["content"]}>
                <div className={styled["name"]}>{item.name}</div>
                <div className={styled["position"]}>{item.position}</div>
                <div className={styled["time"]}>{item.time}</div>
              </div>
              <div className={styled["link"]}>
                Show Credential
                <InsertLinkOutlinedIcon className={styled["icon"]} />
              </div>
            </div>
          ))}
        </div> */}
        <div className={styled["course-wrapper"]}>
          <Table
            columns={columns}
            loading={isCoursesLoading}
            style={{
              overflow: "hidden",
              borderRadius: "16px",
              padding: "0 20px",
              border: "1px solid #ccc",
            }}
            dataSource={mentorCourses}
            showHeader={false}
            title={() => (
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  marginBottom: 0,
                }}
              >
                Courses
              </p>
            )}
            // footer={() => "Footer"}
          />
        </div>
      </div>
    </div>
  );
};

export default MentorDetail;
