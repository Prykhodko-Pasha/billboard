import axios from "axios";

export function setBearerToken(token) {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
}

export function unsetBearerToken() {
  axios.defaults.headers.common["authorization"] = "";
}
