import axios from "axios";

export function setBearerToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function unsetBearerToken() {
  axios.defaults.headers.common.Authorization = "";
}
