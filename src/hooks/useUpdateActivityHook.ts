import { useMutation } from "react-query";
import { ActivityAPI, UpdateActivityParams } from "../api/ActivityAPI";

export const useUpdateActivity = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateActivity",
    mutationFn: async (params: UpdateActivityParams) => {
      return await ActivityAPI.updateActivity(params);
    },
  });

  return { mutate, isLoading, error, data };
};
