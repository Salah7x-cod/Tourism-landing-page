import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mountain, Map, Compass } from 'lucide-react';
import { heroSlides } from '../data/destinations';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#0f1a2c] h-screen min-h-[700px] overflow-hidden flex flex-col justify-end pb-12 sm:pb-24">
      
      {/* Slideshow Background */}
      {heroSlides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${index === currentSlide ? 'opacity-70 z-0' : 'opacity-0 z-0'}`}
        >
          <img
            src={slide}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay to bridge image & content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2c] via-[#0f1a2c]/40 to-transparent"></div>
        </div>
      ))}

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          {/* Left Column */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8">
              Uncover the World's<br /> Natural Wonders.
            </h2>
            
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-full text-[#0f1a2c] bg-white hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
            >
              Start Exploring
            </Link>

            <div className="flex items-center gap-6 mt-12 sm:mt-16">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white"><Camera size={18} /></div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white"><Mountain size={18} /></div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white"><Map size={18} /></div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white"><Compass size={18} /></div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">300+ Iconic</p>
                <p className="text-white/70 text-sm">Spots Included</p>
              </div>
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <p className="text-white/80 text-base leading-relaxed hidden lg:block">
              Discover nature's finest places, breathtaking landscapes, untouched beauty, and nature at its purest. 
              Journey to the Land of Origins and unearth endless scenic beauty.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
