import React from "react";
import CourseCard, { CourseCardProps } from "../../components/card/CourseCard";
import styled from "./LandingPage.module.scss";
import TutorCard from "../../components/card/TutorCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { UseQueryResult, useQuery } from "react-query";
import { GetCourse } from "../../types/Course.type";
import { CourseAPI } from "../../api/CourseAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { GetMentorResult } from "../../types/User.type";
import { UserAPI } from "../../api/UserAPI";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const {
    data: courses,
    isLoading: isCoursesLoading,
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses"],
    async () => await CourseAPI.getAll({})
  );
  const {
    data: mentors,
    isLoading: isMentorsLoading,
  }: UseQueryResult<GetMentorResult, Error> = useQuery(
    ["mentors"],
    async () => await UserAPI.getMentorList()
  );

  if (isCoursesLoading || isMentorsLoading) return <LoadingSkeleton />;

  console.log(courses?.result);

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["title"]}>Popular Courses</p>
        <p className={styled["body"]}>Explore the most popular courses</p>
      </div>

      <div className={styled["course-container"]}>
        {courses?.result.map((course, index) => (
          <CourseCard
            key={index}
            id={course.id}
            description={course.fullName}
            courseLevel={course.courseLevel}
            images={course.images}
            mentor={course.mentor}
            shortName={course.shortName}
          />
        ))}
      </div>

      <div className={styled["tutor-container"]}>
        <div className={styled["header"]}>
          <p className={styled["title"]}>Trending Tutors</p>
          <p className={styled["body"]}>Get to know your tutors</p>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={80}
          navigation={true}
          modules={[Navigation]}
          className={styled["slider"] + " " + "mySwiper"}
          style={{}}
        >
          {mentors?.result.map((tutor) => (
            <SwiperSlide
              key={tutor.id}
              onClick={() => navigate(`/home/mentor/${tutor.id}`)}
              style={{
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgb(0 0 0 /0.1)",
                boxShadow:
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                cursor: "pointer",
              }}
            >
              <TutorCard
                avatar={tutor.profileImage}
                description={tutor.mentor.bio}
                name={tutor.lastName}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LandingPage;
