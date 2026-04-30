import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-xs px-1.5 py-1 rounded-md transition-all duration-200 font-semibold ${
            language === lang.code
              ? "bg-white/20 text-white shadow-inner"
              : "text-white/50 hover:text-white/80 hover:bg-white/10"
          }`}
          title={lang.label}
        >
          <span className="mr-0.5">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
