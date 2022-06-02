import axios from "axios";

export function setBearerToken(token) {
  // console.log("token setBearerToken:>> ", token);
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
}

export function unsetBearerToken() {
  axios.defaults.headers.common["authorization"] = "";
}
