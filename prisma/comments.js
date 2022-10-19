import prisma from "./prisma";
// import categoriesList from "../helpers/categories";

// READ
export const getComments = async (id) => {
  const comments = await prisma.comment.findMany({
    where: { billId: id },
    select: {
      id: true,
      text: true,
      author: { select: { id: true, name: true } },
      createdAt: true,
    },
  });
  return comments;
};
// export const getAllComments = async (params) => {
//   // console.log("params getAllComments:>> ", params);
//   const {
//     page,
//     sortKey,
//     sortValue,
//     search,
//     "categories[]": categories,
//   } = params;
//   const filteredCategories = categories ? categories : categoriesList;

//   const allComments = await prisma.comment.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//         {
//           text: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//       ],
//       category: { in: filteredCategories },
//     },
//   });
//   const commentsCount = allComments.length;

//   const takenComments = await prisma.comment.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//         {
//           text: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//       ],
//       category: { in: filteredCategories },
//     },
//     orderBy: {
//       [sortKey]: sortValue,
//     },
//     skip: 9 * (page - 1),
//     take: 9,
//     select: {
//       id: true,
//       title: true,
//       text: true,
//       category: true,
//       author: { select: { id: true, email: true } },
//       createdAt: true,
//     },
//   });
//   return { comments: takenComments, count: commentsCount };
// };

// export const getUserComments = async (params) => {
//   // console.log("params getUserComments:>> ", params);
//   const {
//     userId,
//     page,
//     sortKey,
//     sortValue,
//     search,
//     "categories[]": categories,
//   } = params;
//   const filteredCategories = categories ? categories : categoriesList;

//   const allUserComments = await prisma.comment.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//         {
//           text: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//       ],
//       authorId: userId,
//       category: { in: filteredCategories },
//     },
//   });
//   const commentsCount = allUserComments.length;
//   const takenComments = await prisma.comment.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//         {
//           text: {
//             contains: search,
//             mode: "insensitive",
//           },
//         },
//       ],
//       authorId: userId,
//       category: { in: filteredCategories },
//     },
//     orderBy: {
//       [sortKey]: sortValue,
//     },
//     skip: 9 * (page - 1),
//     take: 9,
//     select: {
//       id: true,
//       title: true,
//       text: true,
//       category: true,
//       author: { select: { id: true, email: true } },
//       createdAt: true,
//     },
//   });
//   // console.log("takenComments :>> ", takenComments);
//   return { comments: takenComments, count: commentsCount };
// };

// export const findcomment = async (id) => {
//   const comment = await prisma.comment.findUnique({
//     where: { id },
//   });
//   return comment;
// };

// CREATE
export const addComment = async (body) => {
  const { text, authorId, billId } = body;
  const comment = await prisma.comment.create({
    data: {
      text,
      authorId,
      billId,
    },
  });
  return comment;
};

// UPDATE
export const updateComment = async (id, updateData) => {
  const comment = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return comment;
};

// DELETE
export const deleteComment = async (id) => {
  const comment = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return comment;
};
