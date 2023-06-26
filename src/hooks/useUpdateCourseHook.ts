import { useMutation } from "react-query";
import { CourseAPI, UpdateCourseParams } from "../api/CourseAPI";

export const useUpdateCourse = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateCourse",
    mutationFn: async (params: UpdateCourseParams) => {
      return await CourseAPI.updateCourse(params);
    },
  });

  return { mutate, isLoading, error, data };
};
