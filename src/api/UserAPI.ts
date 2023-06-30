import { GENDER } from "../types/User.type";
import http from "../utils/http";
export type LoginProps = {
  email: string;
  password: string;
};

export type UploadImageProfileProps = {
  id: string;
  version: number;
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
  getByUserToken: async () => {
    const res = await http.get("/user/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getUserImageByToken: async () => {
    const res = await http.get("/user/profile/image", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getMentorProfileById: async (id: string) => {
    const res = await http.get(`/mentor/${id}`);
    return res?.data;
  },

  getMentorList: async () => {
    const res = await http.get(`/mentor`);
    return res?.data;
  },
  getMentorIncome: async (params: GetMentorIncomeParams) => {
    const res = await http.get(`/mentor/course/enrollment/report`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  uploadImageProfile: async (params: UploadImageProfileProps) => {
    const res = await http.put("/user/profile", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateUser: async (params: UpdateUserParams) => {
    const res = await http.put("/user/profile", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateUserProfileStudent: async (params: UpdateUserProfileStudentParams) => {
    const res = await http.put("/user/profile/student", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateUserProfileMentor: async (params: UpdateUserProfileMentorParams) => {
    const res = await http.put("/user/profile/mentor", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
};
