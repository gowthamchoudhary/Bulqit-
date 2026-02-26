import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Retailer } from '@/types/retailer';
import { getUser, saveUser, clearUser } from '@/lib/storage';
import i18n from '@/i18n';

const LANGUAGE_STORAGE_KEY = 'bulqit_language';
const SUPPORTED_LANGUAGES = ['en', 'hi', 'te', 'ta', 'kn', 'ml'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const getStoredLanguage = (): SupportedLanguage => {
  const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null;
  return raw && SUPPORTED_LANGUAGES.includes(raw) ? raw : 'en';
};

const setStoredLanguage = (lang: SupportedLanguage) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
};

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
    try {
      i18n.changeLanguage(getStoredLanguage());
      const stored = getUser();
      if (stored) {
        setUser(stored);
        if (stored.languagePreference && SUPPORTED_LANGUAGES.includes(stored.languagePreference as SupportedLanguage)) {
          setStoredLanguage(stored.languagePreference as SupportedLanguage);
          i18n.changeLanguage(stored.languagePreference);
        }
      }
    } catch (e) {
      console.error('Failed to restore user session:', e);
    }
  }, []);

  const login = (u: Retailer) => {
    const storedLang = getStoredLanguage();
    const preferred = u.languagePreference ?? storedLang;
    const nextUser = { ...u, languagePreference: preferred };
    setUser(nextUser);
    saveUser(nextUser);
    if (SUPPORTED_LANGUAGES.includes(preferred as SupportedLanguage)) {
      setStoredLanguage(preferred as SupportedLanguage);
      i18n.changeLanguage(preferred);
    }
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
