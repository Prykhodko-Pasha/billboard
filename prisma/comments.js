import prisma from "./prisma";

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

export const findComment = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  return comment;
};

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

// DELETE
export const deleteComment = async (id) => {
  const comment = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return comment;
};
