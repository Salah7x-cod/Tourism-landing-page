import { createContext, useContext, useEffect, useMemo, useState } from "react";

import en from "../i18n/en.json";
import am from "../i18n/am.json";
import fr from "../i18n/fr.json";

const LanguageContext = createContext(null);

const TRANSLATIONS = { en, am, fr };
const LANG_KEY = "tourism_language";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "am", label: "አማርኛ",  short: "AM", flag: "🇪🇹" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
];

/** Currencies available per language (first = default) */
export const LANG_CURRENCY_MAP = {
  en: ["USD", "GBP"],
  fr: ["EUR", "USD"],
  am: ["ETB", "USD"],
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(
    () => localStorage.getItem(LANG_KEY) || "en"
  );

  const setLanguage = (lang) => {
    setLanguageState(lang);
    // Emit a custom event so CurrencyContext can react
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
  };

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const strings = TRANSLATIONS[language] || en;
    const t = (key) => strings[key] ?? en[key] ?? key;
    return {
      language,
      setLanguage,
      t,
      languages: LANGUAGES,
      currenciesForLang: LANG_CURRENCY_MAP[language] || ["USD"],
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
