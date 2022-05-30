import prisma from "./prisma";
// import hashPassword from "../helpers/hashPassword";

// READ
export const getAllBills = async () => {
  const bills = await prisma.bill.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      author: { select: { email: true } },
    },
  });
  return bills;
};

export const getUserBills = async (userId) => {
  const bills = await prisma.bill.findMany({
    where: { authorId: userId },
  });
  return bills;
};

export const getBill = async (id) => {
  const bill = await prisma.bill.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      text: true,
      //   author: { select: { email: true } },
    },
  });
  return bill;
};

// export const findbill = async (id) => {
//   const bill = await prisma.bill.findUnique({
//     where: { id },
//   });
//   return bill;
// };

// CREATE
export const createBill = async (body) => {
  const { title, text, authorId } = body;
  const bill = await prisma.bill.create({
    data: {
      title,
      text,
      authorId,
    },
  });
  return bill;
};

// UPDATE
export const updateBill = async (id, updateData) => {
  const bill = await prisma.bill.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return bill;
};

// DELETE
export const deleteBill = async (id) => {
  const bill = await prisma.bill.delete({
    where: {
      id,
    },
  });
  return bill;
};
