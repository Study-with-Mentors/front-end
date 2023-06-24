import { useMutation } from "react-query";
import { SessionAPI, UpdateSessionParams } from "../api/SessionAPI";

export const useUpdateSession = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateSession",
    mutationFn: async (params: UpdateSessionParams) => {
      return await SessionAPI.updateSession(params);
    },
  });

  return { mutate, isLoading, error, data };
};
