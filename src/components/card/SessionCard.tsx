import styled from "./SessionCard.module.scss";

export type renderSessionCard = {
  sessionNumber: number;
  title: string;
  descrition: string;
  key: number;
};

export const SessionCard = ({
  key,
  sessionNumber,
  title,
  descrition,
}: renderSessionCard) => {
  return (
    <div key={key} className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["number"]}>{sessionNumber}</p>
        <p className={styled["name"]}>Session</p>
      </div>

      <div className={styled["body"]}>
        <p className={styled["title"]}>{title}</p>
        <p className={styled["description"]}>{descrition}</p>
      </div>
    </div>
  );
};
