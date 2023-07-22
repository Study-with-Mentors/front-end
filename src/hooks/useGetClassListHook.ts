import { useMutation } from "react-query";
import { CourseAPI } from "../api/CourseAPI";
import { ClassAPI } from "../api/ClassAPI";

export const useGetClassByCourseId = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "getClassByCourseId",
    mutationFn: async (course_id: string) => {
      return await ClassAPI.getClassByCourseIdWithToken(course_id);
    },
  });

  return { mutate, isLoading, error, data };
};
