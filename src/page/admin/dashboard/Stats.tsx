import { UseQueryResult, useQuery } from "react-query";
import styled from "./AdminDashboard.module.scss";
import { GetCourse } from "../../../types/Course.type";
import { CourseAPI } from "../../../api/CourseAPI";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Stats = () => {
  //Users

  //Courses
  const {
    data: courses,
    isLoading: courseLoading,
    refetch
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses"],
    async () => await CourseAPI.getAll({})
  );

  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["header"]}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Users</p>
            <p className={styled["data"]}>8</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value-green"]}>+14%</p>{" "}
              <p className={styled["extra"]}>From 0%</p>
            </div>
          </div>
          <div className={styled["item-wrapper"]}>
            {courseLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /> :
              <>
                <p className={styled["title"]}>Courses</p>
                <p className={styled["data"]}>{courses?.totalElements}</p>
                <div className={styled["extra-data"]}>
                  <p className={styled["value-green"]}>+2%</p>{" "}
                  <p className={styled["extra"]}>From 4.6%</p>
                </div>
              </>
            }
          </div>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Enrolls</p>
            <p className={styled["data"]}>620</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value-red"]}>-6%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Revenue</p>
            <p className={styled["data"]}>110M VND</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value-red"]}>-6%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
