import { useMutation } from "react-query";
import { UpdateUserProfileStudentParams, UserAPI } from "../api/UserAPI";
import { uploadImage } from "../utils/firebase";

export type UploadImageFirebaseParams = {
  image: any;
};

export const useUploadImageFirebase = () => {
  const { mutate, isLoading, isError, data, isSuccess } = useMutation({
    mutationKey: "uploadImageFirebase",
    mutationFn: async ({ image }: UploadImageFirebaseParams) => {
      return await uploadImage(image);
    },
  });

  return { mutate, isLoading, isError, data, isSuccess };
};
