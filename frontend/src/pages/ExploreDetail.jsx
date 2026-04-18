import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Compass, Image } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { destinations as fallbackDestinations } from '../data/destinations';

export default function ExploreDetail() {
  const { id } = useParams();
  const locationId = parseInt(id, 10);
  const [destination, setDestination] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const { token, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentVisual, setCurrentVisual] = useState(0);
  const visuals = destination ? [destination.image, destination.hero_image || destination.heroImage || destination.image] : [];

  useEffect(() => {
    api
      .destination(locationId)
      .then(setDestination)
      .catch(() => {
        const fallback = fallbackDestinations.find((item) => item.id === locationId) || null;
        setDestination(fallback);
      });
  }, [locationId]);

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
        <Link to="/explore" className="text-[#c8e6d5] font-medium hover:text-white hover:underline">Return to Explore</Link>
      </div>
    );
  }

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      localStorage.setItem('pendingBooking', JSON.stringify({ destination_id: locationId, trip_date: tripDate, travelers: Number(travelers) }));
      setFeedback('You must login to confirm your booking. Your details are saved!');
      return;
    }
    try {
      await api.createBooking(
        { destination_id: locationId, trip_date: tripDate, travelers: Number(travelers) },
        token,
      );
      setFeedback('Booking confirmed successfully!');
      setTripDate('');
      setTravelers(1);
    } catch (err) {
      setFeedback(err.message);
    }
  };

  const saveFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    try {
      await api.addFavorite(locationId, token);
      setFeedback('Destination added to favorites.');
    } catch (err) {
      setFeedback(err.message);
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-background">
      
      {/* Animated Header Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden group">
        <img 
          src={destination.hero_image || destination.heroImage || destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/explore" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white/90 text-[#013220] hover:bg-white backdrop-blur-md rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all font-bold text-sm tracking-wide border border-[#013220]/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-3 py-1 mb-4 border-2 border-white/80 text-white text-xs font-bold uppercase tracking-widest rounded-full bg-[#013220]/85 backdrop-blur-md">
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
                <MapPin className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">Location</span>
                  <span className="text-sm text-muted-foreground">{destination.location || 'Ethiopian Highlands'}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Compass className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">Best Time</span>
                  <span className="text-sm text-muted-foreground">{destination.best_time || 'October to February'}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Image className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">Highlights</span>
                  <span className="text-sm text-muted-foreground">{destination.highlights || 'Stunning vistas, rich heritage'}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4 font-serif">Book This Trip</h3>
            <form onSubmit={submitBooking} className="space-y-4">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
              
              <div className="flex items-center w-full rounded-lg border border-border bg-background text-foreground overflow-hidden">
                <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-12 py-3 bg-secondary hover:bg-primary hover:text-white transition-colors font-bold text-lg">-</button>
                <div className="flex-1 text-center font-medium bg-transparent pointer-events-none">
                  {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}
                </div>
                <button type="button" onClick={() => setTravelers(Math.min(20, travelers + 1))} className="w-12 py-3 bg-secondary hover:bg-primary hover:text-white transition-colors font-bold text-lg">+</button>
              </div>

              <button className="w-full py-3.5 mt-2 bg-[#013220] hover:bg-white text-white hover:text-[#013220] active:scale-95 font-bold rounded-full border-2 border-[#013220] shadow-md hover:shadow-xl transition-all duration-300">
                 Confirm Booking
              </button>
            </form>
            <button onClick={saveFavorite} className="w-full mt-4 py-3 rounded-full border-2 border-white/60 hover:bg-white/10 transition-colors text-white font-semibold">
              Save to Favorites
            </button>
            {feedback && (
              <div className="mt-4 p-3 rounded bg-[#c8e6d5]/20 border border-[#c8e6d5]/40 text-center animate-fade-in shadow-sm">
                 <p className="text-sm text-primary font-medium">{feedback}</p>
                 {feedback.includes('login') && (
                    <Link to="/login" className="inline-block mt-2 font-bold text-white hover:text-[#c8e6d5] underline decoration-2 underline-offset-4">Sign in now</Link>
                 )}
              </div>
            )}
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
