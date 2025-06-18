'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  gender: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    const adminStatus = localStorage.getItem('isAdmin');
    
    console.log('AuthContext - Token:', !!token, 'UserData:', !!userData, 'AdminStatus:', adminStatus);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('AuthContext - Parsed user:', parsedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        const adminCheck = adminStatus === 'true' || parsedUser.isAdmin === true;
        console.log('AuthContext - Setting admin status:', adminCheck);
        setIsAdmin(adminCheck);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    console.log('AuthContext - Login called with:', { token: !!token, userData });
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    if (userData.isAdmin) {
      console.log('AuthContext - Setting admin flag in localStorage');
      localStorage.setItem('isAdmin', 'true');
    }
    setUser(userData);
    setIsAuthenticated(true);
    const adminStatus = userData.isAdmin || false;
    console.log('AuthContext - Setting admin state:', adminStatus);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdmin');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('userToken');
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        checkAuth,
      }}
    >
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
