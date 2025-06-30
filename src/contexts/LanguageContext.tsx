'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Import translations
const translations = {
  en: require('../locales/en/common.json'),
  ar: require('../locales/ar/common.json'),
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Update direction based on language
    const newDirection = lang === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    
    // Update document direction and language
    if (typeof document !== 'undefined') {
      document.documentElement.dir = newDirection;
      document.documentElement.lang = lang;
    }
    
    // Store preference in localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
      localStorage.setItem('direction', newDirection);
    }
  };

  const t = (key: string, options?: any) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      return key; // Return key if translation not found
    }
    
    // Handle interpolation
    if (options) {
      return value.replace(/\{\{(\w+)\}\}/g, (match: string, key: string) => {
        return options[key] || match;
      });
    }
    
    return value;
  };

  useEffect(() => {
    // Load saved language preference
    if (typeof localStorage !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      
      if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
        const newDirection = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        setDirection(newDirection);
        
        if (typeof document !== 'undefined') {
          document.documentElement.dir = newDirection;
          document.documentElement.lang = savedLanguage;
        }
      } else {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        const defaultLang = browserLang.startsWith('ar') ? 'ar' : 'en';
        setLanguage(defaultLang);
      }
    }
  }, []);

  const value: LanguageContextType = {
    language,
    direction,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}