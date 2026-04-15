import { Link } from 'react-router-dom';
import { Camera, Mountain, Map, Compass } from 'lucide-react';
import GlassPlaceStrip from './GlassPlaceStrip';

/** User hero asset (public folder); filename includes a trailing space before .png */
const heroImage = '/assets/Tourism%20hero%20page%20.png';

export default function Hero() {
  return (
    <div className="relative bg-[#0f1a2c] h-screen min-h-[700px] overflow-hidden flex flex-col justify-end pb-6 sm:pb-8">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ethiopian highlands and wildlife"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mt-auto pb-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
          <div className="flex-1 max-w-xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">
              Explore{' '}
              <span className="text-[#e8f5e9]">Ethiopia</span>
              <span className="text-white">.</span>
            </h1>

            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold rounded-full bg-[#013220] text-white border-2 border-white shadow-lg hover:bg-white hover:text-[#013220] hover:border-[#013220] hover:scale-[1.02] transition-all"
            >
              Start Exploring
            </Link>

            <div className="flex items-center gap-6 mt-12 sm:mt-16">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#013220]/30 backdrop-blur flex items-center justify-center text-[#013220]">
                  <Camera size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#013220]/30 backdrop-blur flex items-center justify-center text-[#013220]">
                  <Mountain size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/90 border border-[#013220]/30 backdrop-blur flex items-center justify-center text-[#013220]">
                  <Map size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#013220] border-2 border-white flex items-center justify-center text-white">
                  <Compass size={18} />
                </div>
              </div>
              <div className="drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
                <p className="text-white font-semibold text-sm">300+ Iconic</p>
                <p className="text-white/70 text-sm">Spots Included</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <p className="text-white/90 text-base leading-relaxed hidden lg:block drop-shadow-[0_1px_16px_rgba(0,0,0,0.55)]">
              Discover nature&apos;s finest places, breathtaking landscapes, untouched beauty, and nature at its purest.
              Journey to the Land of Origins and unearth endless scenic beauty.
            </p>
          </div>
        </div>

        <GlassPlaceStrip className="mt-5 sm:mt-6" />
      </div>
    </div>
  );
}
