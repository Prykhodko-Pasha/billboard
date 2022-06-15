import axios from "axios";

export async function getUserAPI() {
  const { data } = await axios.get("/api/auth");
  // console.log("data getUserAPI:>> ", data);
  return data;
}

export async function getAllUsersAPI(params) {
  const { data } = await axios.get("/api/user", {
    params: { ...params },
  });
  // console.log("data getAllUsersAPI:>> ", data);
  return data;
}

export async function addUserAPI(body) {
  // console.log("body addUserAPI:>> ", body);
  const { data } = await axios.post("/api/user", body);
  return data;
}
export async function loginUserAPI(body) {
  // console.log("body loginUserAPI:>> ", body);
  const { data } = await axios.put("/api/auth", body);
  // console.log("data loginUserAPI:>> ", data);
  const { password, ...userData } = data;
  return userData;
}
export async function logoutUserAPI() {
  await axios.patch("/api/auth");
}

export async function deleteUserAPI(userId) {
  // console.log("userId deleteUserAPI:>> ", userId);
  const { data } = await axios.delete(`/api/user`, {
    params: { userId },
  });
  return data;
}

export async function updateUserAPI(body) {
  //   console.log("billId updateUserAPI:>> ", body);
  const { data } = await axios.patch(`/api/user`, body);
  return data;
}
