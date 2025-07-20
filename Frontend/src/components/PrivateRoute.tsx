// frontend/src/components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';  // <-- Corrected import

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
