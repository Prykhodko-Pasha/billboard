import axios from "axios";

export async function getAllBillsAPI() {
  console.log("body getAllBillsAPI:>> ");
  const { data } = await axios.get("/api/bill");
  console.log("data :>> ", data);
  return data;
}

export async function getUserBillsAPI(body) {
  const { data } = await axios.get("/api/bill", body);
  return data;
}

export async function addBillAPI(body) {
  const { data } = await axios.post("/api/bill", body);
  return data;
}
// export async function loginBillAPI(body) {
//   const { data } = await axios.put("/api/auth", body);
//   const { password, ...BillData } = data;
//   return BillData;
// }
// export async function logoutBillAPI() {
//   await axios.patch("/api/auth");
// }

// export async function delContactAPI(contactId) {
//   await axios.delete(`/contacts/${contactId}`);
//   return contactId;
// }
