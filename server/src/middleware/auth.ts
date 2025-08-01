import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { ApiResponse } from "../types";

const authService = new AuthService();
const userService = new UserService();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Access token required",
      } as ApiResponse);
      return;
    }

    const token = authHeader.substring(7);
    const decoded = authService.verifyToken(token);

    let userId: string | undefined;
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      userId = (decoded as { userId: string }).userId;
    }

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      } as ApiResponse);
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      } as ApiResponse);
      return;
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    } as ApiResponse);
  }
};
