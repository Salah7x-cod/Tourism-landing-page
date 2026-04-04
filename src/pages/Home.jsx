import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div>
      <Hero />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Featured Destinations</h2>
            <p className="mt-4 text-muted-foreground">Discover some of the most iconic places in Ethiopia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-card hover:border-primary/50 transition-colors"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">What Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg border border-border">
              <p className="italic text-muted-foreground mb-4">"The rock churches of Lalibela look like they were carved by angels. An unforgettable experience."</p>
              <span className="font-semibold text-primary">- Sarah J.</span>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <p className="italic text-muted-foreground mb-4">"Hiking the Simien Mountains was the highlight of my trip! The scenery is just mind-blowing."</p>
              <span className="font-semibold text-primary">- Mike T.</span>
            </div>
            <div className="p-6 bg-background rounded-lg border border-border">
              <p className="italic text-muted-foreground mb-4">"The vibrant culture and coffee of Addis Ababa made us fall in love with Ethiopia instantly."</p>
              <span className="font-semibold text-primary">- Elena R.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
