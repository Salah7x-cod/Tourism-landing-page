import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySelector from './CurrencySelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const { t } = useLanguage();

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.destination'), path: '/explore' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.blog'), path: '/blog' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
      <div className="max-w-4xl mx-auto rounded-xl border border-white/20 bg-[#0f1a2c]/35 backdrop-blur-md shadow-lg shadow-black/10 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out supports-[backdrop-filter]:bg-[#0f1a2c]/25 overflow-hidden ring-1 ring-[#013220]/25">
        <div className="flex justify-between h-14 sm:h-[3.75rem] items-center px-3 sm:px-4">
          <div className="flex-shrink-0 flex items-center min-w-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group text-white">
              <Compass className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-white group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-bold text-base sm:text-lg tracking-tight uppercase truncate drop-shadow-md">
                <span className="text-[#013220]">Ethio</span><span className="text-white/90">Explore</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <div className="flex items-center space-x-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-xs font-bold transition-all px-2 py-1 ${
                    isActive(link.path)
                      ? 'text-[#c8e6d5]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c8e6d5] rounded-full shadow-[0_0_8px_rgba(200,230,213,0.8)]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Language + Currency selectors */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/20">
              <LanguageSwitcher />
              <CurrencySelector />
            </div>

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
                        Blogs
                      </Link>
                    </>
                  )}
                  <button onClick={logout} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-[#013220] border-2 border-white">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#013220] transition-colors ${
                      isActive('/login') ? 'bg-white text-[#013220] border-white' : ''
                    }`}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-[#013220] text-white border-2 border-[#013220] hover:bg-white hover:text-[#013220] transition-colors ${
                      isActive('/signup') ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
                    }`}
                  >
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

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
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile language + currency */}
              <div className="flex items-center gap-3 px-3 py-3">
                <LanguageSwitcher />
                <CurrencySelector />
              </div>

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-white/10">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full border-2 border-white text-white font-semibold">
                      {t('nav.dashboard')}
                    </Link>
                    {user?.is_admin && (
                      <Link to="/admin/blogs" onClick={() => setIsOpen(false)} className="block text-center px-3 py-3 rounded-full bg-emerald-700 text-white border-2 border-emerald-700 font-semibold">
                        Blog Review
                      </Link>
                    )}
                    <button onClick={() => { logout(); setIsOpen(false); }} className="block text-center px-3 py-3 rounded-full bg-white text-[#013220] border-2 border-white font-semibold">
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-center px-3 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-[#013220]"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block text-center px-3 py-3 rounded-full bg-[#013220] text-white border-2 border-[#013220] font-semibold hover:bg-white hover:text-[#013220]"
                    >
                      {t('nav.signup')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
