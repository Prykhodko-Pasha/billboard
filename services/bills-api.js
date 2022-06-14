import axios from "axios";

export async function getAllBillsAPI(page) {
  // console.log("body getAllBillsAPI:>> ", page);
  const { data } = await axios.get("/api/bill", {
    params: { page },
  });
  //   console.log("data :>> ", data);
  return data;
}

export async function getUserBillsAPI(userId, page) {
  //   console.log("body getUserBillsAPI:>> ", body);
  const { data } = await axios.get("/api/bill", {
    params: { userId, page },
  });
  return data;
}

export async function addBillAPI(body) {
  // console.log("body :>> ", body);
  const { data } = await axios.post("/api/bill", body);
  return data;
}

export async function updateBillAPI(body) {
  //   console.log("billId getBillAPI:>> ", body);
  const { data } = await axios.patch(`/api/bill`, body);
  return data;
}

export async function deleteBillAPI(billId) {
  // console.log("billId deleteBillAPI:>> ", billId);
  const { data } = await axios.delete(`/api/bill`, {
    params: { billId },
  });
  return data;
}
