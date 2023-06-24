import React from "react";
import styled from "./DashBoardPage.module.scss";

const DashBoardPage = () => {
  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <div className={styled["item-wrapper"]}>
          <p className={styled["title"]}>Revenue</p>
          <p className={styled["data"]}>$56,945</p>
          <div className={styled["extra-data"]}>
            <p className={styled["value"]}>+45%</p>{" "}
            <p className={styled["extra"]}>From 4.6%</p>
          </div>
        </div>

        <div className={styled["item-wrapper"]}>
          <p className={styled["title"]}>Revenue</p>
          <p className={styled["data"]}>$56,945</p>
          <div className={styled["extra-data"]}>
            <p className={styled["value"]}>+45%</p>{" "}
            <p className={styled["extra"]}>From 4.6%</p>
          </div>
        </div>
        <div className={styled["item-wrapper"]}>
          <p className={styled["title"]}>Revenue</p>
          <p className={styled["data"]}>$56,945</p>
          <div className={styled["extra-data"]}>
            <p className={styled["value"]}>+45%</p>{" "}
            <p className={styled["extra"]}>From 4.6%</p>
          </div>
        </div>
        <div className={styled["item-wrapper"]}>
          <p className={styled["title"]}>Revenue</p>
          <p className={styled["data"]}>$56,945</p>
          <div className={styled["extra-data"]}>
            <p className={styled["value"]}>+45%</p>{" "}
            <p className={styled["extra"]}>From 4.6%</p>
          </div>
        </div>
      </div>
      <div className={styled["body"]}></div>
    </div>
  );
};

export default DashBoardPage;
