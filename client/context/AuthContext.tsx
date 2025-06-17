'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const token = localStorage.getItem('userToken');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
    }
  }, []);

  const login = (token: string, adminStatus: boolean) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('isAdmin', String(adminStatus));
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
