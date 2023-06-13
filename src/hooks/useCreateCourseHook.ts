import { useMutation } from "react-query";
import { CourseAPI, CreateCourseParams } from "../api/CourseAPI";

export const useCreateCourse = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "createCourse",
    mutationFn: async (createParams: CreateCourseParams) => {
      return await CourseAPI.createCourse(createParams);
    },
  });

  return { mutate, isLoading, error, data };
};
