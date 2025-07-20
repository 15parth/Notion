// frontend/src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <NotesPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/notes" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
