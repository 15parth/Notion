"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 for unexpected errors
    const message = err.message || "Something went wrong";
    // For validation or custom errors, you might want to send more details (e.g., validation errors)
    const response = {
        success: false,
        message,
        ...(err.explanation && { explanation: err.explanation }), // Include explanation if available
    };
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
