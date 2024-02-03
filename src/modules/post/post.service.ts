import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

/**
 * Pagination
 * limit = 5
 * page = 3
 * total = 20
 * skip = limit * page - limit
 * limit= 5 * 3 - 5 = 10
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
 */

const getAllPosts = async (options: any) => {
  return prisma.$transaction(async (tx) => {
    const { sortBy, sortOrder, searchTerm, page, limit } = options;
    const take = parseInt(limit) || 10;
    const skip = parseInt(page) * parseInt(limit) - parseInt(limit) || 0;
    const result = await tx.post.findMany({
      take,
      skip,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await tx.post.count();

    return {
      data: result,
      total,
    };
  });
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      category: true,
    },
  });
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
