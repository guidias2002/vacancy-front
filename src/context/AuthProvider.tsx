import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedAccountType = localStorage.getItem('accountType');
    if (storedToken && storedAccountType) {
      setToken(storedToken);
      setAccountType(storedAccountType);
    }
  }, []);

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
  };

  const isAuthenticatedCandidate = Boolean(token && accountType === "CANDIDATE");

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
