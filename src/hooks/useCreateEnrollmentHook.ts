import { useMutation } from "react-query";
import { EnrollClassParams, EnrollmentAPI } from "../api/EnrollmentAPI";

export const useCreateEnrollment = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "createEnrollment",
    mutationFn: async (params: EnrollClassParams) => {
      return await EnrollmentAPI.enrollClass(params);
    },
  });

  return { mutate, isLoading, error, data };
};
