import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Retailer } from '@/types/retailer';
import { getUser, saveUser, clearUser } from '@/lib/storage';

interface AuthContextType {
  user: Retailer | null;
  login: (user: Retailer) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Retailer | null>(null);

  useEffect(() => {
    const stored = getUser();
    if (stored) setUser(stored);
  }, []);

  const login = (u: Retailer) => {
    setUser(u);
    saveUser(u);
  };

  const logout = () => {
    setUser(null);
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
