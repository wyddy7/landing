import { siteContent, translations, type Language } from "@/generated/site-content";

export { siteContent, translations };
export type { Language };
export type TranslationKey = keyof typeof translations.en;
