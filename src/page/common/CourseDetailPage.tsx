import React, { useMemo } from "react";
import { Form, SelectProps, notification } from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GetCourseResult } from "../../types/Course.type";
import { CourseAPI, UpdateCourseParams } from "../../api/CourseAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import "./CourseDetailPage.css";

import styled from "./CourseDetailPage.module.scss";
import { GetField } from "../../types/Field.type";
import { FieldAPI } from "../../api/FieldAPI";
import { EnumAPI } from "../../api/EnumAPI";
import { useUpdateCourse } from "../../hooks/useUpdateCourseHook";

var fieldOptions: SelectProps["options"] = [];

var levelOptions: SelectProps["options"] = [];

var statusOptions: SelectProps["options"] = [];

var intendedLearnerOptions: SelectProps["options"] = [];

const CourseDetailPage = () => {
  //Notification
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Course update successfully!",
    });
  };
  //

  const params = useParams();
  const {
    mutate: updateCourse,
    isLoading: isUpdateCourseLoading,
    error,
  } = useUpdateCourse();

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

  const {
    data: fields,
    isLoading: isFieldsLoading,
  }: UseQueryResult<GetField[], Error> = useQuery(
    ["fields"],
    async () =>
      await FieldAPI.getAll().then((fields) => {
        fieldOptions = fields.map((field: GetField) => {
          return { value: field.id, label: field.name };
        });
      })
  );

  const {
    data: status,
    isLoading: isStatusLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["status"],
    async () =>
      await EnumAPI.getCourseStatus().then((items) => {
        statusOptions = items.map((item: string) => {
          return { value: item, label: item };
        });
      })
  );

  const {
    data: intendedLearner,
    isLoading: isIntendedLearnerLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["intendtedLearner"],
    async () =>
      await EnumAPI.getCourseIntendedLearner().then((items) => {
        intendedLearnerOptions = items.map((item: string) => {
          return { value: item, label: item };
        });
      })
  );

  const {
    data: levels,
    isLoading: isLevelLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["levels"],
    async () =>
      await EnumAPI.getCourseLevel().then((levels) => {
        levelOptions = levels.map((level: string) => {
          return {
            value: level,
            label: level,
          };
        });
      })
  );

  const onFinish = async (values: any) => {
    const updateParams: UpdateCourseParams = {
      id: params?.id ?? "",
      courseLevel: values?.level,
      description: values?.description,
      field: { id: values?.field },
      fullName: values?.fullname,
      intendedLearner: values?.intendedLearner,
      learningOutcome: values?.learningOutcome,
      shortName: values?.shortname,
      status: values?.status,
      version: 0,
    };
    updateCourse(updateParams, {
      onSuccess(data, variables, context) {
        openNotificationWithIcon();
        refetch();
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
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

  const right_profile_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Field",
          name: "field",
          label: "Field",
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
          options: statusOptions,
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
          options: intendedLearnerOptions,
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
          name: "level",
          placeholder: "Level",
          options: levelOptions,
          rules: { required: true, message: "This field must be select!" },
          label: "Level",
          style: {
            width: "500px",
            height: "50px",
            marginBottom: "3.4rem",
          },
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
          loading: isUpdateCourseLoading,
          style: {
            borderRadius: ".5rem",
          },
        },
        cols: 12,
      },
    ];
  }, [
    isUpdateCourseLoading ||
      isFieldsLoading ||
      isLevelLoading ||
      isStatusLoading ||
      isIntendedLearnerLoading,
  ]);

  if (
    isLoading ||
    isFieldsLoading ||
    isLevelLoading ||
    isStatusLoading ||
    isIntendedLearnerLoading
  )
    return <LoadingSkeleton />;

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
          ["field"]: data?.field.id,
          ["intendedLearner"]: data?.intendedLearner,
          ["status"]: data?.status,
          ["level"]: data?.courseLevel,
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
