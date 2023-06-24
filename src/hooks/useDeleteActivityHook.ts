import { useMutation } from "react-query";
import { ActivityAPI } from "../api/ActivityAPI";

export const useDeleteActivity = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "createActivity",
    mutationFn: async (id: string) => {
      return await ActivityAPI.deleteActivity(id);
    },
  });

  return { mutate, isLoading, error, data };
};
