import { Request, Response } from "express";
import { UserService } from "./user.service";
import { ApiResponse, AuthRequest } from "../types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const user = await this.userService.getUserById(userId!);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        } as ApiResponse);
        return;
      }

      res.json({
        success: true,
        message: "Profile retrieved successfully",
        data: user,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get profile",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const updateData = req.body;

      // Remove sensitive fields
      delete updateData.password;
      delete updateData.email;

      const user = await this.userService.updateUser(userId!, updateData);

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: user,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const users = await this.userService.getAllUsers(page, limit);

      res.json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get users",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };
}
