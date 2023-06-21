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
} from "antd";
import VoIu from "../../assets/310876606_2194096234108406_8917809045783773918_n.jpg";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import dayjs from "dayjs";
import { GetUserResult } from "../../types/User.type";
import { UseQueryResult, useQuery } from "react-query";
import { UpdateUserParams, UserAPI } from "../../api/UserAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { uploadImage } from "../../utils/firebase";
import { useUpdateImageProfile } from "../../hooks/useUploadImageProfile";
import { useUpdateUser } from "../../hooks/useUpdateUserHook";

const dateFormat = "YYYY-MM-DD";

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

const personal_detail_fields = [
  {
    type: EDIT_FIELD_TYPES.TEXT,
    fieldProps: {
      placeholder: "Firstname",
      name: "firstname",
      label: "Firstname",
      value: "Hello_its_me",
      rules: { required: true, message: "Firstname must not empty!" },
      style: {
        width: "500px",
        height: "50px",
        marginBottom: "80px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
];

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
    data: updateImageData,
    isLoading: isUpdateImageLoading,
    mutate,
  } = useUpdateImageProfile();

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

  if (isLoading) return <LoadingSkeleton />;
  // console.log(data);

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
                    { profileImage: url },
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
              ) : (
                <Avatar
                  size={200}
                  className={styled["img"]}
                  src={data?.profileImage}
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
        <p className={styled["title"]}>Personal Detail</p>
        <Form
          name="personal_detail"
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EditAndUpdateForm fields={personal_detail_fields} />
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
