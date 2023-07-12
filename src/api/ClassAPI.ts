import http, { toQueryParams } from "../utils/http";
import { CreateLessonParams } from "./LessonAPI";

export type DateTimeFilter = {
  lowerTime: Date;
  upperTime: Date;
};

export type CreateClassParams = {
  startDate: string;
  endDate: string;
  enrollmentEndDate: string;
  price: number;
  courseId: string;
  lessonCreateDtos: CreateLessonParams[];
};

export type SearchClassParams = {
  orderBy?: string;
  page?: number;
  name?: string;
  mentorId?: string;
  lowerStartDate?: string;
  upperStartDate?: string;
  lowerEndDate?: string;
  upperEndDate?: string;
  lowerEnrollmentDate?: string;
  upperEnrollmentDate?: string;
  lowerPrice?: number;
  upperPrice?: number;
  level?: string;
  learner?: string;
  dir?: string;
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
  getClassByCourseId: async (courseId: string) => {
    const res = await http.get(`/course/${courseId}/clazz`);
    return res?.data;
  },
  getClassByClassId: async (classId: string) => {
    const res = await http.get(`/clazz/${classId}`);
    return res?.data;
  },
  searchClass: async (params: SearchClassParams) => {
    var url;
    if (Object.keys(params).length == 0) {
      url = "/clazz";
    } else {
      url = `/clazz?${toQueryParams(params).toString()}`;
    }
    const res = await http.get(url);
    return res?.data;
  },
  createClass: async (params: CreateClassParams) => {
    const res = await http.post(`/clazz`, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
};
