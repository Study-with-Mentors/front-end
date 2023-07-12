import http from "../utils/http";

export type CreateActivityParams = {
  sessionId: string;
  description: string;
  title: string;
};

export type UpdateActivityParams = {
  id: string;
  version: number;
  description: string;
  title: string;
  sessionId: string;
};

export type GetActivityParams = {
  sessionId: string;
};

export const ActivityAPI = {
  getActivityBySessionId: async ({ sessionId }: GetActivityParams) => {
    const res = await http.get(`/session/${sessionId}/activity`);
    return res.data;
  },
  createActivity: async (params: CreateActivityParams) => {
    const res = await http.post("/activity", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res.data;
  },
  updateActivity: async (params: UpdateActivityParams) => {
    const res = await http.put(`/activity/${params.id}`, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res.data;
  },
  deleteActivity: async (id: string) => {
    const res = await http.delete(`/activity/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res.data;
  },
};
