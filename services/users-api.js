import axios from "axios";

export async function getUserAPI() {
  const { data } = await axios.get("/api/auth");
  console.log("data getUserAPI:>> ", data);
  return data;
}

export async function addUserAPI(body) {
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

export async function delContactAPI(contactId) {
  await axios.delete(`/contacts/${contactId}`);
  return contactId;
}
