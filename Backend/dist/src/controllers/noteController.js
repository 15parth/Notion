"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getNotes = exports.createNote = void 0;
const noteService = __importStar(require("../services/note.services"));
const note_validator_1 = require("../validators/note.validator");
const noteQuery_validator_1 = require("../validators/noteQuery.validator");
const validationError_1 = __importDefault(require("../utils/errors/validationError"));
const createNote = async (req, res, next) => {
    const result = note_validator_1.createNoteSchema.safeParse(req.body);
    if (!result.success) {
        throw new validationError_1.default(result.error); // ✅ works correctly now
    }
    // If validation passes, proceed with note creation logic
    const { title, content } = result.data;
    const note = await noteService.createNote(title, content);
    res.status(201).json(note);
};
exports.createNote = createNote;
const getNotes = async (req, res) => {
    try {
        const query = noteQuery_validator_1.listNotesQuerySchema.parse(req.query); // validate query params
        const { search } = query;
        // If search parameter is passed, use searchNotes, else return all notes
        const notes = search
            ? await noteService.searchNotes(search, query.page, query.limit)
            : await noteService.getAllNotes(query.page, query.limit);
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(500).json({ error: err.message || 'Server Error' });
    }
};
exports.getNotes = getNotes;
const deleteNote = async (req, res) => {
    const id = req.params.id;
    await noteService.deleteNote(id);
    res.status(200).json({ message: 'Note deleted' });
};
exports.deleteNote = deleteNote;
