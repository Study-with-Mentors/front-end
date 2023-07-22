import { GetCourseResult } from "../types/Course.type";
import http, { toQueryParams } from "../utils/http";

export type CreateCourseParams = {
  shortName: string;
  fullName: string;
  description: string;
  learningOutcome: string;
  status: string;
  courseLevel: string;
  intendedLearner: string;
  fieldId: string;
};

type Direction = {
  ASC: "ASC";
  DES: "DES";
};

export type SearchCourseParams = {
  orderBy?: string;
  name?: string;
  level?: string;
  mentorId?: string;
  page?: number;
  field?: string[];
  learner?: string;
  dir?: string;
  pageSize?: number;
};

export type UpdateCourseParams = {
  id: string;
  shortName: string;
  version?: number;
  fullName: string;
  description: string;
  learningOutcome: string;
  status: string;
  courseLevel: string;
  intendedLearner: string;
  field: { id: string };
};

export type UpdateCourseImageParams = {
  courseId: string;
  url: string;
};

export type CourseChartData = {
  fieldList: [string];
  fieldValue: [number];
}

export const CourseAPI = {
  getAll: async (searchCourseParams: SearchCourseParams) => {
    var url;
    if (Object.keys(searchCourseParams).length == 0) {
      url = "/courses";
    } else {
      url = `/courses?${toQueryParams(searchCourseParams).toString()}`;
    }

    const res = await http.get(url);
    // console.log(res.data);
    return res.data;
  },
  getAllChart: async () => {
    const res = await http.get("/courses");
    const countByField = res.data.result.reduce((count: any, course: GetCourseResult) => {
      if (!count[course.field.name]) {
        count[course.field.name] = 1;
      } else {
        count[course.field.name] += 1;
      }
      return count;
    }, {});
    const dataReturn = {
      fieldValue: Object.values(countByField),
      fieldList: Object.keys(countByField)
    }
    return dataReturn;
  },
  getVisible: async (searchCourseParams: SearchCourseParams) => {
    var url;
    if (Object.keys(searchCourseParams).length == 0) {
      url = "/courses/visible";
    } else {
      url = `/courses/visible?${toQueryParams(searchCourseParams).toString()}`;
    }

    const res = await http.get(url);
    return res.data;
  },
  getById: async (id: string) => {
    try {
      const res = await http.get(`/courses/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getByIdWithToken: async (id: string) => {
    try {
      const res = await http.get(`/courses/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  createCourse: async (createCourseParams: CreateCourseParams) => {
    const res = await http.post("/courses", createCourseParams, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    return res.data;
  },
  getCourseByMentorToken: async () => {
    const res = await http.get("/me/mentor/courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    return res.data;
  },
  updateCourse: async (params: UpdateCourseParams) => {
    const res = await http.put(`/courses/${params.id}`, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
  updateCourseImage: async ({ courseId, url }: UpdateCourseImageParams) => {
    const res = await http.put(
      `/courses/${courseId}/image`,
      {
        url,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    return res?.data;
  },
};
