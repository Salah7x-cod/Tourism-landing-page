import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Compass, Image, CloudSun, Thermometer, Droplets, MessageSquare, Edit3, Trash2, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { destinations as fallbackDestinations } from '../data/destinations';

// ── Season helper ───────────────────────────────────────────────────
function getSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 10 || month <= 2) return { label: "☀️ Dry Season (Bega)", desc: "Cool & sunny — ideal for trekking" };
  if (month >= 3 && month <= 5) return { label: "🌤️ Short Rains (Belg)", desc: "Light showers, green landscapes" };
  return { label: "🌧️ Rainy Season (Kiremt)", desc: "Heavy rains, lush highlands" };
}

export default function ExploreDetail() {
  const { id } = useParams();
  const locationId = parseInt(id, 10);
  const [destination, setDestination] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const { token, isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const { convert } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentVisual, setCurrentVisual] = useState(0);
  const visuals = destination ? [destination.image, destination.hero_image || destination.heroImage || destination.image] : [];

  // ── Weather state ──
  const [weather, setWeather] = useState(null);
  const season = getSeason();

  // ── Comments state ──
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentFeedback, setCommentFeedback] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    api
      .destination(locationId)
      .then(setDestination)
      .catch(() => {
        const fallback = fallbackDestinations.find((item) => item.id === locationId) || null;
        setDestination(fallback);
      });
  }, [locationId]);

  // Fetch comments
  useEffect(() => {
    api.listComments(locationId).then(setComments).catch(() => setComments([]));
  }, [locationId]);

  // Fetch weather
  useEffect(() => {
    if (!destination?.location) return;
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) return;

    const city = destination.location.split(',')[0].trim();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},ET&units=metric&appid=${apiKey}`)
      .then(r => r.json())
      .then(data => {
        if (data.main) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather?.[0]?.main || '',
            icon: data.weather?.[0]?.icon || '',
            humidity: data.main.humidity,
            description: data.weather?.[0]?.description || '',
            city: city,
          });
        }
      })
      .catch(() => {});
  }, [destination]);

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

  // ── Comment handlers ──
  const submitComment = async () => {
    if (!commentText.trim()) return;
    setCommentFeedback('');
    try {
      const newComment = await api.createComment(locationId, commentText, token);
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
    } catch (err) {
      setCommentFeedback(err.message);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const updated = await api.editComment(commentId, editText, token);
      setComments(prev => prev.map(c => c.id === commentId ? updated : c));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      setCommentFeedback(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId, token);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      setCommentFeedback(err.message);
    }
  };

  const priceDisplay = destination.price ? convert(destination.price) : convert(55);

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

          {/* ── Visitor Experiences (Comments) ── */}
          <div className="mt-16 pt-12 border-t border-border/50">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-8 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              {t("detail.visitorExperiences")}
            </h3>

            {/* Comment form */}
            {isAuthenticated ? (
              <div className="mb-8 space-y-3">
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t("detail.shareExperience")}
                  className="w-full rounded-xl border border-border bg-card p-4 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-base"
                />
                <button
                  onClick={submitComment}
                  disabled={!commentText.trim()}
                  className="px-6 py-2.5 bg-[#013220] text-white font-semibold rounded-full hover:bg-[#024a30] transition-colors shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t("detail.submitComment")}
                </button>
              </div>
            ) : (
              <div className="mb-8 p-5 rounded-xl bg-card border border-border text-center">
                <p className="text-muted-foreground">{t("detail.loginToComment")}</p>
                <Link to="/login" state={{ from: location.pathname }} className="inline-block mt-2 text-primary font-semibold hover:underline">
                  Login →
                </Link>
              </div>
            )}

            {/* Comment feedback */}
            {commentFeedback && (
              <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{commentFeedback}</span>
              </div>
            )}

            {/* Comment list */}
            {comments.length === 0 ? (
              <p className="text-muted-foreground/60 italic text-center py-8">
                {t("detail.noComments")}
              </p>
            ) : (
              <div className="space-y-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                          {(comment.user?.full_name || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-foreground text-sm">{comment.user?.full_name || "User"}</span>
                          <span className="text-muted-foreground text-xs ml-2">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {user && comment.user?.id === user.id && editingId !== comment.id && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { setEditingId(comment.id); setEditText(comment.content); }}
                            className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                            title={t("detail.editComment")}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                            title={t("detail.deleteComment")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {editingId === comment.id ? (
                      <div className="mt-2 space-y-2">
                        <textarea
                          rows={2}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background p-3 text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditComment(comment.id)}
                            className="px-4 py-1.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary/80"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setEditText(''); }}
                            className="px-4 py-1.5 border border-border text-foreground text-xs font-semibold rounded-full hover:bg-white/5"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed text-sm mt-1">{comment.content}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4 font-serif">{t("detail.quickFacts")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">{t("detail.location")}</span>
                  <span className="text-sm text-muted-foreground">{destination.location || 'Ethiopian Highlands'}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Compass className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">{t("detail.bestTime")}</span>
                  <span className="text-sm text-muted-foreground">{destination.best_time || 'October to February'}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Image className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">{t("detail.highlights")}</span>
                  <span className="text-sm text-muted-foreground">{destination.highlights || 'Stunning vistas, rich heritage'}</span>
                </div>
              </li>

              {/* Season display */}
              <li className="flex items-start gap-3">
                <CloudSun className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                <div>
                  <span className="block font-semibold text-foreground">{t("detail.season")}</span>
                  <span className="text-sm text-muted-foreground">{season.label}</span>
                  <span className="block text-xs text-muted-foreground/70 mt-0.5">{season.desc}</span>
                </div>
              </li>

              {/* Live weather */}
              {weather && (
                <li className="flex items-start gap-3">
                  <Thermometer className="text-[#c8e6d5] w-5 h-5 mt-0.5" />
                  <div>
                    <span className="block font-semibold text-foreground">{t("detail.weather")}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {weather.icon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                          alt={weather.condition}
                          className="w-8 h-8 -ml-1"
                        />
                      )}
                      <span className="text-sm text-muted-foreground font-medium">{weather.temp}°C</span>
                      <span className="text-xs text-muted-foreground capitalize">{weather.description}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground/70">
                      <Droplets className="w-3 h-3" />
                      <span>{weather.humidity}% humidity</span>
                    </div>
                    <p className="text-xs text-primary/80 mt-1 italic">
                      Currently {weather.temp}°C and {weather.description} in {weather.city}
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Price display */}
          {destination.price && (
            <div className="p-4 bg-card border border-border rounded-xl shadow-lg text-center">
              <span className="text-2xl font-bold text-foreground">{priceDisplay}</span>
              <span className="text-sm text-muted-foreground ml-1">/ per person</span>
            </div>
          )}

          <div className="p-6 bg-card border border-border rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4 font-serif">{t("detail.bookTrip")}</h3>
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
                  {travelers} {travelers === 1 ? t("detail.traveler") : t("detail.travelers")}
                </div>
                <button type="button" onClick={() => setTravelers(Math.min(20, travelers + 1))} className="w-12 py-3 bg-secondary hover:bg-primary hover:text-white transition-colors font-bold text-lg">+</button>
              </div>

              <button className="w-full py-3.5 mt-2 bg-[#013220] hover:bg-white text-white hover:text-[#013220] active:scale-95 font-bold rounded-full border-2 border-[#013220] shadow-md hover:shadow-xl transition-all duration-300">
                 {t("detail.confirmBooking")}
              </button>
            </form>
            <button onClick={saveFavorite} className="w-full mt-4 py-3 rounded-full border-2 border-white/60 hover:bg-white/10 transition-colors text-white font-semibold">
              {t("detail.saveFavorites")}
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
                <span className="text-white font-bold tracking-widest uppercase bg-black/40 px-4 py-2 rounded shadow-xl backdrop-blur-sm">{t("detail.gallery")}</span>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
