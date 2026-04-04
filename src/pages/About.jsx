export default function About() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto flex-grow flex flex-col justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4 pt-10">About <span className="text-primary">EthioExplore</span></h1>
        <p className="text-xl text-muted-foreground">Promoting the timeless beauty and heritage of Ethiopia.</p>
      </div>

      <div className="prose prose-invert max-w-none text-muted-foreground space-y-8 text-lg bg-card p-8 md:p-12 rounded-xl border border-border shadow-md">
        <p>
          Welcome to EthioExplore. Our platform is dedicated to showcasing the incredible diversity, breathtaking landscapes, and deep-rooted culture that make Ethiopia a unique travel destination.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2 mt-8">Our Mission</h2>
        <p>
          We aim to provide travelers with an intuitive and inspiring portal to discover Ethiopian tourist destinations. By highlighting everything from ancient historical wonders to stunning natural peaks, we hope to ignite a spirit of adventure and cultural appreciation.
        </p>

        <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2 mt-8">Why Ethiopia?</h2>
        <p>
          Often referred to as the <em>Land of Origins</em>, Ethiopia is a cradle of civilization. It offers unmatched historical depth ranging from the rock-hewn churches of Lalibela to the dramatic heights of the Simien Mountains. Our platform is just the first step in your journey to explore this hidden gem of the horn of Africa.
        </p>
      </div>
    </div>
  );
}
