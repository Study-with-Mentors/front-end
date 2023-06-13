import { useMutation } from "react-query";
import { LoginProps, UserAPI } from "../api/UserAPI";

export const useLoginUser = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "loginUser",
    mutationFn: async (loginProps: LoginProps) => {
      return await UserAPI.login(loginProps);
    },
  });

  return { mutate, isLoading, error, data };
};
