import Cookies from "js-cookie";
import { setBearerToken, unsetBearerToken } from "./axiosHeaders";

export function setCookies(token) {
  Cookies.set("token", JSON.stringify(token), { expires: 1 });
  setBearerToken(token);
}

export function getCookies() {
  return Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;
}

export function clearCookies() {
  Cookies.remove("token");
  unsetBearerToken();
}
