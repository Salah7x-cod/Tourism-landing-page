import { MapPin } from 'lucide-react';

export default function DestinationCard({ destination }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-md hover:shadow-lg hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded border border-border text-foreground">
          {destination.category}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
          {destination.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
          {destination.description}
        </p>
        <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 w-fit group-hover:translate-x-1 transition-transform">
          <MapPin className="h-4 w-4" /> Discover More
        </button>
      </div>
    </div>
  );
}
