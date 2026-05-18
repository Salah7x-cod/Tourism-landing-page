import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Globe, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const { language, setLanguage, t, languages, currenciesForLang } = useLanguage();
  const { currency, setCurrency, currencies } = useCurrency();
  const dropdownRef = useRef(null);

  const links = [
    { name: t('nav.home'),        path: '/' },
    { name: t('nav.destination'), path: '/explore' },
    { name: t('nav.about'),       path: '/about' },
    { name: t('nav.blog'),        path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
      <div className="max-w-4xl mx-auto rounded-xl border border-white/20 bg-[#0f1a2c]/35 backdrop-blur-md shadow-lg shadow-black/10 transition-all duration-300 supports-[backdrop-filter]:bg-[#0f1a2c]/25 ring-1 ring-[#013220]/25">
        <div className="flex justify-between h-14 sm:h-[3.75rem] items-center px-3 sm:px-4">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center min-w-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group text-white">
              <Compass className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-white group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-bold text-base sm:text-lg tracking-tight uppercase truncate drop-shadow-md">
                <span className="text-[#013220]">Ethio</span><span className="text-white/90">Explore</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links — glass pill active indicator */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <div className="relative flex items-center bg-white/5 rounded-full px-1 py-1 gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative z-10 text-xs font-bold transition-all px-3 py-1.5 rounded-full ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {/* Glass pill behind active link */}
                  {isActive(link.path) && (
                    <span
                      className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 shadow-inner"
                      style={{ animation: 'glassPillIn 0.25s ease' }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Globe Language + Currency Dropdown */}
            <div className="relative pl-2 border-l border-white/20" ref={dropdownRef}>
              <button
                id="globe-lang-btn"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/10 group"
                aria-expanded={langOpen}
                aria-label="Language and Currency"
              >
                <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xs font-semibold">{currentLang.flag} {currentLang.short}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Panel */}
              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/20 bg-[#0a1628]/90 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                  style={{ animation: 'dropIn 0.2s ease' }}
                >
                  {/* Language Section */}
                  <div className="px-4 pt-4 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{t('nav.language')}</p>
                    <div className="flex flex-col gap-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setLanguage(lang.code); }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            language === lang.code
                              ? 'bg-white/15 text-white border border-white/25'
                              : 'text-white/60 hover:bg-white/8 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.label}</span>
                          </span>
                          {language === lang.code && (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-4 border-t border-white/10 my-2" />

                  {/* Currency Section */}
                  <div className="px-4 pb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{t('nav.currency')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {currencies.map((c) => {
                        const isSuggested = currenciesForLang.includes(c);
                        return (
                          <button
                            key={c}
                            onClick={() => setCurrency(c)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                              currency === c
                                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                                : isSuggested
                                ? 'bg-white/12 text-white/80 border border-white/20 hover:bg-white/20'
                                : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white/60'
                            }`}
                          >
                            {c}
                            {isSuggested && currency !== c && (
                              <span className="ml-1 text-[8px] text-emerald-400/70">★</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[9px] text-white/25 mt-2">★ Recommended for {currentLang.label}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/20">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#013220] transition-colors">
                    {t('nav.dashboard')}
                  </Link>
                  {user?.is_admin && (
                    <>
                      <Link to="/admin/destinations" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#013220] text-white border-2 border-[#013220]">
                        {t('nav.admin')}
                      </Link>
                      <Link to="/admin/blogs" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-700 text-white border-2 border-emerald-700 hover:bg-emerald-800 transition-colors">
                        {t('nav.adminBlogs')}
                      </Link>
                    </>
                  )}
                  <button onClick={logout} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-[#013220] border-2 border-white">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#013220] transition-colors ${isActive('/login') ? 'bg-white text-[#013220]' : ''}`}>
                    {t('nav.login')}
                  </Link>
                  <Link to="/signup" className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-[#013220] text-white border-2 border-[#013220] hover:bg-white hover:text-[#013220] transition-colors ${isActive('/signup') ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}>
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile globe button */}
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="p-1.5 rounded-md text-white/70 hover:text-white"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Language Dropdown (inside navbar) */}
        {langOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0a1628]/60 px-4 py-4" ref={dropdownRef}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{t('nav.language')}</p>
            <div className="flex gap-2 mb-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-bold transition-all ${
                    language === lang.code
                      ? 'bg-white/15 text-white border border-white/25'
                      : 'text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.short}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{t('nav.currency')}</p>
            <div className="flex flex-wrap gap-1.5">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                    currency === c
                      ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                      : 'text-white/50 border-white/15 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Nav Links */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0f1a2c]/20">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full border-2 border-white text-white font-semibold">
                      {t('nav.dashboard')}
                    </Link>
                    {user?.is_admin && (
                      <>
                        <Link to="/admin/destinations" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full bg-[#013220] text-white border-2 border-[#013220] font-semibold">
                          {t('nav.admin')}
                        </Link>
                        <Link to="/admin/blogs" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full bg-emerald-700 text-white border-2 border-emerald-700 font-semibold">
                          {t('nav.adminBlogs')}
                        </Link>
                      </>
                    )}
                    <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-center px-3 py-3 rounded-full bg-white text-[#013220] border-2 border-white font-semibold">
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-[#013220]">
                      {t('nav.login')}
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full bg-[#013220] text-white border-2 border-[#013220] font-semibold hover:bg-white hover:text-[#013220]">
                      {t('nav.signup')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes glassPillIn {
          from { opacity: 0; transform: scaleX(0.7); }
          to   { opacity: 1; transform: scaleX(1); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
