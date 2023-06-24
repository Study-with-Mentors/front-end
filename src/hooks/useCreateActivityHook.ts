import { useMutation } from "react-query";
import { ActivityAPI, CreateActivityParams } from "../api/ActivityAPI";

export const useCreateActivity = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "createActivity",
    mutationFn: async (params: CreateActivityParams) => {
      return await ActivityAPI.createActivity(params);
    },
  });

  return { mutate, isLoading, error, data };
};
