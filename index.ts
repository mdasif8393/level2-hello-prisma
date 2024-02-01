import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // get users

  //   const getAllUsers = await prisma.user.findMany();
  //   console.log(getAllUsers);

  // create user

  const postUser = await prisma.user.create({
    data: {
      email: "asif2@gmail.com",
      name: "Asif2",
      age: 35,
    },
  });
  console.log(postUser);
}

main();
