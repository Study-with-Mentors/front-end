import { RcFile } from "antd/es/upload";
import jwt from "jwt-decode";
import { Payload } from "../types/Auth.type";

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
  });

export const isValidToken = (token: string): boolean => {
  if (!token) return false;
  const data: Payload = jwt(token);
  const currentTime = new Date().getTime();

  return data.exp * 1000 > currentTime;
};
