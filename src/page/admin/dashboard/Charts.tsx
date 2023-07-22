import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import styled from "./AdminDashboard.module.scss";
import { UseQueryResult, useQuery } from "react-query";
import { ClassAPI, GetClass } from "../../../api/ClassAPI";
import { GetCourse, GetCourseResult } from "../../../types/Course.type";
import { CourseAPI } from "../../../api/CourseAPI";
import { useState } from "react";
import { count } from "console";
import LoadingSkeleton from "../../../components/skeleton/LoadingSkeleton";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
  },
};

const optionPie = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
}

const labelsBar = ["2020", "2021", "2022", "2023"];

const dataBar = {
  responsive: true,
  labels: labelsBar,
  datasets: [
    {
      label: "User",
      data: [3, 12, 27, 20],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Charts = () => {

  const [dataField, setDataField] = useState([]);
  const [fieldList, setFieldList] = useState<string[]>([]);

  const {
    data: classes,
    isLoading: classLoading
  }: UseQueryResult<GetClass, Error> = useQuery(
    ["classes"],
    async () => await ClassAPI.searchClass({})
  );

  const {
    data: courses,
    isLoading: courseLoading
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses"],
    async () => {
      await CourseAPI.getAll({ pageSize: 1, page: 0 })
        .then((courses) => {
          const countByField = courses.result.reduce((count: any, course: GetCourseResult) => {
            if (!count[course.field.id]) {
              count[course.field.id] = 1;
            } else {
              count[course.field.id]++;
            }
            return count;
          }, {});
          setDataField(countByField)
          setFieldList(Object.keys(countByField));
        })
    }
  );

  const dataPie = {
    labels: ["Sociology", "Philosophy", "Math", "	Computer science", "Physics"],
    datasets: [
      {
        data: [2, 4, 5, 3, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "#EAA4FF",
        ],
      },
    ],
  };

  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["chart"]}>
          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}><strong>NUMBER OF CLASSES STARTED</strong></div>
            {courseLoading ? <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}><Spin indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />} /></div> :
              <Line redraw data={dataBar} options={optionsBar} />
            }
          </div>

          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}><strong>FIELDS</strong></div>
            {courseLoading ? <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}><Spin indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />} /></div> :
              <div className={styled["bar"]}>
                <Pie redraw data={dataPie}
                  options={optionPie} />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
