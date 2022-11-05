import axios from "axios";

export async function getVoteAPI(params) {
  // console.log("params getVoteAPI:>> ", params);
  const { data } = await axios.get("/api/vote", {
    params: { ...params },
  });
  // console.log("data :>> ", data);
  return data;
}

export async function postVoteAPI(body) {
  // console.log("body :>> ", body);
  const { data } = await axios.post("/api/vote", body);
  return data;
}
