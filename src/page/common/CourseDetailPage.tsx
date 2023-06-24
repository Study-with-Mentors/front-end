import React from "react";
import { Form, SelectProps } from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GetCourseResult } from "../../types/Course.type";
import { CourseAPI } from "../../api/CourseAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import "./CourseDetailPage.css";

import styled from "./CourseDetailPage.module.scss";

const fieldOptions: SelectProps["options"] = [];

const levelOptions: SelectProps["options"] = [];

const CourseDetailPage = () => {
  const params = useParams();

  const {
    data,
    isLoading,
    refetch,
    isFetching,
  }: UseQueryResult<GetCourseResult, Error> = useQuery(
    ["course", params?.id],
    async () => await CourseAPI.getById(params?.id!),
    {
      enabled: Boolean(params?.id),
    }
  );

  const onFinish = (values: any) => {
    console.log(values);
  };

  const left_profile_fields = [
    {
      type: EDIT_FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Fullname",
        name: "fullname",
        label: "Fullname",
        rules: { required: true, message: "Fullname must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Shortname",
        name: "shortname",
        label: "Shortname",
        rules: { required: true, message: "Shortname must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.TEXTAREA,
      fieldProps: {
        placeholder: "Description",
        name: "description",
        label: "Description",
        rules: { required: true, message: "Description must not empty!" },
        style: {
          marginBottom: "1.6rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Learning outcome",
        name: "learningOutcome",
        label: "Learning outcome",
        rules: { required: true, message: "This field must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
  ];

  const right_profile_fields = [
    {
      type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
      fieldProps: {
        placeholder: "Fields",
        name: "fields",
        label: "Fields",
        rules: { required: true, message: "This field must not empty!" },
        options: fieldOptions,
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
      fieldProps: {
        placeholder: "Status",
        name: "status",
        label: "Status",
        rules: { required: true, message: "This field must not empty!" },
        options: fieldOptions,
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },

    {
      type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
      fieldProps: {
        placeholder: "Intended learner",
        name: "intendedLearner",
        label: "Intended Learner",
        rules: { required: true, message: "This field must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
      fieldProps: {
        name: "Level",
        placeholder: "Level",

        rules: { required: true, message: "This field must be select!" },
        label: "Level",
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.4rem",
        },
        options: levelOptions,
        cols: 12,
      },
    },
    {
      type: EDIT_FIELD_TYPES.BUTTON,
      formProps: {
        // wrapperCol: { span: 24, offset: 17 },
      },
      fieldProps: {
        type: "primary",
        htmlType: "submit",
        text: "Save",
        style: {
          borderRadius: ".5rem",
        },
      },
      cols: 12,
    },
  ];

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <Form
        name="personal_detail"
        wrapperCol={{ span: 16 }}
        initialValues={{
          ["fullname"]: data?.fullName,
          ["shortname"]: data?.shortName,
          ["description"]: data?.description,
          ["learningOutcome"]: data?.learningOutcome,
        }}
        layout="vertical"
        requiredMark="optional"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          display: "flex",
        }}
      >
        <div className={styled["left-wrapper"]}>
          <EditAndUpdateForm fields={left_profile_fields} />
        </div>
        <div className={styled["right-wrapper"]}>
          <EditAndUpdateForm fields={right_profile_fields} />
        </div>
      </Form>
    </div>
  );
};

export default CourseDetailPage;
