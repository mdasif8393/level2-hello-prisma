import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.createPostController);

router.get("/", PostController.getAllPosts);

router.get("/:id", PostController.getSinglePost);

router.patch("/:id", PostController.updatePost);

router.delete("/:id", PostController.deletePost);

// router.get("/", PostController.learnAggregateAndGrouping);

export const PostRoutes = router;
