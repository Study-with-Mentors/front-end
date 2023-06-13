import http from "../utils/http";

export type CreateCourseParams = {
  shortName: string;
  fullName: string;
  description: string;
  learningOutcome: string;
  CourseStatus: string;
  courseLevel: string;
  intendedLearner: string;
  field: { id: string };
};

export const CourseAPI = {
  createCourse: async (createCourseParams: CreateCourseParams) => {
    try {
      const res = http.post("/course", createCourseParams, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  },
};
