import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  const response: ApiResponse = {
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  };

  res.status(500).json(response);
};

// src/middleware/validation.ts
import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

export const createRoomValidation = [
  body("name")
    .isLength({ min: 1, max: 100 })
    .withMessage("Room name must be between 1 and 100 characters")
    .trim(),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must be less than 500 characters"),

  body("type")
    .isIn(["public", "private"])
    .withMessage("Room type must be either public or private"),

  body("maxParticipants")
    .optional()
    .isInt({ min: 2, max: 50 })
    .withMessage("Max participants must be between 2 and 50"),
];
