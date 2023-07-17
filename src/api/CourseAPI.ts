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
  page?: string;
  field?: string[];
  learner?: string;
  dir?: string;
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

export const CourseAPI = {
  getAll: async (searchCourseParams: SearchCourseParams) => {
    var url;
    if (Object.keys(searchCourseParams).length == 0) {
      url = "/courses";
    } else {
      url = `/courses?${toQueryParams(searchCourseParams).toString()}`;
    }

    const res = await http.get(url);
    console.log(res.data);
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
