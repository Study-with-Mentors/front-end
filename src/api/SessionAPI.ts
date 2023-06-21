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

export type UpdateSessionParams = {
  id: string;
  version: number;
  sessionNum: number;
  sessionName: string;
  type: SessionType;
  description: string;
  resource: string;
  courseId: string;
  activities: UpdateActivity[];
};

export type UpdateActivity = {
  id: string;
  version: number;
  description: string;
  title: string;
};

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

  updateSession: async (params: UpdateSessionParams) => {
    try {
      const res = await http.put(`/session/${params.id}`, params, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  deleteSession: async (id: string) => {
    const res = await http.delete(`/session/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res.data;
  },
};
