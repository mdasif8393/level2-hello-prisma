import express, { Request, Response } from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/createUser", UserController.insertIntoDB);

router.post("/profile", UserController.insertOrUpdateProfile);

export const UserRoutes = router;
