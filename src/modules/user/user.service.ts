import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExists = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (isExists) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  } else {
    const result = await prisma.profile.create({
      data,
    });
    return result;
  }
};

const getUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      profile: true,
    },
    // select: {
    //   name: true,
    //   email: true,
    // },
  });

  //// Raw query
  // const result = await prisma.$queryRaw`select * from users`;
  return result;
};

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  insertOrUpdateProfile,
  getUsers,
  getSingleUser,
};
