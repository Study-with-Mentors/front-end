import { useMutation } from "react-query";
import { SessionAPI } from "../api/SessionAPI";

export const useDeleteSession = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "deleteActivity",
    mutationFn: async (id: string) => {
      return await SessionAPI.deleteSession(id);
    },
  });

  return { mutate, isLoading, error, data };
};
