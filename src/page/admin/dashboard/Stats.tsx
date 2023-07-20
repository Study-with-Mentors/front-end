import { UseQueryResult, useQuery } from "react-query";
import styled from "./AdminDashboard.module.scss";
import { GetCourse } from "../../../types/Course.type";
import { CourseAPI } from "../../../api/CourseAPI";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { UserAPI } from "../../../api/UserAPI";
import { GetUser } from "../../../types/User.type";

const Stats = () => {
  //Users
  const {
    data: users,
    isLoading: userLoading,
    refetch: refectchUser
  }: UseQueryResult<GetUser, Error> = useQuery(
    ["users"],
    async () => await UserAPI.getAll({ pageSize: 1 })
  );

  //Courses
  const {
    data: courses,
    isLoading: courseLoading,
    refetch: refetchCourse
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses"],
    async () => await CourseAPI.getAll({ pageSize: 1 })
  );

  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["header"]}>
          <div className={styled["item-wrapper"]}>
            {userLoading ? <Spin className={styled["spin"]} indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /> :
              <>
                <p className={styled["title"]}>Users</p>
                <p className={styled["data"]}>{users?.totalElements}</p>
                <div className={styled["extra-data"]}>
                  <p className={styled["value-green"]}>+14%</p>{" "}
                  <p className={styled["extra"]}>From 0%</p>
                </div>
              </>
            }
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
            <p className={styled["title"]}>Classes</p>
            <p className={styled["data"]}>6</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value-red"]}>-6%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Revenue</p>
            <p className={styled["data"]}>100K VND</p>
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
