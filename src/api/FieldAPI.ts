import http from "../utils/http";

export type GetField = {
  id: string;
  version: number;
  name: string;
  code: string;
  description: string;
};

export const FieldAPI = {
  getAll: async () => {
    try {
      const res = await http.get("/field", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      return res?.data;
    } catch (err: any) {
      throw err;
    }
  },
};
