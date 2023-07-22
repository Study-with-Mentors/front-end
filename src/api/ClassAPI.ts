import { GetSearchClass } from "../types/Class.type";
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
    const res = await http.get(`/me/student/classes`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getLessonByUserToken: async (params: DateTimeFilter) => {
    const res = await http.get(`/me/students/lessons${toQueryParams(params)}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getClassByCourseId: async (courseId: string) => {
    const res = await http.get(`/courses/${courseId}/classes`);
    return res?.data;
  },
  getClassByCourseIdWithToken: async (courseId: string) => {
    const res = await http.get(`/courses/${courseId}/classes`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  getClassByClassId: async (classId: string) => {
    const res = await http.get(`/classes/${classId}`);
    return res?.data;
  },
  searchClass: async (params: SearchClassParams): Promise<GetSearchClass> => {
    var url;
    if (Object.keys(params).length == 0) {
      url = "/classes";
    } else {
      url = `/classes?${toQueryParams(params).toString()}`;
    }
    const res = await http.get(url);
    return res?.data;
  },
  createClass: async (params: CreateClassParams) => {
    const res = await http.post(`/classes`, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
};
