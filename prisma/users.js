import prisma from "./prisma";
import hashPassword from "../helpers/hashPassword";

// READ
export const getAllUsers = async (role) => {
  let users;
  switch (role) {
    case "SUPERADMIN":
      // console.log("role SUPERADMIN:>> ", role);
      users = await prisma.user.findMany({
        where: { OR: [{ role: "User" }, { role: "Moderator" }] },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      // console.log("users :>> ", users);
      break;
    case "Moderator":
      users = await prisma.user.findMany({
        where: { role: "User" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      break;
    default:
      break;
  }

  return users;
};

// export const getUser = async (email) => {
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });
//   return user;
// };
export const getUser = async (param) => {
  // console.log("param getUser:>> ", param);
  const user = await prisma.user.findUnique({
    where: { ...param },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return user;
};

export const findUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

// CREATE
export const createUser = async (body) => {
  const { name, email, password } = body;
  const hasedPassword = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hasedPassword,
      role: "User",
      token: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return user;
};

// UPDATE
export const updateUser = async (id, updateData) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      token: true,
    },
  });
  return user;
};

// DELETE
export const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};
