import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  accountType: string | null;
  login: (token: string, accountType: string) => void;
  logout: () => void;
  isAuthenticatedCandidate: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedAccountType = localStorage.getItem('accountType');

    const publicRoutes = ['/', '/login', '/register'];

    if (!publicRoutes.includes(location.pathname)) {
      if (storedToken && storedAccountType) {
        setToken(storedToken);
        setAccountType(storedAccountType);
      } else {
        navigate('/login');
        return;
      }
    }

    setLoading(false);
  }, [navigate, location.pathname]);

  const login = (newToken: string, newAccountType: string) => {
    setToken(newToken);
    setAccountType(newAccountType);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('accountType', newAccountType);
  };

  const logout = () => {
    setToken(null);
    setAccountType(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('accountType');
    navigate('/login');
  };

  const isAuthenticatedCandidate = Boolean(token && accountType === "CANDIDATE");

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ token, accountType, login, logout, isAuthenticatedCandidate }}>
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
