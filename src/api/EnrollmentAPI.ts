import http from "../utils/http";

export type EnrollClassParams = {
  studentId: string;
  classId: string;
  paymentType: string;
};

export const EnrollmentAPI = {
  enrollClass: async (params: EnrollClassParams) => {
    const res = await http.post("/enrollments", params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    return res?.data;
  },
};
