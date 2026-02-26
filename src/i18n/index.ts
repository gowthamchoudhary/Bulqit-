import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';

export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'ml' | 'kn';
export const LANGUAGE_STORAGE_KEY = 'bulqit_language';

const SUPPORTED: SupportedLanguage[] = ['en', 'hi', 'te', 'ta', 'ml', 'kn'];

export function getStoredLanguage(): SupportedLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return SUPPORTED.includes(stored as SupportedLanguage) ? (stored as SupportedLanguage) : 'en';
}

export function setStoredLanguage(lang: SupportedLanguage) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, hi: { translation: hi },
                 te: { translation: te }, ta: { translation: ta },
                 kn: { translation: kn }, ml: { translation: ml } },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
  });

export default i18n;
