import http from "../utils/http";
export type LoginProps = {
  email: string;
  password: string;
};

export const UserAPI = {
  login: async (loginProps: LoginProps) => {
    try {
      const res = await http.post("/login", loginProps);
      return res?.data;
    } catch (err: any) {
      throw err;
    }
  },
};
