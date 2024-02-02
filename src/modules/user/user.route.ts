import express, { Request, Response } from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/createUser", UserController.insertIntoDB);

router.post("/profile", UserController.insertOrUpdateProfile);

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getSingleUser);

export const UserRoutes = router;
