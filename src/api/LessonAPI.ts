import http, { toQueryParams } from "../utils/http";

export type GetLessonByDateParams = {
  lowerTime: string;
  upperTime: string;
};

export type CreateLessonParams = {
  lessonNum: number;
  startTime: string;
  endTime: string;
  location: string;
  sessionId: string;
};

export const LessionAPI = {
  getLessonByDate: async (params: GetLessonByDateParams) => {
    const res = await http.get(`/me/student/lessons?${toQueryParams(params)}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res.data;
  },
  getLessonByClassId: async (class_id: string) => {
    const res = await http.get(`/classes/${class_id}/lessons`);
    return res.data;
  },
};
