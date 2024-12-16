import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

interface ProtectedRouteProps {
  children: JSX.Element;
  isProtected: boolean;
  accountType?: ("CANDIDATE" | "ENTERPRISE" | "RECRUITER")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, accountType }) => {
  const { isAuthenticatedCandidate, isAuthenticatedEnterprise, isAuthenticatedRecruiter } = useAuth();

  const isAuthenticated = (type: "CANDIDATE" | "ENTERPRISE" | "RECRUITER") => {
    if (type === "CANDIDATE") return isAuthenticatedCandidate;
    if (type === "ENTERPRISE") return isAuthenticatedEnterprise;
    if (type === "RECRUITER") return isAuthenticatedRecruiter;
    
    return false;
  };

  if (accountType?.some(isAuthenticated)) {
    return children;
  }

  const redirectPath = accountType?.includes("CANDIDATE") ? "/login" : "/login-enterprise";

  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
