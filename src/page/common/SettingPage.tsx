import React from "react";
import styled from "./SettingPage.module.scss";
import { Divider, Image, Upload, UploadProps, Avatar, Form } from "antd";
import VoIu from "../../assets/310876606_2194096234108406_8917809045783773918_n.jpg";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

const onFinish = async (values: any) => {
  console.log("Success:", values);
};

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

const profile_fields = [
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
        marginBottom: "80px",
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
        marginBottom: "80px",
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
        marginBottom: "80px",
      },
      onChange: (value: any) => {},
    },
    cols: 12,
  },
  {
    type: EDIT_FIELD_TYPES.SELECT,
    fieldProps: {
      name: "role",
      // rules: { required: true, message: "This field must not empty!" },
      label: "Gender",
      options: [
        {
          label: "Male",
          value: "Male",
        },
        {
          label: "Female",
          value: "Female",
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

const SettingPage = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p>Settings</p>
        <Divider />
      </div>
      <div className={styled["body"]}>
        <p className={styled["title"]}>Profile</p>
        <div className={styled["img-wrapper"]}>
          <Upload
            {...props}
            onChange={async ({ fileList }) => {
              // setloadingAvatar(true);
              // var url = await uploadImage(fileList[0].originFileObj);
              // setloadingAvatar(false);
              // if (url) {
              // mutate({ avatar: url });
              // }
            }}
          >
            {/* {updateUserLoading || loadingAvatar ? (
              <Skeleton.Avatar
                active={true}
                size={"default"}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
            ) : ( */}
            <Avatar
              size={156}
              className={styled["img"]}
              src={VoIu}
              alt="avatar"
            />
            <p className={styled["description"]}>Edit</p>
            {/* ) */}
          </Upload>
        </div>
        <Form
          name="profile"
          wrapperCol={{ span: 16 }}
          initialValues={{
            remember: true,
            ["firstname"]: "Hello_its_me",
            ["lastname"]: "Hello_its_me",
            ["role"]: "Male",
            ["birthday"]: dayjs("2015-06-06", dateFormat),
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

export default SettingPage;
