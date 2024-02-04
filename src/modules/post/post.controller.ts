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
  const options = req.query;
  console.log(options);
  try {
    const result = await PostService.getAllPosts(options);
    res.send({
      success: true,
      message: "Get Posts Successfully",
      total: result.total,
      data: result.data,
    });
  } catch (err) {
    res.send(err);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getSinglePost(parseInt(req.params.id));
    res.send({
      success: true,
      message: "Get Single Post Successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  console.log(data);
  try {
    const result = await PostService.updatePost(id, data);
    res.send({
      success: true,
      message: "Post updated Successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await PostService.deletePost(id);
    res.send({
      success: true,
      message: "Post deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

// const learnAggregateAndGrouping = async (req: Request, res: Response) => {
//   try {
//     const result = await PostService.learnAggregateAndGrouping();
//     res.send({
//       success: true,
//       message: "!Result Aggregate",
//       data: result,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };

export const PostController = {
  createPostController,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  // learnAggregateAndGrouping,
};
