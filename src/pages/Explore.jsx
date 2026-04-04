import { useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import { destinations, categories } from '../data/destinations';
import { Search } from 'lucide-react';

export default function Explore() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = filter === "All" || dest.category === filter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-background min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Explore Destinations</h1>
          <p className="text-muted-foreground text-lg">Find your next great adventure in Ethiopia</p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-card p-4 rounded-lg border border-border shadow-sm">
          
          {/* Category Filters */}
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

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search destination..."
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
            <h3 className="text-xl text-foreground font-semibold">No destinations found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {setFilter("All"); setSearchQuery("");}}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
