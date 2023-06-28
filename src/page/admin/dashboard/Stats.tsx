import styled from "./AdminDashboard.module.scss";

const Stats = () => {
  return (
    <>
      <div className={styled["container"]}>
        <div className={styled["header"]}>
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
