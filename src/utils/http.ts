import { notification } from "antd";
import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_LINK,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const getAccessToken = (): string => {
  const ACCESS_TOKEN = localStorage.getItem("access_token");
  if (ACCESS_TOKEN) {
    return ACCESS_TOKEN;
  }
  return "";
};

export const toQueryParams = (data: any): string => {
  const qs = Object.keys(data)
    .map((key) =>
      Array.isArray(data[key])
        ? data[key].map((v: string) => `${key}=${v}`).join("&")
        : `${key}=${data[key]}`
    )
    .join("&");

  return qs;
};

const http = new Http().instance;

http.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res;
    }
    return res;
  },
  (err) => {
    if (err.response.status == 400) {
      localStorage.clear();
      window.location.href =
        process.env.REACT_APP_CLIENT_LINK + "/auth" ||
        "https://studywithmentor.id.vn/auth";
      notification.error({
        message: "Your login session has expired. Please login again",
      });
    }
    throw err;
  }
);

export default http;
