import React, { useState, useMemo } from "react";
import styled from "./ProfilePage.module.scss";
import {
  Divider,
  Image,
  Upload,
  UploadProps,
  Avatar,
  Form,
  Skeleton,
  SelectProps,
} from "antd";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import dayjs from "dayjs";
import { GetUserResult } from "../../types/User.type";
import { UseQueryResult, useQuery } from "react-query";
import {
  UpdateUserParams,
  UpdateUserProfileMentorParams,
  UpdateUserProfileStudentParams,
  UserAPI,
} from "../../api/UserAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { uploadImage } from "../../utils/firebase";
import { useUpdateImageProfile } from "../../hooks/useUploadImageProfile";
import { useUpdateUser } from "../../hooks/useUpdateUserHook";
import { EnumAPI } from "../../api/EnumAPI";
import { useUpdateUserStudentProfile } from "../../hooks/useUpdateUserProfileStudentHook";
import { GetField } from "../../types/Field.type";
import { FieldAPI } from "../../api/FieldAPI";
import { useUpdateUserMentorProfile } from "../../hooks/useUpdateUserProfileMentorHook";
import { UserOutlined } from "@ant-design/icons";

const dateFormat = "YYYY-MM-DD";
var fieldOptions: SelectProps["options"] = [];
var educationOptions: SelectProps["options"] = [];

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const props: UploadProps = {
  name: "file",
  beforeUpload: () => false,
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log("done");
    } else if (info.file.status === "error") {
      console.log("error");
    }
  },
  progress: {
    style: {
      display: "none",
    },
  },
  showUploadList: false,
};

