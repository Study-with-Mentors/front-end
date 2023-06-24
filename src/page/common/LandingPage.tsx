import React from "react";
import CourseCard, { CourseCardProps } from "../../components/card/CourseCard";
import styled from "./LandingPage.module.scss";
import TutorCard, { TutorCardProps } from "../../components/card/TutorCard";
import VoIu from "../../assets/310876606_2194096234108406_8917809045783773918_n.jpg";

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

const fakeTutorData: TutorCardProps[] = [
  {
    name: "VoIu",
    avatar: VoIu,
    description:
      "I’ll break down why your product descriptions are an incredible opportunity to engage your potential customers",
  },
  {
    name: "VoIu",
    avatar: VoIu,
    description:
      "I’ll break down why your product descriptions are an incredible opportunity to engage your potential customers",
  },
  {
    name: "VoIu",
    avatar: VoIu,
    description:
      "I’ll break down why your product descriptions are an incredible opportunity to engage your potential customers",
  },
  {
    name: "VoIu",
    avatar: VoIu,
    description:
      "I’ll break down why your product descriptions are an incredible opportunity to engage your potential customers",
  },
  {
    name: "VoIu",
    avatar: VoIu,
    description:
      "I’ll break down why your product descriptions are an incredible opportunity to engage your potential customers",
  },
  {
    name: "VoIu",
    avatar: VoIu,
    description:
      "I’ll break down why your product descriptions are an incredible opportunity to engage your potential customers",
  },
];

const LandingPage = () => {
  const {
    data: courses,
    isLoading: isCoursesLoading,
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses"],
    async () => await CourseAPI.getAll({})
  );

  if (isCoursesLoading) return <LoadingSkeleton />;

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
          spaceBetween={120}
          navigation={true}
          modules={[Navigation]}
          className={styled["slider"] + " " + "mySwiper"}
          style={{}}
        >
          {fakeTutorData.map((tutor) => (
            <SwiperSlide
              style={{
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TutorCard {...tutor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LandingPage;
