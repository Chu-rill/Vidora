import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import {
  registerValidation,
  loginValidation,
} from "../validation/authValidation";
import { zodValidate } from "../middleware/zodValidate";
import { authenticate } from "../middleware/auth";

const router = Router();
const authController = new AuthController();
router.post(
  "/register",
  zodValidate(registerValidation),
  authController.register
);
router.post("/login", zodValidate(loginValidation), authController.login);
// router.post("/login", loginValidation, authController.login);
router.post("/logout", authenticate, authController.logout);

export { router as authRoutes };
