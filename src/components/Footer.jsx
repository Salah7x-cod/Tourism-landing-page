import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-foreground tracking-tight uppercase">Ethio<span className="text-primary">Explore</span></span>
        </div>
        <p className="text-muted-foreground text-sm text-center md:text-left">
          © {new Date().getFullYear()} EthioExplore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
