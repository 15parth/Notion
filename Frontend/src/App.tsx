// src/App.tsx
import { useEffect, useState } from 'react';
import { api } from './utils/api';
import { Pagination } from './utils/pagination';

type Note = {
  _id: string;
  title: string;
  content: string;
};

const PAGE_SIZE = 10;

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    api
      .get('/pages', { params: { page, limit: PAGE_SIZE } })
      .then((res) => {
        setNotes(res?.data?.data);
        setTotal(res?.data?.totalNotes);
      })
      .catch(console.error);
  }, [page]);

  const refresh = () => setPage(1);

  const handleAddNote = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/pages', { title, content });
      setTitle('');
      setContent('');
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/pages/${id}`);
      if (notes.length === 1 && page > 1) setPage(page - 1);
      else refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900)' }}
    >
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative min-h-screen bg-gradient-to-t from-blue-500 to-transparent text-white p-6 max-w-2xl mx-auto rounded-xl shadow-xl">

        <h1 className="text-4xl font-bold mb-6 text-center">📝 My Notes</h1>

        <div className="mb-6 space-y-4 backdrop-blur-md bg-white/30 p-6 rounded-xl border border-gray-300 shadow-lg">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 rounded-lg bg-transparent border border-gray-700 focus:ring-2 focus:ring-emerald-500 transition duration-200 text-white"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-3 rounded-lg bg-transparent border border-gray-700 focus:ring-2 focus:ring-emerald-500 transition duration-200 text-white"
            rows={4}
          />
          <button
            onClick={handleAddNote}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            Add Note
          </button>
        </div>

        <div className="space-y-8">
          {notes.length === 0 && <p className="text-center text-gray-400">No notes yet.</p>}
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-gradient-to-t from-purple-600 via-indigo-600 to-blue-600 p-6 m-4 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md bg-white/30 hover:bg-white/40 transition duration-300"
            >
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold text-emerald-300">{note.title}</h2>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-400 hover:text-red-500 text-sm font-semibold"
                >
                  🗑️ Delete
                </button>
              </div>
              <p className="text-gray-200">{note.content}</p>
            </div>
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default App;
