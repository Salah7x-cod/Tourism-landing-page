import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const plans = [
  {
    title: 'Northern Historic Route',
    places: 'Lalibela & Axum',
    blurb: 'Rock-hewn churches, ancient stelae, and UNESCO heritage across the northern highlands.',
    cta: 'Login to Unlock',
    to: '/login',
    Icon: LogIn,
  },
  {
    title: 'Active Adventure',
    places: 'Danakil & Simien',
    blurb: 'Extreme landscapes, escarpment treks, and unforgettable volcanic frontiers.',
    cta: 'Signup to View Plans',
    to: '/signup',
    Icon: UserPlus,
  },
  {
    title: 'Cultural Deep Dive',
    places: 'Harar & Omo Valley',
    blurb: 'Walled cities, coffee culture, and living traditions from east to south.',
    cta: 'Login to Unlock',
    to: '/login',
    Icon: LogIn,
  },
];

export default function TravelPlansSection() {
  return (
    <section className="py-24 bg-[#0f1a2c] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#013220]/25 via-transparent to-white/[0.04] pointer-events-none" aria-hidden />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            <span className="text-white">Choose Your  </span>
            <span className="text-[#e8f5e9]">Travel Plan</span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Curated itineraries across Ethiopia. Sign in to see full pricing and booking options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const PlanIcon = plan.Icon;
            return (
            <div
              key={plan.title}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 flex flex-col shadow-xl shadow-black/20 transition-transform duration-300 hover:border-white/25 hover:bg-white/[0.14]"
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                Itinerary
              </p>
              <h3 className="font-serif text-2xl text-white mb-1">{plan.title}</h3>
              <p className="text-white/80 text-sm font-medium mb-4 italic">{plan.places}</p>
              <p className="text-white/65 text-sm leading-relaxed flex-grow mb-8">{plan.blurb}</p>

              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 mb-6">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">From</p>
                <p className="font-serif text-xl text-white/50 blur-[3px] select-none" aria-hidden>
                  ••••
                </p>
                <p className="text-white/45 text-xs mt-2">Unlock to view pricing & dates</p>
              </div>

              <Link
                to={plan.to}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full border-2 border-white bg-[#013220] text-white text-sm font-semibold hover:bg-white hover:text-[#013220] hover:border-[#013220] transition-all shadow-md"
              >
                <PlanIcon className="w-4 h-4 shrink-0 opacity-90" aria-hidden />
                {plan.cta}
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

