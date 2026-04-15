import { Link } from 'react-router-dom';

/** Paths must match `public/assets/...` exactly; encodeURI keeps commas as `,` (Windows/Vite can 404 if comma is `%2C`). */
const asset = (pathUnderAssets) => encodeURI(`/assets/${pathUnderAssets}`);

const highlights = [
  {
    image: asset('Lailabila/download (43).jpg'),
    caption: 'Lalibela — rock churches',
  },
  {
    image: asset('Simin moountain/Simien Mountains National Park, Ethiopia.jpg'),
    caption: 'Simien — highland peaks',
  },
  {
    image: asset('Danakil Depression/Danakil Depression, Ethiopia.jpg'),
    caption: 'Danakil — salt & volcanoes',
  },
  {
    image: asset('Harar/Harar Jegol.jpg'),
    caption: 'Harar — walled old city',
  },
  {
    image: asset('Axum/Kingdom of Aksum (1).jpg'),
    caption: 'Axum — ancient stelae',
  },
];

/**
 * Compact centered glass rail; width/height hug the thumbnail row.
 */
export default function GlassPlaceStrip({ className = '' }) {
  return (
    <div
      className={`w-fit max-w-[min(100%,calc(100vw-1.5rem))] mx-auto rounded-2xl border-2 border-white/30 bg-white/15 backdrop-blur-md shadow-lg shadow-black/15 py-2.5 px-2.5 sm:py-3 sm:px-3 overflow-x-auto [scrollbar-width:thin] ring-1 ring-[#013220]/20 ${className}`}
    >
      <div className="flex w-max max-w-full gap-2 sm:gap-2.5 mx-auto">
        {highlights.map((item) => (
          <Link
            key={item.caption}
            to="/explore"
            className="group shrink-0 w-[76px] sm:w-[88px] md:w-[96px] rounded-xl overflow-hidden border border-white/15 bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <div className="relative aspect-[3/4] w-full">
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 px-1.5 pb-1.5 pt-4 text-[9px] sm:text-[10px] leading-snug text-white/95 font-medium line-clamp-3 text-center">
                {item.caption}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
