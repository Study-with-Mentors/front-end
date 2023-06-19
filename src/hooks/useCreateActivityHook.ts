import { useMutation } from "react-query";
import { CreateSessionParams, SessionAPI } from "../api/SessionAPI";

export const useCreateActivity = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "createActivity",
    mutationFn: async (createParams: CreateSessionParams) => {
      return await SessionAPI.createSession(createParams);
    },
  });

  return { mutate, isLoading, error, data };
};
