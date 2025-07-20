// frontend/src/components/LogoutButton.tsx
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button
      className="bg-red-500 text-white px-3 py-1 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
