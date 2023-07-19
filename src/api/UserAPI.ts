import { GENDER } from "../types/User.type";
import http from "../utils/http";
export type LoginProps = {
  email: string;
  password: string;
};

export type SignupProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
  birthdate: Date,
  gender: GENDER;
};

export type UploadImageProfileProps = {
  version?: number;
  url: string;
};

export type UpdateUserParams = {
  id?: string;
  version?: number;
  email?: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: GENDER;
};

export type UpdateUserProfileStudentParams = {
  id?: string;
  version?: number;
  year: number;
  bio: string;
  experience: string;
  education: string;
};

export type UpdateUserProfileMentorParams = {
  id?: string;
  version?: number;
  bio?: string;
  degree?: string;
  field?: { id: string };
};

export type GetMentorIncomeParams = {
  startDate: string;
  endDate: string;
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
  signup: async (signupProps: SignupProps) => {
    try {
      const res = await http.post("/signup", signupProps);
      return res?.data;
    } catch (err: any) {
      throw err;
    }
  },
  signUpVerify: async (token: string) => {
    try {
      const res = await http.get("/signup/verify", {
        params: { token: token },
      });
      return res?.data;
    } catch (err: any) {
      throw err;
    }
  },
  getByUserToken: async () => {
    const res = await http.get("/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getUserImageByToken: async () => {
    const res = await http.get("/me/image", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    console.log(res?.data)
    return res?.data;
  },
  getMentorProfileById: async (id: string) => {
    const res = await http.get(`/mentors/${id}`);
    return res?.data;
  },

  getMentorList: async () => {
    const res = await http.get(`/mentors`);
    console.log(res)
    return res?.data;
  },
  getMentorIncome: async (params: GetMentorIncomeParams) => {
    const res = await http.get(`/me/mentor/enrollments/report`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  loginGoogle: async (params: string) => {
    const res = await http.post("/login/google", params);
    return res.data;
  },
  uploadImageProfile: async (params: UploadImageProfileProps) => {
    const res = await http.put("/me", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateUser: async (params: UpdateUserParams) => {
    const res = await http.put("/me", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateUserProfileStudent: async (params: UpdateUserProfileStudentParams) => {
    const res = await http.put("/me/student", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateUserProfileMentor: async (params: UpdateUserProfileMentorParams) => {
    const res = await http.put("/me/mentor", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
};
