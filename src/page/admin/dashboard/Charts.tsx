import styled from "./AdminDashboard.module.scss";

const Charts = () => {
  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["chart"]}>
          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>User</p>
            <p className={styled["data"]}>1024</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value-green"]}>+12%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>

          <div className={styled["item-wrapper"]}>
            <p className={styled["title"]}>Courses</p>
            <p className={styled["data"]}>200</p>
            <div className={styled["extra-data"]}>
              <p className={styled["value-green"]}>+2%</p>{" "}
              <p className={styled["extra"]}>From 4.6%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
