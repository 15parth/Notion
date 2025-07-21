// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  explanation?: string[];
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;  // Default to 500 for unexpected errors
  const message = err.message || "Something went wrong";

  // For validation or custom errors, you might want to send more details (e.g., validation errors)
  const response = {
    success: false,
    message,
    ...(err.explanation && { explanation: err.explanation }),  // Include explanation if available
  };

  res.status(statusCode).json(response);
};
