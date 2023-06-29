import { Button, Divider, Image } from "antd";
import { Dispatch, SetStateAction } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../../api/CourseAPI";
import LoadingSkeleton from "../../../components/skeleton/LoadingSkeleton";
import { GetCourseResultAdmin } from "../../../types/Course.type";
import styled from "./AdminCourse.module.scss";

interface PropsOption {
  id: string,
  setId: Dispatch<SetStateAction<string>>,
  setDetail: Dispatch<SetStateAction<boolean>>
}

const CourseTableDetail = ({ id, setId, setDetail }: PropsOption) => {

  const { data: course, isLoading }: UseQueryResult<GetCourseResultAdmin, Error> =
    useQuery(
      ["course", id],
      async () => await CourseAPI.getById(id ?? "0"),
      {
        enabled: Boolean(id),
      }
    );

  if (isLoading) return <LoadingSkeleton />;

  const backToList = () => {
    setId("0")
    setDetail(false)
  }
  // console.log(courses?.result);
  return (
    <div className={styled["container-detail"]}>
      <div className={styled["detail-left"]}>
        <Button onClick={backToList}>Back</Button>
        <div className={styled["image"]}>
          <Image
            preview={false}
            height={428}
            style={{
              borderRadius: "3%",
            }}
            src={course?.image.url
              || "https://cdn.dribbble.com/userupload/5814653/file/original-f197c4a6a7350813f3d6d941a7e1dc2f.png?compress=1&resize=1024x768"}
          />
        </div>
        <div className={styled["body_header-wrapper"]}>
          <p className={styled["title"]}>{course?.fullName}</p>
          <p className={styled["mentor"]}>
            <span>{course?.mentor.lastName}</span>
          </p>
          <Divider />
          <p className={styled["description"]}>
            {course?.description}
          </p>
          <Divider />
        </div>
      </div>
      <div className={styled["detail-right"]}>
        <p className={styled["title"]}>Learning outcome</p>
        <p className={styled["description"]}>{course?.learningOutcome}</p>
        <Divider />
        <p className={styled["title"]}>Intended Learner</p>
        <p className={styled["description"]}>{course?.intendedLearner}</p>
        <Divider />
        <p className={styled["title"]}>Tags:</p>
        <div className={styled["tag"]}>{course?.learningOutcome}</div>
      </div>
    </div>
  );
};

export default CourseTableDetail;
