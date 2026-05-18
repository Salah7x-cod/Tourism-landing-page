import { useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import TravelPlansSection from '../components/TravelPlansSection';
import { categories } from '../data/destinations';
import { Search, Loader2 } from 'lucide-react';
import { useDestinations } from '../hooks/useDestinations';
import { useLanguage } from '../context/LanguageContext';

export default function Explore() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { destinations, loading, error } = useDestinations();
  const { t } = useLanguage();

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = filter === "All" || dest.category === filter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-background min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">
            <span className="text-white">{t('explore.title').split(' ')[0]} </span>
            <span className="text-[#e8f5e9]">{t('explore.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-white/75 text-lg">{t('explore.subtitle')}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-card p-4 rounded-lg border border-[#013220]/25 shadow-sm ring-1 ring-white/5">

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder={t('explore.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>

        {/* Results */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg border border-border">
            <h3 className="text-xl text-foreground font-semibold">{t('explore.noResults')}</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setFilter("All"); setSearchQuery(""); }}
              className="mt-4 text-[#c8e6d5] font-medium hover:text-white hover:underline"
            >
              {t('explore.clearFilters')}
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 text-white/70">
            <Loader2 className="w-12 h-12 animate-spin text-[#c8e6d5] mb-4" />
            <p className="text-lg font-medium">{t('explore.loading')}</p>
          </div>
        )}
      </div>

      <TravelPlansSection />
    </div>
  );
}
