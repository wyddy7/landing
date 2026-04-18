import { createContext } from "react";
import { translations, type Language } from "@/lib/i18n";

export const STORAGE_KEY = "preferred_language";
type Translation = (typeof translations)[Language];

export interface I18nContextType {
  lang: Language;
  t: Translation;
  changeLanguage: (newLang: Language) => void;
  isLoaded: boolean;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);
