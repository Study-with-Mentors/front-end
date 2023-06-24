import { useMutation } from "react-query";
import { UpdateUserParams, UserAPI } from "../api/UserAPI";

export const useUpdateUser = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateUser",
    mutationFn: async (params: UpdateUserParams) => {
      return await UserAPI.updateUser(params);
    },
  });

  return { mutate, isLoading, error, data };
};
