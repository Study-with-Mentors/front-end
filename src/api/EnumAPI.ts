import http from "../utils/http";

export const EnumAPI = {
  getCourseLevel: async () => {
    const res = await http.get("/enums/course/level");
    return res.data;
  },
  getUserEducation: async () => {
    const res = await http.get("/enums/user/education");
    return res.data;
  },
  getCourseStatus: async () => {
    const res = await http.get("/enums/course/status");
    return res.data;
  },
  getCourseIntendedLearner: async () => {
    const res = await http.get("/enums/course/intendtedLeanrer");
    return res.data;
  },
  getEnrollmentStatus: async () => {
    const res = await http.get("/enums/enrollment/status");
    return res.data;
  },
};
