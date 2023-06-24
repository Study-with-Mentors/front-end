import jwtDecode from "jwt-decode";
import { JwtPayload } from "../types/Jwt.type";

export const decode = (access_token: string): JwtPayload => {
  var decode: JwtPayload = jwtDecode(access_token);
  return decode;
};
