"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateSearchNotes = exports.paginateNotes = exports.deleteNoteById = exports.getAllNotes = exports.createNote = void 0;
// src/repositories/note.repositories.ts
const Note_1 = __importDefault(require("../models/Note"));
const createNote = (data) => {
    return Note_1.default.create(data); // or new Note(data).save()
};
exports.createNote = createNote;
const getAllNotes = () => {
    return Note_1.default.find();
};
exports.getAllNotes = getAllNotes;
const deleteNoteById = (id) => {
    return Note_1.default.findByIdAndDelete(id);
};
exports.deleteNoteById = deleteNoteById;
const paginateNotes = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [notes, total] = await Promise.all([
        Note_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
        Note_1.default.countDocuments(),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        totalPages,
        totalNotes: total,
        data: notes,
    };
};
exports.paginateNotes = paginateNotes;
// Paginated search function (case-insensitive)
const paginateSearchNotes = async (searchParam, page, limit) => {
    const skip = (page - 1) * limit;
    // Build a filter that searches both the title and content fields
    const searchFilter = {
        $or: [
            { title: { $regex: searchParam, $options: "i" } },
            { content: { $regex: searchParam, $options: "i" } },
        ],
    };
    const [notes, total] = await Promise.all([
        Note_1.default.find(searchFilter).skip(skip).limit(limit).sort({ createdAt: -1 }),
        Note_1.default.countDocuments(searchFilter),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        totalPages,
        totalNotes: total,
        data: notes,
    };
};
exports.paginateSearchNotes = paginateSearchNotes;
