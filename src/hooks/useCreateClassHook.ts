import { useMutation } from "react-query";
import { ClassAPI, CreateClassParams } from "../api/ClassAPI";

export const useCreateClass = () => {
  const { mutate, isLoading, error, isError, data, isSuccess } = useMutation({
    mutationKey: "createClass",
    mutationFn: async (params: CreateClassParams) => {
      return await ClassAPI.createClass(params);
    },
  });

  return { mutate, isLoading, error, isError, data, isSuccess };
};
