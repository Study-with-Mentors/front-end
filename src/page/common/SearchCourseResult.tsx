import React, { useState } from "react";
import styled from "./SearchCourseResult.module.scss";
import { Form, SelectProps, Divider, Button, Pagination } from "antd";
import EditAndUpdateForm from "../../components/form/EditAndUpdateFrom";
import { EDIT_FIELD_TYPES } from "../../components/form/EditAndUpdateFrom";
import CourseCard, { CourseCardProps } from "../../components/card/CourseCard";
import { useLocation, useParams } from "react-router-dom";
import "./SearchCourseResult.css";
import CourseCardHorizontal from "../../components/card/CourseCardHorizontal";

export type SearchCourseResultProps = {};

const options: SelectProps["options"] = [
  {
    value: "UI/UX",
    label: "UI/UX",
    style: {
      marginBottom: "12px",
      color: "#5F6980",
    },
  },
  {
    value: "ComputerScience",
    label: "science",
    style: {
      marginBottom: "12px",
      color: "#5F6980",
    },
  },
  {
    value: "Fundamental serviec",
    label: "fundamental",
    style: {
      marginBottom: "12px",
      color: "#5F6980",
    },
  },
];

const search_filter_fields = [
  {
    type: EDIT_FIELD_TYPES.SELECT,
    fieldProps: {
      placeholder: "Fields",
      name: "fields",
      options: options,
      label: (
        <p
          style={{
            fontWeight: 700,
            fontSize: "24px",
            color: "#262626",
            margin: 0,
          }}
        >
          Field
        </p>
      ),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        marginBottom: "20px",
        fontWeight: 700,
        fontSize: "20px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: EDIT_FIELD_TYPES.SELECT,
    fieldProps: {
      name: "level",
      options: options,
      label: (
        <p
          style={{
            fontWeight: 700,
            fontSize: "24px",
            color: "#262626",
            margin: 0,
          }}
        >
          Level
        </p>
      ),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        marginBottom: "20px",
        fontWeight: 700,
        fontSize: "20px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
];

const fakeCourseData: CourseCardProps[] = [
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
    courseName: "Material UI/UX",
    mentorName: "hello_its_me",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
    courseName: "Material UI/UX",
    mentorName: "hello_its_me",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am do 11 1 1  saying. People say nothing is impossible.",
    courseName: "Material UI/UX",
    mentorName: "hello_its_me",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
    courseName: "Material UI/UX",
    mentorName: "hello_its_me",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
    courseName: "Material UI/UX",
    mentorName: "hello_its_me",
  },
];

const enum ACTIVE_BUTTON_TYPES {
  NEWEST,
  OLDEST,
  POPULAR,
}

const SearchCourseResult = ({}: SearchCourseResultProps) => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<ACTIVE_BUTTON_TYPES>(
    ACTIVE_BUTTON_TYPES.NEWEST
  );
  // const state = location.state;

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        {/* <p className={styled["title"]}>
          Search Result{" "}
          <span>
            “{state?.searchInput ? state.searchInput : "all courses"}”
          </span>
        </p> */}
        <p className={styled["sub-title"]}>Filter By</p>
        <div className={styled["sort-container"]}>
          <p className={styled["title"]}>Sort By</p>
          <Button
            className={
              styled["button"] +
              " " +
              (activeButton == ACTIVE_BUTTON_TYPES.NEWEST
                ? styled["active"]
                : "")
            }
            onClick={() => setActiveButton(ACTIVE_BUTTON_TYPES.NEWEST)}
          >
            Newest
          </Button>
          <Button
            className={
              styled["button"] +
              " " +
              (activeButton == ACTIVE_BUTTON_TYPES.OLDEST
                ? styled["active"]
                : "")
            }
            onClick={() => setActiveButton(ACTIVE_BUTTON_TYPES.OLDEST)}
          >
            Oldest
          </Button>
          <Button
            className={
              styled["button"] +
              " " +
              (activeButton == ACTIVE_BUTTON_TYPES.POPULAR
                ? styled["active"]
                : "")
            }
            onClick={() => setActiveButton(ACTIVE_BUTTON_TYPES.POPULAR)}
          >
            Popular
          </Button>
        </div>
      </div>
      <div className={styled["body-container"]}>
        <div className={styled["filter-wrapper"]}>
          <Form
            name="search_filter"
            wrapperCol={{ span: 16 }}
            initialValues={{}}
            layout="vertical"
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <EditAndUpdateForm fields={search_filter_fields} />
          </Form>
        </div>

        <div className={styled["course-container"]}>
          {fakeCourseData.map((course) => (
            <CourseCardHorizontal {...course} />
          ))}
        </div>
      </div>
      <Pagination
        style={{
          marginLeft: "auto",
          marginBottom: "200px",
        }}
        defaultCurrent={1}
        total={50}
      />
    </div>
  );
};

export default SearchCourseResult;
