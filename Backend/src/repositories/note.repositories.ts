import Note from '../models/Note';

export const createNote = (data: { title: string; content: string }) => {
  return Note.create(data); // or new Note(data).save()
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