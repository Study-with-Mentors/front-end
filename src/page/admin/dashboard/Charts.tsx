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
      position: "top" as const,
    },
  },
};

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
const Charts = () => {
  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["chart"]}>
          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}>TOTAL USERS</div>
            <Line redraw data={dataBar} options={optionsBar} />
          </div>

          <div className={styled["item-wrapper"]}>
            <div className={styled["title"]}>FIELDS</div>
            <div className={styled["bar"]}>
              <Pie redraw data={dataPie} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
