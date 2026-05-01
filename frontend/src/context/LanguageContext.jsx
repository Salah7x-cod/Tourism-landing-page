import { createContext, useContext, useEffect, useMemo, useState } from "react";

import en from "../i18n/en.json";
import am from "../i18n/am.json";
import fr from "../i18n/fr.json";

const LanguageContext = createContext(null);

const TRANSLATIONS = { en, am, fr };
const LANG_KEY = "tourism_language";

export const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "am", label: "AM", flag: "🇪🇹" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem(LANG_KEY) || "en");

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const strings = TRANSLATIONS[language] || en;
    const t = (key) => strings[key] ?? en[key] ?? key;
    return { language, setLanguage, t, languages: LANGUAGES };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
