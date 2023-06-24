import http, { toQueryParams } from "../utils/http";

export type DateTimeFilter = {
  lowerTime: Date;
  upperTime: Date;
};

export const ClassAPI = {
  getClassByUserToken: async () => {
    const res = await http.get(`/student/clazz`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getLessonByUserToken: async (params: DateTimeFilter) => {
    const res = await http.get(`/student/lesson${toQueryParams(params)}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
};
