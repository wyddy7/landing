import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import type { Language } from "@/lib/i18n";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export const LanguageSelector = () => {
  const { lang, changeLanguage } = useI18n();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
          "bg-[#050505] backdrop-blur-md shadow-sm",
          "border-[#1F1F1F] hover:border-[#CCFF00]/50 transition-all",
          "text-[#A1A1AA] hover:text-white",
          "font-mono"
        )}
      >
        <span className="text-xs">{selected.flag}</span>
        <span className="hidden sm:inline">{selected.label}</span>
        <span className="sm:hidden">{selected.code.toUpperCase()}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-32 rounded-xl overflow-hidden z-[100]",
            "bg-[#050505] backdrop-blur-xl",
            "shadow-2xl border border-[#1F1F1F]",
            "animate-fade-in"
          )}
        >
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                changeLanguage(l.code);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors font-mono",
                lang === l.code
                  ? "bg-[#CCFF00]/10 text-[#CCFF00]"
                  : "text-[#A1A1AA] hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="text-xs">{l.flag}</span>
              <span className="flex-1">{l.label}</span>
              {lang === l.code && (
                <Check className="h-3 w-3 text-[#CCFF00]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
