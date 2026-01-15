import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "@/lib/i18n";

const STORAGE_KEY = "preferred_language";
const SNG_COUNTRIES = ["RU", "BY", "KZ", "AM", "AZ", "KG", "MD", "TJ", "UZ"];

interface I18nContextType {
  lang: Language;
  t: typeof translations.en;
  changeLanguage: (newLang: Language) => void;
  isLoaded: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") return saved as Language;
    return "en";
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function detectLanguage() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setIsLoaded(true);
        return;
      }

      try {
        const response = await fetch("https://api.country.is");
        const data = await response.json();
        const country = data.country;

        if (SNG_COUNTRIES.includes(country)) {
          setLang("ru");
        } else {
          setLang("en");
        }
      } catch (error) {
        console.error("Failed to detect country:", error);
        setLang("en");
      } finally {
        setIsLoaded(true);
      }
    }

    detectLanguage();
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, t, changeLanguage, isLoaded }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
