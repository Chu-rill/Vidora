import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../types";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          error: errors.array()[0].msg,
        } as ApiResponse);
        return;
      }

      const { username, email, password } = req.body;
      const result = await this.authService.register(username, email, password);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: result.user,
          token: result.token,
        },
      } as ApiResponse);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Registration failed",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          error: errors.array()[0].msg,
        } as ApiResponse);
        return;
      }

      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          token: result.token,
        },
      } as ApiResponse);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Login failed",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      await this.authService.logout(userId);

      res.json({
        success: true,
        message: "Logout successful",
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Logout failed",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };
}
