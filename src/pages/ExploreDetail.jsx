import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { destinations } from '../data/destinations';
import { ArrowLeft, MapPin, Compass, Image } from 'lucide-react';

export default function ExploreDetail() {
  const { id } = useParams();
  const locationId = parseInt(id, 10);
  const destination = destinations.find(d => d.id === locationId);

  const [currentVisual, setCurrentVisual] = useState(0);
  const visuals = destination ? [destination.image, destination.heroImage] : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVisual((prev) => (prev + 1) % visuals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visuals.length]);

  if (!destination) {
    return (
      <div className="py-20 text-center text-foreground flex-grow">
        <h2 className="text-2xl mb-4 font-serif">Destination Not Found</h2>
        <Link to="/explore" className="text-primary hover:underline">Return to Explore</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow bg-background">
      
      {/* Animated Header Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden group">
        <img 
          src={destination.heroImage || destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/explore" 
            className="flex items-center gap-2 px-4 py-2 bg-background/80 hover:bg-primary hover:text-background text-foreground backdrop-blur-md rounded-full shadow-lg border border-border transition-all font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 border border-primary text-primary text-xs font-bold uppercase tracking-widest rounded-full bg-background/50 backdrop-blur-md">
              {destination.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold drop-shadow-lg leading-tight">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto w-full px-6 py-16 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8 text-lg text-muted-foreground leading-relaxed prose prose-invert max-w-none">
          <p className="text-2xl text-foreground font-light italic border-l-4 border-primary pl-6 py-2">
            "{destination.description}"
          </p>
          <p>
            Immerse yourself fundamentally in the depths of what {destination.name} offers. Known historically and geographically as a cornerstone 
            within Ethiopia, it blends mesmerizing natural scenery with unparalleled heritage. Every vista and pathway reveals a new layer 
            of an ancient story that has captivated explorers for centuries. 
          </p>
          <p>
            Whether you seek the thrill of high altitude ascents, the silence of deeply carved valleys, or the spirituality of isolated 
            monoliths, {destination.name} is bound to forge memories that transcend typical travel. We highly recommend allocating ample time 
            to naturally adjust to its atmosphere and engage actively with local guides who carry its oral history.
          </p>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4 font-serif">Quick Facts</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">Location</span>
                  <span className="text-sm text-muted-foreground">Ethiopian Highlands</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Compass className="text-primary w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">Best Time</span>
                  <span className="text-sm text-muted-foreground">October tracking to February</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Image className="text-primary w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">Highlights</span>
                  <span className="text-sm text-muted-foreground">Stunning vistas, rich heritage</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-lg border border-border relative h-48">
             {visuals.map((vis, index) => (
                <img 
                  key={index}
                  src={vis} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVisual ? 'opacity-100' : 'opacity-0'}`} 
                  alt="Sidebar gallery visual" 
                />
             ))}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold tracking-widest uppercase bg-black/40 px-4 py-2 rounded shadow-xl backdrop-blur-sm">Gallery</span>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
