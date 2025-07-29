import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { AuthRequest, ApiResponse } from "../types";

const authService = new AuthService();
const userService = new UserService();

export const authenticate = async (
  req: AuthRequest,
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

    const user = await userService.getUserById(decoded.userId);
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
