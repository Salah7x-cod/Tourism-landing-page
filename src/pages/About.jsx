import { Users, Target, Globe, Shield, HeartHandshake, Zap } from 'lucide-react';

export default function About() {
  const missionValues = [
    { icon: Globe, title: "Global Access", desc: "Bringing the horn of Africa closer to global travelers through interactive, digital experiences." },
    { icon: HeartHandshake, title: "Cultural Respect", desc: "Prioritizing the dignity and authentic representation of native communities and heritage." },
    { icon: Shield, title: "Sustainable Tourism", desc: "Advocating for pathways that preserve rather than degrade vital ecosystems." },
    { icon: Zap, title: "Empowering Locals", desc: "Ensuring deep community involvement and economic advantages stay local." }
  ];

  return (
    <div className="flex-grow flex flex-col bg-background">
      
      {/* Header Area */}
      <div className="relative py-24 md:py-32 overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 opacity-10 pattern-dots" /> 
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 uppercase tracking-wider">About <span className="text-primary italic">EthioExplore</span></h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
            We exist to promote the majestic, timeless beauty and boundless heritage of Ethiopia, seamlessly bridging ancient history with modern digital discovery.
          </p>
        </div>
      </div>

      {/* Main Content & Mission */}
      <div className="py-20 md:py-28 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 text-lg text-muted-foreground">
            <h2 className="text-3xl font-serif text-foreground flex items-center gap-4">
              <Target className="text-primary w-8 h-8" />
              Our Core Mission
            </h2>
            <p className="leading-relaxed">
              Welcome to EthioExplore. Our platform is dedicated to showcasing the incredible diversity, breathtaking landscapes, and deep-rooted cultures that make Ethiopia a highly unique destination unmatched globally.
            </p>
            <p className="leading-relaxed">
              Often referred to as the <em>Land of Origins</em>, Ethiopia is a foundational cradle of human civilization. We aim to provide travelers with an intuitive portal—simplifying discovery while honoring the profound majesty of natural and cultural peaks alike.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {missionValues.map((val, idx) => (
                <div key={idx} className="bg-card p-6 rounded-2xl border border-border shadow-lg hover:border-primary/40 transition-colors group">
                   <div className="w-12 h-12 bg-background rounded-full border border-border flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                     <val.icon className="w-6 h-6 text-primary" />
                   </div>
                   <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{val.title}</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>

      {/* Team CTA */}
      <div className="bg-card py-24 border-t border-border">
         <div className="max-w-4xl mx-auto text-center px-4">
            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-serif text-foreground mb-6">Built by Explorers</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
               Our team comprises local guides, digital nomads, and history enthusiasts committed to shining a light on this corner of the globe.
            </p>
            <button className="px-8 py-4 bg-primary text-background font-bold rounded-full hover:scale-105 hover:bg-primary/90 transition-all shadow-xl">
               Contact The Team
            </button>
         </div>
      </div>

    </div>
  );
}
