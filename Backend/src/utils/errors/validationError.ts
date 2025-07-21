import { ZodError } from "zod";

export default class ValidationErrors extends Error {
  statusCode = 400;
  explanation: string[];

  constructor(error: ZodError) {
    super("Validation failed");
    this.name = "ValidationError";

    // Use `issues` instead of `errors`
    this.explanation = error.issues.map((issue) => {
      const field = issue.path.join(".") || "field";
      return `${field}: ${issue.message}`;
    });

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
