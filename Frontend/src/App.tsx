import { useEffect, useState } from 'react';

type Note = {
  _id: string;
  title: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch notes on mount
  useEffect(() => {
    fetch('http://localhost:4000/api/pages')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  // Add a note
  const handleAddNote = async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch('http://localhost:4000/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const newNote = await res.json();
      setNotes((prev) => [newNote, ...prev]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a note
  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:4000/api/pages/${id}`, {
        method: 'DELETE',
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900)' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
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

        <div className="space-y-4 mt-8">
          {notes.length === 0 && <p className="text-center text-gray-400">No notes yet.</p>}
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-gradient-to-t from-purple-600 via-indigo-600 to-blue-600 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md bg-white/30 hover:bg-white/40 transition duration-300"
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
      </div>
    </div>
  );
}

export default App;
