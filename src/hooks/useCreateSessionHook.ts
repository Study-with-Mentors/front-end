import { useMutation } from "react-query";
import { CreateSessionParams, SessionAPI } from "../api/SessionAPI";

export const useCreateSession = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "createSession",
    mutationFn: async (createParams: CreateSessionParams) => {
      return await SessionAPI.createSession(createParams);
    },
  });

  return { mutate, isLoading, error, data };
};
