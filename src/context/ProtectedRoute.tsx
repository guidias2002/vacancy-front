import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

interface ProtectedRouteProps {
  children: JSX.Element;
  accountType: "CANDIDATE" | "ENTERPRISE";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, accountType }) => {
  const { isAuthenticatedCandidate, isAuthenticatedEnterprise } = useAuth();

  if (accountType === "CANDIDATE" && isAuthenticatedCandidate) {
    return children;
  }

  if (accountType === "ENTERPRISE" && isAuthenticatedEnterprise) {
    return children;
  }

  return <Navigate to={accountType === "CANDIDATE" ? "/login" : "/login-enterprise"} replace />;
};

export default ProtectedRoute;
