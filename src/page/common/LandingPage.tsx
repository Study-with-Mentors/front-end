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

const fakeCourseData: CourseCardProps[] = [
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description: "I am so clever that sometimes I don’t understand. ",
    courseName: "Material UI/UX",
    mentorName: "Tom_And_Jerry",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/7522025/file/original-ecb7fe958aaf754b142b62c958942a89.jpg?compress=1",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description: "I am so clever that sometimes I don’t understand. ",
    courseName: "Material UI/UX",
    mentorName: "Tom_And_Jerry",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description: "I am so clever that sometimes I don’t understand. ",
    courseName: "Material UI/UX",
    mentorName: "Tom_And_Jerry",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/7522025/file/original-ecb7fe958aaf754b142b62c958942a89.jpg?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description: "I am so clever that sometimes I don’t understand. ",
    courseName: "Material UI/UX",
    mentorName: "Tom_And_Jerry",
  },
  {
    image:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    avatar:
      "https://cdn.dribbble.com/userupload/4271037/file/original-35e5b8101ff04a5f5f4640a32180b7fa.png?compress=1&resize=1024x768",
    description: "I am so clever that sometimes I don’t understand. ",
    courseName: "Material UI/UX",
    mentorName: "Tom_And_Jerry",
  },
];

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
  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["title"]}>Popular Courses</p>
        <p className={styled["body"]}>Explore the most popular courses</p>
      </div>

      <div className={styled["course-container"]}>
        {fakeCourseData.map((course) => (
          <CourseCard {...course} />
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
