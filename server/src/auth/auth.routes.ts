import { Router } from "express";
import { AuthController } from "./auth.controller";
import { createUserSchema, loginSchema } from "../user/user.validation";
import { zodValidate } from "../middleware/zodValidate";
import { authenticate } from "../middleware/auth";

const router = Router();
const authController = new AuthController();
router.post(
  "/register",
  zodValidate(createUserSchema),
  authController.register
);
router.post("/login", zodValidate(loginSchema), authController.login);
// router.post("/login", loginValidation, authController.login);
router.post("/logout", authenticate, authController.logout);

export { router as authRoutes };
