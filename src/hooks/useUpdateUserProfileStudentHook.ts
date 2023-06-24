import { useMutation } from "react-query";
import { UpdateUserProfileStudentParams, UserAPI } from "../api/UserAPI";

export const useUpdateUserStudentProfile = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateUserStudent",
    mutationFn: async (params: UpdateUserProfileStudentParams) => {
      return await UserAPI.updateUserProfileStudent(params);
    },
  });

  return { mutate, isLoading, error, data };
};
