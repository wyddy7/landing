import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@/lib/i18n";

const STORAGE_KEY = "preferred_language";

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
    
    // Детекция по языку браузера
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    return browserLang === 'ru' ? 'ru' : 'en';
  });

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, t, changeLanguage, isLoaded: true }}>
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
