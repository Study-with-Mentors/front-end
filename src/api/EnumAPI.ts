import http from "../utils/http";

export const EnumAPI = {
  getCourseLevel: async () => {
    try {
      const res = await http.get("/enums/course/level");
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
