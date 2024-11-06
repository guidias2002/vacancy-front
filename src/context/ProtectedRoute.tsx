import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticatedCandidate } = useAuth();

  return isAuthenticatedCandidate ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
