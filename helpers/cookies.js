import Cookies from "js-cookie";

export function setCookies(user) {
  Cookies.set("user", JSON.stringify(user), { expires: 1 });
}

export function getCookies() {
  return Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
}

export function clearCookies() {
  Cookies.remove("user");
}
