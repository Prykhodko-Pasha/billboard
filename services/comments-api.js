import axios from "axios";

export async function getCommentsAPI(billId) {
  // console.log("body getAllCommentsAPI:>> ", params);
  const { data } = await axios.get("/api/comment", {
    params: { billId },
  });
  //   console.log("data :>> ", data);
  return data;
}

// export async function getUserCommentsAPI(params) {
//   // console.log("params getUserCommentsAPI:>> ", params);
//   const { data } = await axios.get("/api/comment", {
//     params: { ...params },
//   });
//   return data;
// }

export async function addCommentAPI(body) {
  // console.log("body :>> ", body);
  const { data } = await axios.post("/api/comment", body);
  return data;
}

// export async function updateCommentAPI(body) {
//   //   console.log("commentId getCommentAPI:>> ", body);
//   const { data } = await axios.patch(`/api/comment`, body);
//   return data;
// }

export async function deleteCommentAPI(commentId) {
  // console.log("commentId deleteCommentAPI:>> ", commentId);
  const { data } = await axios.delete(`/api/comment`, {
    params: { commentId },
  });
  return data;
}
