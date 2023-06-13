import React, { useEffect } from "react";
import styled from "./CreateCoursePage.module.scss";
import { Col, Image, Row, Form, SelectProps, Button } from "antd";
import ArtistPainting from "../../assets/ArtistPaintor.png";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UseQueryResult, useQuery } from "react-query";
import { FieldAPI, GetField } from "../../api/FieldAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { useCreateCourse } from "../../hooks/useCreateCourseHook";
import { CreateCourseParams } from "../../api/CourseAPI";
import { useNavigate } from "react-router-dom";

const fieldOptions: SelectProps["options"] = [
  // {
  //   value: "UI/UX",
  //   label: "UI/UX",
  // },
  // {
  //   value: "ComputerScience",
  //   label: "science",
  // },
  // {
  //   value: "Fundamental serviec",
  //   label: "??",
  // },
];

const profile_fields = [
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
        marginBottom: "60px",
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
        marginBottom: "60px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: EDIT_FIELD_TYPES.TEXT,
    fieldProps: {
      placeholder: "Description",
      name: "description",
      label: "Description",
      rules: { required: true, message: "Description must not empty!" },
      style: {
        width: "500px",
        height: "50px",
        marginBottom: "60px",
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
        marginBottom: "60px",
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
      label: "Fields",
      rules: { required: true, message: "This field must not empty!" },
      options: fieldOptions,
      style: {
        width: "500px",
        height: "50px",
        marginBottom: "60px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },

  {
    type: EDIT_FIELD_TYPES.TEXT,
    fieldProps: {
      placeholder: "Intended learner",
      name: "intendedLearner",
      label: "Intended Learner",
      rules: { required: true, message: "This field must not empty!" },
      style: {
        width: "500px",
        height: "50px",
        marginBottom: "60px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: EDIT_FIELD_TYPES.RADIO,
    fieldProps: {
      name: "level",
      rules: { required: true, message: "This field must be select!" },
      label: "Level",
      options: [
        {
          label: "Advanced",
          value: "ADVANCE",
        },
        {
          label: "Fundamental",
          value: "FUNDAMENTAL",
        },
      ],
      cols: 12,
    },
  },
  {
    type: EDIT_FIELD_TYPES.BUTTON,
    formProps: {
      // wrapperCol: { span: 24, offset: 9 },
    },
    fieldProps: {
      type: "primary",
      htmlType: "submit",
      text: "Save",
      style: {},
    },
    cols: 12,
  },
];

const CreateCoursePage = () => {
  const navigate = useNavigate();

  const {
    mutate: createCourse,
    isLoading: isCreateCourseLoading,
    error,
    data,
  } = useCreateCourse();

  const onFinish = async (values: any) => {
    const createCourseParams: CreateCourseParams = {
      field: { id: values.fields },
      CourseStatus: "ENABLE",
      courseLevel: values.level,
      description: values.description,
      fullName: values.fullname,
      shortName: values.shortname,
      intendedLearner: values.intendedLearner,
      learningOutcome: values.learningOutcome,
    };
    console.log(createCourseParams);

    await createCourse(createCourseParams, {
      onSuccess(data, variables, context) {
        console.log(data);
        navigate(`/home/course/edit/${data.data.id}`);
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };

  const { data: fields, isLoading }: UseQueryResult<GetField[], Error> =
    useQuery(["fields"], async () => await FieldAPI.getAll());

  fields?.forEach((item) => {
    fieldOptions.push({ value: item.id, label: item.name });
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <div className={styled["background-container"]}>
        <Button className={styled["button"]}>
          <ArrowBackIcon />
        </Button>
        <p className={styled["title"]}>
          Great! Your students
          <br /> are waiting
        </p>
        <p className={styled["description"]}>
          Quickly start creating a course here for the relevant classes you are
          currently teaching.
        </p>
        <p className={styled["quote"]}>
          A good teacher is like a candle - it consumes itself to light the way
          for others
        </p>
        <p className={styled["author"]}>-Mustafa Kemal Atatũrk</p>
        <div className={styled["img-wrapper"]}>
          <Image
            className={styled["image"]}
            preview={false}
            src={ArtistPainting}
          />
        </div>
      </div>
      <div className={styled["form-container"]}>
        <div className={styled["title-container"]}>
          <p>Create Course</p>
        </div>
        <Form
          name="personal_detail"
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <EditAndUpdateForm fields={profile_fields} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
