import axios from "axios";

// export async function fetchUsersAPI() {
//   const { data } = await axios.get("/api/user");
//   return data;
// }

export async function addUserAPI(body) {
  const { data } = await axios.post("/api/user", body);
  // console.log("data :>> ", data);
  return data;
}
export async function loginUserAPI(body) {
  const { data } = await axios.put("/api/auth", body);
  // console.log("data :>> ", data);
  return data;
}

export async function delContactAPI(contactId) {
  await axios.delete(`/contacts/${contactId}`);
  return contactId;
}
