import Hero from '../components/Hero';
import { destinations } from '../data/destinations';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div>
      <Hero />
      <section className="py-24 bg-white relative">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <span className="text-gray-500 font-medium text-sm mb-4 inline-block">Our Destination</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight">
                Your Journey to the Perfect Destination Begins Here
              </h2>
            </div>
            
            <div className="mt-8 md:mt-0">
               <Link to="/explore" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-[#0f172a] font-semibold hover:border-gray-900 transition-colors">
                 See All Destination
                 <span className="flex items-center justify-center p-1 rounded-full bg-[#0f172a] text-white">
                   <ArrowUpRight className="w-4 h-4" />
                 </span>
               </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((dest) => (
              <Link to={`/explore/${dest.id}`} key={dest.id} className="group relative h-[450px] w-full rounded-3xl overflow-hidden cursor-pointer block">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Top Right Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#0f172a] shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                {/* Bottom Overlay gradient & Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1 shadow-sm">
                    {dest.name}
                  </h3>
                  <p className="text-white/80 font-medium text-sm shadow-sm">
                    {dest.price || "$55"} <span className="font-normal text-white/60">/ per person</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-4">
             <button aria-label="Previous" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </button>
             <button aria-label="Next" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
             </button>
          </div>

        </div>
      </section>

      {/* Remove or keep the second section 'What Travelers Say' from original as it wasn't specified. Keeping for completeness but removing since not requested or needed for exact visual match. */}
    </div>
  );
}
