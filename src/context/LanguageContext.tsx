"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { LOCALIZATION } from "@/data/localization";
import { Locale } from "@/types";

interface LanguageContextType {
  currentLang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setLangState] = useState<Locale>("id");

  const setLang = (lang: Locale) => {
    setLangState(lang);
  };

  const t = (key: string): string => {
    const translations = LOCALIZATION[currentLang] as Record<string, string>;
    if (translations && key in translations) {
      return translations[key];
    }
    // Fallback to English if translation is missing in the current language
    const fallbackTranslations = LOCALIZATION.en as Record<string, string>;
    if (fallbackTranslations && key in fallbackTranslations) {
      return fallbackTranslations[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
