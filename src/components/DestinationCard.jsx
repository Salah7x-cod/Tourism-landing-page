import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  return (
    <Link to={`/explore/${destination.id}`} className="block h-full cursor-pointer focus:outline-none">
      <div className="bg-card rounded-lg overflow-hidden border border-border shadow-md hover:shadow-lg hover:border-primary transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2">
        <div className="relative h-56 overflow-hidden bg-secondary">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out"
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-border text-foreground tracking-wide uppercase">
            {destination.category}
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
              {destination.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
              {destination.description}
            </p>
          </div>
          <div className="text-primary font-medium text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform border-t border-border pt-4">
            <MapPin className="h-4 w-4" /> Explore the beauty
          </div>
        </div>
      </div>
    </Link>
  );
}
