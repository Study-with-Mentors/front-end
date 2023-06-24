import { useMutation } from "react-query";
import { UploadImageProfileProps, UserAPI } from "../api/UserAPI";

export const useUpdateImageProfile = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "updateImageProfile",
    mutationFn: async (params: UploadImageProfileProps) => {
      return await UserAPI.uploadImageProfile(params);
    },
  });

  return { mutate, isLoading, error, data };
};
