import { Users, Target, Globe, Shield, HeartHandshake, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const missionValues = [
    { icon: Globe,         titleKey: 'about.val1Title', descKey: 'about.val1Desc' },
    { icon: HeartHandshake, titleKey: 'about.val2Title', descKey: 'about.val2Desc' },
    { icon: Shield,        titleKey: 'about.val3Title', descKey: 'about.val3Desc' },
    { icon: Zap,           titleKey: 'about.val4Title', descKey: 'about.val4Desc' },
  ];

  return (
    <div className="flex-grow flex flex-col bg-background">

      {/* Header */}
      <div className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-br from-[#013220]/5 via-background to-[#013220]/10 border-b border-border shadow-inner">
        <div className="absolute inset-0 opacity-20 pattern-dots" />
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Globe className="w-64 h-64 text-[#013220]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground uppercase tracking-widest drop-shadow-sm">
            {t('about.heading')}
          </h1>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mt-6 mb-8 opacity-80" />
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            {t('about.tagline')}
          </p>
        </div>
      </div>

      {/* Mission + Values */}
      <div className="py-20 md:py-28 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8 text-lg text-muted-foreground">
            <h2 className="text-3xl font-serif text-foreground flex items-center gap-4">
              <Target className="text-primary w-8 h-8" />
              {t('about.missionTitle')}
            </h2>
            <p className="leading-relaxed">{t('about.missionP1')}</p>
            <p className="leading-relaxed">{t('about.missionP2')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {missionValues.map((val, idx) => (
              <div key={idx} className="bg-card p-6 rounded-2xl border border-border shadow-lg hover:border-primary/40 transition-colors group">
                <div className="w-12 h-12 bg-background rounded-full border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <val.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{t(val.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(val.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team CTA */}
      <div className="bg-card py-24 border-t border-border">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-serif text-foreground mb-6">{t('about.teamTitle')}</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
            {t('about.teamDesc')}
          </p>
          <a
            href="mailto:admin@ethioexplore.com"
            className="w-full sm:w-auto inline-block text-center px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 hover:bg-primary/90 hover:shadow-2xl transition-all shadow-xl border-2 border-white/90"
          >
            {t('about.contactTeam')}
          </a>
        </div>
      </div>

    </div>
  );
}
