import { useMutation } from "react-query";
import { LoginProps, UserAPI } from "../api/UserAPI";

export const useLoginGoogle = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "loginGoogle",
    mutationFn: async (loginProps: string) => {
      return await UserAPI.loginGoogle(loginProps);
    },
  });

  return { mutate, isLoading, error, data };
};
