import React from "react";
import styled from "./LoadingSkeletion.module.scss";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 56 }} spin />;

const LoadingSkeleton = () => {
  return (
    <div className={styled["container"]}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingSkeleton;
