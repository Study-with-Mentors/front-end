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

const http = new Http().instance;

http.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res;
    }
    return res;
  },
  (err) => {
    if (err.response.status == 401) {
      // window.location.href = "http://localhost:3000";
    }
    throw err;
  }
);

export default http;
