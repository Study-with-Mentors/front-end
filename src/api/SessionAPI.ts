import { SessionType } from "../types/Enum.type";
import http from "../utils/http";

export type CreateSessionParams = {
  sessionNum: number;
  sessionName: string;
  type: SessionType;
  description: string;
  resource: string;
  courseId: string;
  activities: string[];
};

export type UpdateSessionParams = {};

export const SessionAPI = {
  getSessionByCourseID: async (courseID: string) => {
    try {
      const res = await http.get(`/session/course/${courseID}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  createSession: async (params: CreateSessionParams) => {
    try {
      const res = await http.post(`/session`, params, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
