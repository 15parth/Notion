"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationErrors extends Error {
    constructor(error) {
        super("Validation failed");
        this.statusCode = 400;
        this.name = "ValidationError";
        // Use `issues` instead of `errors`
        this.explanation = error.issues.map((issue) => {
            const field = issue.path.join(".") || "field";
            return `${field}: ${issue.message}`;
        });
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.default = ValidationErrors;
