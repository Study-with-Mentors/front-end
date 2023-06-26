import http, { toQueryParams } from "../utils/http";

export type GetLessonByDateParams = {
  lowerTime: string;
  upperTime: string;
};

export const LessionAPI = {
  getLessonByDate: async (params: GetLessonByDateParams) => {
    const res = await http.get(`/student/lesson?${toQueryParams(params)}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res.data;
  },
};
