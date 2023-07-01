import { useMutation } from "react-query";
import { UpdateUserProfileMentorParams, UserAPI } from "../api/UserAPI";

export const useUpdateUserMentorProfile = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateUserMentor",
    mutationFn: async (params: UpdateUserProfileMentorParams) => {
      return await UserAPI.updateUserProfileMentor(params);
    },
  });

  return { mutate, isLoading, error, data };
<<<<<<< HEAD
};
=======
};
>>>>>>> main-layout
