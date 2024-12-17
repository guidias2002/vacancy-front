import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  userName: string | null;
  userId: number | null;
  token: string | null;
  accountType: string | null;
  login: (userName: string, userId: number, token: string, accountType: string) => void;
  logout: () => void;
  isAuthenticatedCandidate: boolean;
  isAuthenticatedEnterprise: boolean;
  isAuthenticatedRecruiter: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedAccountType = localStorage.getItem('accountType');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    const publicRoutes = ['/', '/login', '/register', '/login-enterprise', '/register-enterprise', '/login-recruiter'];

    if (!publicRoutes.includes(location.pathname)) {
      if (storedToken && storedAccountType && storedUserId) {
        setUserId(Number(storedUserId));
        setUserName(storedUserName);
        setToken(storedToken);
        setAccountType(storedAccountType);
      } else {
        navigate('/login');
        return;
      }
    }

    setLoading(false);
  }, [navigate, location.pathname]);

  const login = (newUserName: string, newUserId: number, newToken: string, newAccountType: string) => {
    setUserName(newUserName);
    setUserId(newUserId);
    setToken(newToken);
    setAccountType(newAccountType);
    localStorage.setItem('userName', newUserName);
    localStorage.setItem('userId', String(newUserId));
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('accountType', newAccountType);
  };

  const logout = () => {
    setUserName(null);
    setUserId(null);
    setToken(null);
    setAccountType(null);

    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('accountType');

    {accountType === 'CANDIDATE' ? navigate('/login') : navigate('/login-enterprise')}
  };

  const isAuthenticatedCandidate = Boolean(userId && token && accountType === "CANDIDATE");
  const isAuthenticatedEnterprise = Boolean(userId && token && accountType === "ENTERPRISE");
  const isAuthenticatedRecruiter = Boolean(userId && token && accountType === "RECRUITER");

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        userName,
        userId,
        token,
        accountType,
        login,
        logout,
        isAuthenticatedCandidate,
        isAuthenticatedEnterprise,
        isAuthenticatedRecruiter,
      }}
    >
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

