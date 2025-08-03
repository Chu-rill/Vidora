import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
const userController = new UserController();

router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, userController.updateProfile);
router.get("/", authenticate, userController.getAllUsers);

export { router as userRoutes };
