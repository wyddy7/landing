import { useState, type ReactNode } from "react";
import { translations, siteContent, type Language } from "@/lib/i18n";
import { I18nContext, STORAGE_KEY } from "@/hooks/i18n-context";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "en" || saved === "ru") {
      return saved as Language;
    }

    const defaultLang = siteContent.site.defaultLanguage;
    return (defaultLang === "en" || defaultLang === "ru") ? defaultLang as Language : "en";
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
