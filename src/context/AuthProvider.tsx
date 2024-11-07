import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  candidateName: string | null;
  candidateId: number | null;
  token: string | null;
  accountType: string | null;
  login: (candidateName: string, candidateId:number, token: string, accountType: string) => void;
  logout: () => void;
  isAuthenticatedCandidate: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidateId, setCandidateId] = useState<number | null>(null);
  const [candidateName, setCandidateName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedAccountType = localStorage.getItem('accountType');
    const storedCandidateId = localStorage.getItem('candidateId');
    const storedCandidateName = localStorage.getItem('candidateName');

    const publicRoutes = ['/', '/login', '/register'];

    if (!publicRoutes.includes(location.pathname)) {
      if (storedToken && storedAccountType && storedCandidateId) {
        setCandidateId(Number(storedCandidateId));
        setCandidateName(storedCandidateName);
        setToken(storedToken);
        setAccountType(storedAccountType);
      } else {
        navigate('/login');
        return;
      }
    }

    setLoading(false);
  }, [navigate, location.pathname]);

  const login = (newCandidateName: string, newCandidateId: number, newToken: string, newAccountType: string) => {
    setCandidateName(newCandidateName);
    setCandidateId(newCandidateId);
    setToken(newToken);
    setAccountType(newAccountType);
    localStorage.setItem('candidateName', newCandidateName);
    localStorage.setItem('candidateId', String(newCandidateId));
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('accountType', newAccountType);
  };

  const logout = () => {

    setCandidateName(null);
    setCandidateId(null);
    setToken(null);
    setAccountType(null);

    localStorage.removeItem('candidateName');
    localStorage.removeItem('candidateId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('accountType');
    navigate('/login');
  };

  const isAuthenticatedCandidate = Boolean(candidateId && token && accountType === "CANDIDATE");

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ candidateName, candidateId, token, accountType, login, logout, isAuthenticatedCandidate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
