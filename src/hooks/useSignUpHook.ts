import { useMutation } from "react-query";
import { SignupProps, UserAPI } from "../api/UserAPI";

export const useSignUpHook = () => {
  const { mutate, isLoading, error, data } = useMutation({
    mutationKey: "signup",
    mutationFn: async (signupProps: SignupProps) => {
      return await UserAPI.signup(signupProps);
    },
  });

  return { mutate, isLoading, error, data };
};
