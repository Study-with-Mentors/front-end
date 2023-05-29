import React from "react";
import styled from "./DashBoardHeader.module.scss";

export type DashBoardHeaderProps = {
  navigationLink: string[];
};

const DashboardHeader = ({ navigationLink }: DashBoardHeaderProps) => {
  return (
    <div className={styled["container"]}>
      <span>Home</span>
      {navigationLink.map((item) => (
        <span> &gt; {item}</span>
      ))}
    </div>
  );
};

export default DashboardHeader;
