import React from "react";
import styled from "./MentorDetail.module.scss";
import { Avatar, Image, Table } from "antd";
import VoIu from "../../assets/voiu.jpg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

export type MentorDetailProps = {
  id: string;
  mentorName: string;
  workPosition: string;
  decription: string;
  skillList: string[];
  location: string;
  email: string;
  mentorBackgrounds: MentorBackground[];
};

export type MentorBackground = {
  image: string;
  name: string;
  position: string;
  time: string;
};

export type CourseDetail = {
  courseName: string;
  price: number;
  level: string;
  numberOfSession: number;
};
export const LEVELTYPE = {
  Beginner: "Beginner",
  Intermidiate: "Intermidiate",
  Senior: "Senior",
};

const LEVEL_MAPPING = {
  [LEVELTYPE.Beginner]: "green",
  [LEVELTYPE.Intermidiate]: "#eab676",
  [LEVELTYPE.Senior]: "red",
};

const fakeMentorCourses: CourseDetail[] = [
  {
    courseName: "UI/UX",
    numberOfSession: 32,
    level: "Beginner",
    price: 200,
  },
  {
    courseName: "NodeJs",
    numberOfSession: 21,
    level: "Intermidiate",
    price: 200,
  },
  {
    courseName: "Hoc lam` ngu`",
    numberOfSession: 1,
    level: "Senior",
    price: 200,
  },
  {
    courseName: "Hoc lam` cho",
    numberOfSession: 32,
    level: "Beginner",
    price: 200,
  },
];

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
    title: "Number Of Session",
    dataIndex: "numberOfSession",
    key: "numberOfSession",
    render: (item: number) => <p style={{ fontWeight: 500 }}>{item} lessons</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (item: number) => <p style={{ fontWeight: 600 }}>VND {item}</p>,
  },
];

const MentorDetail = ({
  id,
  email,
  decription,
  location,
  mentorName,
  skillList,
  workPosition,
  mentorBackgrounds,
}: MentorDetailProps) => {
  return (
    <div className={styled["container"]}>
      <div className={styled["profile-container"]}>
        <div className={styled["avatar-wrapper"]}>
          <div className={styled["image-wrapper"]}>
            <Image className={styled["image"]} src={VoIu} />
          </div>
          <p className={styled["name"]}>{mentorName}</p>
          <p className={styled["desctiption"]}>{workPosition}</p>
        </div>
        <div className={styled["about-wrapper"]}>
          <p className={styled["title"]}>About me</p>
          <p className={styled["description"]}>{decription}</p>
          <div className={styled["skill-wrapper"]}>
            {skillList?.map((item, index) => (
              <span key={index} className={styled["skill"]}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={styled["contact-info"]}>
          <p className={styled["title"]}>Contact Info</p>
          <p className={styled["sub-title"]}>Location</p>
          <div className={styled["content"]}>
            <LocationOnIcon className={styled["icon"]} />
            {location}
          </div>
          <p className={styled["sub-title"]}>Email</p>
          <div className={styled["content"]}>
            <EmailIcon className={styled["icon"]} />
            {email}
          </div>
        </div>
      </div>
      <div className={styled["course-container"]}>
        <div className={styled["certificate-container"]}>
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
        </div>
        <div className={styled["course-wrapper"]}>
          <Table
            columns={columns}
            style={{
              overflow: "hidden",
              borderRadius: "16px",
              padding: "0 20px",
              border: "1px solid #ccc",
            }}
            dataSource={fakeMentorCourses}
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
