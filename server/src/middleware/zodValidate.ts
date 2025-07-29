import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const zodValidate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the provided schema
      const validatedData = schema.parse(req.body);

      // Replace req.body with validated data (this ensures type safety)
      req.body = validatedData;

      // Continue to the next middleware/controller
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format Zod validation errors into a more readable format
        const errorMessages = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          code: err.code,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errorMessages,
        });
      }

      // Handle unexpected errors
      return res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };
};
