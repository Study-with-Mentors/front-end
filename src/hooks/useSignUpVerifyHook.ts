import { useMutation } from "react-query";
import { UserAPI } from "../api/UserAPI";

export const useSignUpVerifyHook = () => {
  const { mutate, isLoading, error } = useMutation({
    mutationKey: "verifySignUp",
    mutationFn: async (token: string) => {
      return await UserAPI.signUpVerify(token);
    },
  });

  return { mutate, isLoading, error };
};
