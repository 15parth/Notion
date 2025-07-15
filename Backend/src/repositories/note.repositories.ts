// src/repositories/note.repositories.ts
import Note from '../models/Note';

export const createNote = (data: { title: string; content: string }) => {
  return Note.create(data);  // or new Note(data).save()
};

export const getAllNotes = () => {
  return Note.find();
};

export const deleteNoteById = (id: string) => {
  return Note.findByIdAndDelete(id);
};

export const paginateNotes = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [notes, total] = await Promise.all([
    Note.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    Note.countDocuments(),
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

// Paginated search function (case-insensitive)
export const paginateSearchNotes = async (searchParam: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  // Build a filter that searches both the title and content fields
  const searchFilter = {
    $or: [
      { title: { $regex: searchParam, $options: "i" } },
      { content: { $regex: searchParam, $options: "i" } },
    ],
  };

  const [notes, total] = await Promise.all([
    Note.find(searchFilter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Note.countDocuments(searchFilter),
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
