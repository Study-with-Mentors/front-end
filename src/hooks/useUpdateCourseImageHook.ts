import { useMutation } from "react-query";
import { CourseAPI, UpdateCourseImageParams } from "../api/CourseAPI";

export const useUpdateCourseImage = () => {
  const { mutate, isLoading, isError, data, isSuccess } = useMutation({
    mutationKey: "updateCourseImage",
    mutationFn: async (params: UpdateCourseImageParams) => {
      return await CourseAPI.updateCourseImage(params);
    },
  });

  return { mutate, isLoading, isError, data, isSuccess };
};
