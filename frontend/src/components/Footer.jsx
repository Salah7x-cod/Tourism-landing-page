import { Link } from 'react-router-dom';
import { Compass, Twitter, Linkedin, Youtube, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const sections = [
    {
      title: t('footer.explore'),
      links: [
        { label: t('footer.home'),         href: '/' },
        { label: t('footer.destinations'), href: '/explore' },
        { label: t('footer.about'),        href: '/about' },
        { label: t('footer.blog'),         href: '/blog' },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { label: t('footer.culturalTours'),  href: '/explore' },
        { label: t('footer.trekking'),       href: '/explore' },
        { label: t('footer.photography'),    href: '/explore' },
        { label: t('footer.festivals'),      href: '/explore' },
        { label: t('footer.wildlife'),       href: '/explore' },
        { label: t('footer.historicRoutes'), href: '/explore' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.careers'),   href: '#' },
        { label: t('footer.community'), href: '/blog' },
        { label: t('footer.press'),     href: '#' },
        { label: t('footer.brand'),     href: '#' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.terms'),   href: '#' },
        { label: t('footer.privacy'), href: '#' },
        { label: t('footer.cookies'), href: '#' },
        { label: t('footer.security'),href: '#' },
      ],
    },
  ];

  const socials = [
    { icon: Twitter,   href: '#', label: 'X / Twitter' },
    { icon: Linkedin,  href: '#', label: 'LinkedIn' },
    { icon: Youtube,   href: '#', label: 'YouTube' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook,  href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-[#070e1a] border-t border-white/8 mt-0">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#013220]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-14">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <Compass className="h-7 w-7 text-[#c8e6d5] group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-bold text-xl tracking-tight uppercase">
                <span className="text-[#c8e6d5]">Ethio</span>
                <span className="text-white/90">Explore</span>
              </span>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-6">
              {t('footer.tagline')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/12 hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white/80 font-semibold text-sm mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link
                        to={href}
                        className="text-white/40 text-sm hover:text-white/80 transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="text-white/40 text-sm hover:text-white/80 transition-colors duration-150"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-white/30 text-xs">
            © {year} EthioExplore. {t('footer.rights')}
          </p>

          {/* Cert Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-white/50 font-medium">{t('footer.certified')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
