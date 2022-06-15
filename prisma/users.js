import prisma from "./prisma";
import hashPassword from "../helpers/hashPassword";

// READ
export const getAllUsers = async (params) => {
  console.log("params getAllUsers:>> ", params);
  const { id: userId, role, page, search } = params;
  let users;
  let allUsers;
  let usersCount;

  switch (role) {
    case "SUPERADMIN":
      // console.log("role SUPERADMIN:>> ", role);
      allUsers = await prisma.user.findMany({
        where: {
          OR: [{ role: "User" }, { role: "Moderator" }],
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          NOT: { id: userId },
        },
      });
      // console.log("allUsers :>> ", allUsers);
      usersCount = allUsers.length;

      users = await prisma.user.findMany({
        orderBy: {
          id: "desc",
        },
        skip: 9 * (page - 1),
        take: 9,
        where: {
          OR: [{ role: "User" }, { role: "Moderator" }],
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          NOT: { id: userId },
        },
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
      allUsers = await prisma.user.findMany({
        where: {
          role: "User",
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      usersCount = allUsers.length;

      users = await prisma.user.findMany({
        orderBy: {
          id: "desc",
        },
        skip: 9 * (page - 1),
        take: 9,
        where: {
          role: "User",
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
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
  return { users, count: usersCount };
  // return users;
};

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
