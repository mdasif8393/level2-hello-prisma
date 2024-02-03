import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.createPostController);

router.get("/", PostController.getAllPosts);

export const PostRoutes = router;
