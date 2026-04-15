import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#013220] border-t-4 border-white/90 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-white" />
          <span className="font-bold text-lg text-white tracking-tight uppercase">
            Ethio<span className="text-[#e8f5e9]">Explore</span>
          </span>
        </div>
        <p className="text-white/85 text-sm text-center md:text-left">
          © {new Date().getFullYear()} EthioExplore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
