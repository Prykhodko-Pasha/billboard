import axios from "axios";

// export async function fetchUsersAPI() {
//   const { data } = await axios.get("/api/user");
//   return data;
// }

export async function addUserAPI(body) {
  const { data } = await axios.post("/api/user", body);
  return data;
}
export async function loginUserAPI(body) {
  const { data } = await axios.put("/api/auth", body);
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
