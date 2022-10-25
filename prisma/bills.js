import prisma from "./prisma";
import categoriesList from "../helpers/categories";

// READ
export const getAllBills = async (params) => {
  // console.log("params getAllBills:>> ", params);
  const {
    page,
    sortKey,
    sortValue,
    search,
    "categories[]": categories,
  } = params;
  const filteredCategories = categories ? categories : categoriesList;

  const allBills = await prisma.bill.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          text: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
      category: { in: filteredCategories },
    },
  });
  const billsCount = allBills.length;

  const takenBills = await prisma.bill.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          text: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
      category: { in: filteredCategories },
    },
    orderBy: {
      [sortKey]: sortValue,
    },
    skip: 9 * (page - 1),
    take: 9,
    select: {
      id: true,
      title: true,
      text: true,
      category: true,
      author: { select: { id: true, email: true } },
      createdAt: true,
    },
  });
  return { bills: takenBills, count: billsCount };
};

export const getUserBills = async (params) => {
  // console.log("params getUserBills:>> ", params);
  const {
    userId,
    page,
    sortKey,
    sortValue,
    search,
    "categories[]": categories,
  } = params;
  const filteredCategories = categories ? categories : categoriesList;

  const allUserBills = await prisma.bill.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          text: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
      authorId: userId,
      category: { in: filteredCategories },
    },
  });
  const billsCount = allUserBills.length;
  const takenBills = await prisma.bill.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          text: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
      authorId: userId,
      category: { in: filteredCategories },
    },
    orderBy: {
      [sortKey]: sortValue,
    },
    skip: 9 * (page - 1),
    take: 9,
    select: {
      id: true,
      title: true,
      text: true,
      category: true,
      author: { select: { id: true, email: true } },
      createdAt: true,
    },
  });
  // console.log("takenBills :>> ", takenBills);
  return { bills: takenBills, count: billsCount };
};

export const getBill = async (id) => {
  const bill = await prisma.bill.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      text: true,
      category: true,
      author: { select: { id: true, email: true } },
      createdAt: true,
    },
  });
  return bill;
};

export const findBill = async (id) => {
  const bill = await prisma.bill.findUnique({
    where: { id },
  });
  return bill;
};

// CREATE
export const createBill = async (body) => {
  const { title, text, category, authorId } = body;
  const bill = await prisma.bill.create({
    data: {
      title,
      text,
      category,
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
