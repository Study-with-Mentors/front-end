import React from "react";
import styled from "./SearchCourseResult.module.scss";
import { Form, SelectProps, Divider } from "antd";
import EditAndUpdateForm from "../../components/form/EditAndUpdateFrom";
import { EDIT_FIELD_TYPES } from "../../components/form/EditAndUpdateFrom";
import CourseCard, { CourseCardProps } from "../../components/card/CourseCard";
import { useLocation, useParams } from "react-router-dom";

export type SearchCourseResultProps = {};

const options: SelectProps["options"] = [
  {
    value: "UI/UX",
    label: "UI/UX",
  },
  {
    value: "ComputerScience",
    label: "science",
  },
  {
    value: "Fundamental serviec",
    label: "??",
  },
];

const search_filter_fields = [
  {
    type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
    fieldProps: {
      placeholder: "Fields",
      name: "fields",
      options: options,
      style: {
        width: "400px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
    fieldProps: {
      placeholder: "Fields",
      name: "fields",
      options: options,
      style: {
        width: "400px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
    fieldProps: {
      placeholder: "Fields",
      name: "fields",
      options: options,
      style: {
        width: "400px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },

  {
    type: EDIT_FIELD_TYPES.BUTTON,
    formProps: {},
    fieldProps: {
      type: "primary",
      htmlType: "submit",
      text: "Save",
      style: {
        marginTop: 0,
        // height: "100%",
        // width: "140px",
      },
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
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description:
      "I am so clever that sometimes I don’t understand a single word of what I am saying. People say nothing is impossible.",
  },
];

const SearchCourseResult = ({}: SearchCourseResultProps) => {
  const location = useLocation();
  const state = location.state;

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["title"]}>
          Search Result{" "}
          <span>
            “{state?.searchInput ? state.searchInput : "all courses"}”
          </span>
        </p>
        <p className={styled["sub-title"]}>Filter</p>
        <div className={styled["filter-wrapper"]}>
          <Form
            name="search_filter"
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            layout="inline"
            requiredMark="optional"
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <EditAndUpdateForm fields={search_filter_fields} />
          </Form>
        </div>
        <Divider />
      </div>

      <div className={styled["course-container"]}>
        {fakeCourseData.map((course) => (
          <CourseCard {...course} />
        ))}
      </div>
    </div>
  );
};

export default SearchCourseResult;
