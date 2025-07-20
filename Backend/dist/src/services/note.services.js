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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.deleteNote = exports.getAllNotes = exports.createNote = void 0;
// src/services/note.services.ts
const noteRepo = __importStar(require("../repositories/note.repositories"));
const createNote = async (title, content) => {
    return await noteRepo.createNote({ title, content });
};
exports.createNote = createNote;
const getAllNotes = async (page, limit) => {
    return await noteRepo.paginateNotes(page, limit);
};
exports.getAllNotes = getAllNotes;
const deleteNote = async (id) => {
    return await noteRepo.deleteNoteById(id);
};
exports.deleteNote = deleteNote;
// Search for notes with pagination and case-insensitive matching
const searchNotes = async (searchParam, page, limit) => {
    return await noteRepo.paginateSearchNotes(searchParam, page, limit);
};
exports.searchNotes = searchNotes;
