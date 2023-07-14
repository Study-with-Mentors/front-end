import jwtDecode from "jwt-decode";
import { JwtPayload } from "../types/Jwt.type";

export const decode = (access_token: string): JwtPayload => {
  if (!access_token) {
    localStorage.clear();
    return {
      exp: 0,
      iat: 0,
      rol: "0",
      sub: "0",
      uid: "0",
    };
  } else {
    var decode: JwtPayload = jwtDecode(access_token);
    const date = new Date();
    if (date.getSeconds() > decode.exp) {
      localStorage.clear();
      return {
        exp: 0,
        iat: 0,
        rol: "0",
        sub: "0",
        uid: "0",
      };
    }
    return decode;
  }
};
