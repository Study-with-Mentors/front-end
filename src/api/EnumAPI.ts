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
};
