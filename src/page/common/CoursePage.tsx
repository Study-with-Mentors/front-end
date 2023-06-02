import React from "react";
import styled from "./CoursePage.module.scss";
import { Image, Tabs, Divider, Button } from "antd";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

export type CoursePageProps = {
  courseName: string;
  createBy: string;
  courseFee: string;
  discount: string;
};

const CoursePage = ({
  courseName,
  createBy,
  courseFee,
  discount,
}: CoursePageProps) => {
  return (
    <div className={styled["container"]}>
      <div className={styled["body-wrapper"]}>
        <div className={styled["header"]}>
          <p className={styled["title"]}>Discover</p>
          <p className={styled["description"]}>
            Courses &gt; <span>{courseName}</span>
          </p>
        </div>
        <div className={styled["body"]}>
          <div className={styled["image"]}>
            <Image
              preview={false}
              height={428}
              style={{
                borderRadius: "3%",
              }}
              src="https://cdn.dribbble.com/userupload/5814653/file/original-f197c4a6a7350813f3d6d941a7e1dc2f.png?compress=1&resize=1024x768"
            />
          </div>
          <div className={styled["body_header-wrapper"]}>
            <p className={styled["title"]}>{courseName}</p>
            <p className={styled["create-by"]}>
              By <span>{createBy}</span>
            </p>
            <Tabs
              defaultActiveKey="2"
              items={["Information", "Content"].map((item, i) => {
                return {
                  label: <span>Tab {item}</span>,
                  key: item,
                  children: `Tab ${item}`,
                };
              })}
            />
            <p className={styled["content"]}>
              IBM is the second-largest Predictive, consectetur adipiscing elit.
              Sit turpis egestas aenean amet ac rhoncus vitae tristique. A sed
              magna vitae nullam. Accumsan ullamcorper amet congue fermentum
              egestas purus molestie nam. Dolor, dictumst mauris vestibulum
              vehicula vel cras. Pellentesque nam congue auctor dolor mattis
              erat. Pharetra feugiat in justo purus dolor feugiat ultrices.
              <p>&nbsp;</p> Pretium at parturient curabitur eget nunc pharetra.
              Vitae pharetra adipiscing purus faucibus bibendum. Ultrices mi
              tristique et enim pretium lacus, vivamus. Augue eget fermentum,
              mauris viverra. <p>&nbsp;</p> Tristique arcu ipsum risus a arcu
              pellentesque pharetra velit. Neque, erat tristique volutpat
              faucibus mattis vulputate faucibus. Ut phasellus nulla at sociis
              est, turpis purus. Faucibus donec malesuada tristique quam commodo
              felis nulla.
            </p>
            <Divider />
          </div>
        </div>
      </div>
      <div className={styled["sidebar"]}>
        <p className={styled["price"]}>
          VND {courseFee} <span>{discount}</span>
        </p>
        <Button type="primary" className={styled["button"]}>
          <ShoppingCartOutlinedIcon
            style={{
              marginRight: "16px",
            }}
          />{" "}
          Buy Now
        </Button>
        <Divider />
        <p className={styled["title"]}>What you'll learn</p>
        <p className={styled["description"]}>
          Access to IBM Cloud modelling what is I was looking for and Aaron got
          me the solution.
        </p>
        <Divider />
        <p className={styled["title"]}>This course includes:</p>
        <p className={styled["course-activity"]}>
          <StarBorderOutlinedIcon className={styled["icon"]} />
          {" 100% Positive review (10)"}
        </p>
        <p className={styled["course-activity"]}>
          <AccessibleForwardOutlinedIcon className={styled["icon"]} />
          {" 15 Students"}
        </p>
        <p className={styled["course-activity"]}>
          <PlayLessonOutlinedIcon className={styled["icon"]} />
          {" 20 Lessons"}
        </p>
        <p className={styled["course-activity"]}>
          <BackupTableOutlinedIcon className={styled["icon"]} />
          {" 5 Courses"}
        </p>
        <p className={styled["course-activity"]}>
          <BarChartOutlinedIcon className={styled["icon"]} />
          {" Level: Beginner"}
        </p>
        <Divider />
        <p className={styled["title"]}>Tags:</p>
        <div className={styled["tag"]}>Web Learning</div>
      </div>
    </div>
  );
};

export default CoursePage;
