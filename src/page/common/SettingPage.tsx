import React from "react";
import styled from "./SettingPage.module.scss";
import { Divider, Image, Upload, UploadProps, Avatar } from "antd";
import VoIu from "../../assets/310876606_2194096234108406_8917809045783773918_n.jpg";

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
      </div>
    </div>
  );
};

export default SettingPage;