const ProfilePage = () => {
  const [loadingAvatar, setloadingAvatar] = useState(false);
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  }: UseQueryResult<GetUserResult, Error> = useQuery(
    ["user"],
    async () => await UserAPI.getByUserToken()
  );

  const {
    data: education,
    isLoading: isEducationLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["education"],
    async () =>
      await EnumAPI.getUserEducation().then((result) => {
        educationOptions = result.map((item: string) => {
          return { value: item, label: item };
        });
      })
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
    data: updateImageData,
    isLoading: isUpdateImageLoading,
    mutate,
  } = useUpdateImageProfile();

  const {
    data: updateUserStudentProfile,
    isLoading: isUpdateUserStudentProfile,
    mutate: mutateUpdateUserStudentProfile,
  } = useUpdateUserStudentProfile();

  const {
    data: updateUserMentorProfile,
    isLoading: isUpdateUserMentorProfile,
    mutate: mutateUpdateUserMentorProfile,
  } = useUpdateUserMentorProfile();

  const {
    data: updateUser,
    isLoading: isUpdateUserLoading,
    mutate: mutateUpdateUser,
  } = useUpdateUser();

  const onFinish = async (values: any) => {
    const params: UpdateUserParams = {
      firstName: values.firstname,
      lastName: values.lastname,
      birthdate: values.birthday.add(1, "day").toDate(),
      gender: values.gender,
    };
    await mutateUpdateUser(params, {
      onSuccess(data, variables, context) {
        refetch();
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };
  const onFinishStudent = async (values: any) => {
    const params: UpdateUserProfileStudentParams = {
      bio: values?.bio,
      education: values?.education,
      experience: values?.experience,
      year: values?.year,
    };

    mutateUpdateUserStudentProfile(params, {
      onSuccess(data, variables, context) {
        refetch();
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };
  const onFinishMentor = async (values: any) => {
    const params: UpdateUserProfileMentorParams = {
      bio: values?.bio,
      degree: values?.degree,
      field: { id: values?.field },
    };

    mutateUpdateUserMentorProfile(params, {
      onSuccess(data, variables, context) {
        refetch();
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };

  const profile_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.TEXT,
        fieldProps: {
          placeholder: "Firstname",
          name: "firstname",
          label: "Firstname",
          rules: { required: true, message: "Firstname must not empty!" },
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
          placeholder: "Lastname",
          name: "lastname",
          label: "Lastname",
          rules: { required: true, message: "Lastname must not empty!" },
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
        type: EDIT_FIELD_TYPES.SELECTDATE,
        fieldProps: {
          name: "birthday",
          label: "Birthday",
          rules: { required: true, message: "Birthday must not empty!" },
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
          name: "gender",
          rules: { required: true, message: "This field must not empty!" },
          label: "Gender",
          options: [
            {
              label: "MALE",
              value: "MALE",
            },
            {
              label: "FEMALE",
              value: "FEMALE",
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
          loading: isFetching || isUpdateUserLoading,
        },
        cols: 12,
      },
    ];
  }, [isFetching, isUpdateUserLoading]);

  const student_detail_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.TEXTAREA,
        fieldProps: {
          placeholder: "Bio",
          name: "bio",
          label: "Bio",
          rules: { required: true, message: "This field must not empty!" },
          style: {
            width: "800px",
          },
          onChange: (value: any) => {},
        },
        cols: 12,
      },
      {
        type: EDIT_FIELD_TYPES.NUMERIC,
        fieldProps: {
          placeholder: "University year",
          name: "year",
          label: "University year",
          rules: { required: true, message: "This field must not empty!" },
          minValue: 1900,
          maxValue: 2024,
          style: {
            width: "800px",
            height: "50px",
            marginBottom: "60px",
          },
          onChange: (value: any): any => {},
        },
        cols: 12,
      },
      {
        type: EDIT_FIELD_TYPES.TEXTAREA,
        fieldProps: {
          placeholder: "Experience",
          name: "experience",
          label: "Experience",
          rules: { required: true, message: "This field must not empty!" },
          style: {
            width: "800px",
          },
          onChange: (value: any) => {},
        },
        cols: 12,
      },

      {
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Education",
          name: "education",
          label: "Education",
          rules: { required: true, message: "This field must not empty!" },
          options: educationOptions,
          style: {
            width: "800px",
            height: "50px",
            marginBottom: "3rem",
          },
          onChange: (value: any) => {},
        },
        cols: 12,
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
          loading: isUpdateUserStudentProfile,
        },
        cols: 12,
      },
    ];
  }, [educationOptions, isUpdateUserStudentProfile]);

  const mentor_detail_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Degree",
          name: "degree",
          label: "Degree",
          rules: { required: true, message: "This field must not empty!" },
          options: educationOptions,
          style: {
            width: "800px",
            height: "50px",
            marginBottom: "3rem",
          },
        },
        cols: 12,
      },

      {
        type: EDIT_FIELD_TYPES.TEXTAREA,
        fieldProps: {
          placeholder: "Bio",
          name: "bio",
          label: "Bio",
          rules: { required: true, message: "This field must not empty!" },
          style: {
            width: "800px",
          },
        },
        cols: 12,
      },

      {
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Field",
          name: "field",
          label: "Field",
          rules: { required: true, message: "This field must not empty!" },
          options: fieldOptions,
          style: {
            width: "800px",
            height: "50px",
            marginBottom: "3rem",
          },
          onChange: (value: any) => {},
        },
        cols: 12,
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

          loading: isUpdateUserMentorProfile,
        },
        cols: 12,
      },
    ];
  }, [fieldOptions, isUpdateUserMentorProfile]);

  if (isLoading || isEducationLoading || isFieldsLoading)
    return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p>Settings</p>
        <Divider />
      </div>
      <div className={styled["body"]}>
        <p className={styled["title"]}>Profile</p>
        <div className={styled["wrapper"]}>
          <div className={styled["img-wrapper"]}>
            <Upload
              {...props}
              onChange={async ({ fileList }) => {
                console.log(fileList[0].originFileObj);

                setloadingAvatar(true);
                var url = await uploadImage(fileList[0].originFileObj);
                setloadingAvatar(false);
                if (url) {
                  mutate(
                    {
                      url: url,
                      id: localStorage.getItem("userID")!,
                      version: 0,
                    },
                    {
                      onSuccess(data, variables, context) {
                        refetch();
                      },
                    }
                  );
                }
              }}
            >
              {isUpdateImageLoading || loadingAvatar || isFetching ? (
                <Skeleton.Avatar
                  active={true}
                  size={"default"}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              ) : data?.profileImage ? (
                <Avatar
                  size={200}
                  className={styled["img"]}
                  src={data?.profileImage.url}
                  alt="avatar"
                />
              ) : (
                <Avatar
                  size={200}
                  className={styled["img"]}
                  icon={<UserOutlined />}
                  alt="avatar"
                />
              )}
              <p className={styled["description"]}>Edit</p>
            </Upload>
          </div>
          <Form
            name="profile"
            wrapperCol={{ span: 16 }}
            initialValues={{
              remember: true,
              ["firstname"]: data?.firstName,
              ["lastname"]: data?.lastName,
              ["gender"]: data?.gender,
              ["birthday"]: dayjs(data?.birthdate, dateFormat),
            }}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <EditAndUpdateForm fields={profile_fields} />
            </div>
          </Form>
        </div>

        <Divider />
        <p className={styled["title"]}>Mentor Detail</p>
        <Form
          name="mentor_detail"
          wrapperCol={{ span: 16 }}
          initialValues={{
            ["degree"]: data?.mentor.degree,
            ["bio"]: data?.mentor.bio,
            ["field"]: data?.mentor?.field?.id,
          }}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinishMentor}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            marginLeft: "13rem",
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <EditAndUpdateForm fields={mentor_detail_fields} />
        </Form>

        <Divider />
        <p className={styled["title"]}>Student Detail</p>

        <Form
          name="student_detail"
          wrapperCol={{ span: 16 }}
          initialValues={{
            ["bio"]: data?.student.bio,
            ["year"]: data?.student.year,
            ["experience"]: data?.student.experience,
            ["education"]: data?.student.education,
          }}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinishStudent}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            marginLeft: "13rem",
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <EditAndUpdateForm fields={student_detail_fields} />
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
