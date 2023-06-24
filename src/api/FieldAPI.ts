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
      const res = await http.get("/field");
      return res?.data;
    } catch (err: any) {
      throw err;
    }
  },
};
