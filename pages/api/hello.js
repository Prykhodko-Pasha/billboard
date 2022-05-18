import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();

  // await prisma.user.create({
  //   data: {
  //     name: "Rich",
  //     email: "hello@prisma.com",
  //     password: "123456",
  //     role: "USER",
  //     token: "kjgsdkj",
  //     bills: {
  //       create: {
  //         title: "My first post",
  //         text: "Lots of really interesting stuff",
  //       },
  //     },
  //   },
  // });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     bills: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
  // console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
