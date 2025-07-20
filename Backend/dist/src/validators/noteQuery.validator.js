"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNotesQuerySchema = void 0;
// src/validators/noteQuery.validator.ts
const zod_1 = require("zod");
// Schema to validate and parse query parameters: page, limit, and search
exports.listNotesQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().default("1").transform(Number), // default page = 1
    limit: zod_1.z.string().optional().default("10").transform(Number), // default limit = 10
    search: zod_1.z.string().optional().default(""), // default search = ""
});
