import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPostController = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.send({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPosts();
    res.send({
      success: true,
      message: "Get Posts Successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const PostController = {
  createPostController,
  getAllPosts,
};
