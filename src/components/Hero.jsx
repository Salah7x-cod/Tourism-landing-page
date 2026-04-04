import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-background overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl group">
                <span className="block xl:inline">Discover the Land of</span>{' '}
                <span className="block text-primary">Origins</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Explore Ethiopia’s breathtaking landscapes, ancient history, and vibrant culture. A true adventure awaits.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/explore"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 md:py-4 md:text-lg transition-colors"
                  >
                    Start Exploring
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-10 lg:mt-0">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-80 mix-blend-lighten"
          src="https://images.unsplash.com/photo-1549888834-3ec93abae044?auto=format&fit=crop&q=80"
          alt="Ethiopian Landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent lg:via-background/20" />
      </div>
    </div>
  );
}
