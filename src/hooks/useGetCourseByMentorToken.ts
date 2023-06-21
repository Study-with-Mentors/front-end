import { useMutation } from "react-query";
import { CourseAPI } from "../api/CourseAPI";
import { GetCourse } from "../types/Course.type";

export const useGetCourseByMentorToken = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "getCourseByMentorToken",
    mutationFn: async () => {
      return await CourseAPI.getCourseByMentorToken();
    },
  });

  return { mutate, isLoading, error, data };
};
