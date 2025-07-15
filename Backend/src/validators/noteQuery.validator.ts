// src/validators/noteQuery.validator.ts
import { z } from "zod";

// Schema to validate and parse query parameters: page, limit, and search
export const listNotesQuerySchema = z.object({
  page: z.string().optional().default("1").transform(Number),  // default page = 1
  limit: z.string().optional().default("10").transform(Number), // default limit = 10
  search: z.string().optional().default(""),  // default search = ""
});

export type ListNotesQuery = z.infer<typeof listNotesQuerySchema>;
