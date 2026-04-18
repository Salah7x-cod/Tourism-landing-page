export default function Blog() {
  const stories = [
    {
      id: 1,
      title: "Journey to the Roof of Africa",
      author: "Local Guide",
      date: "Oct 12, 2026",
      coverImage: "/assets/Simin moountain/Simien Mountains (1).jpg",
      paragraphs: [
        "Trekking through the Simien Mountains was a challenge unlike any other. Scaling jagged peaks required mental as much as physical resilience. But the rewards were boundless. As we ascended towards Ras Dashen, the vistas opened up to reveal seemingly infinite escarpments.",
        "A major highlight was mingling with the endemic Gelada monkeys. Their golden manes fluttered in the brisk highland winds. Seeing them peacefully feeding against the dramatic drops of the rift valley is a scene I won't soon forget.",
        "By sunset, the landscape took on hues of burning orange and deep violet. If you're pondering whether the physical exertion is worth it, I assure you: nothing compares to standing on the roof of Africa."
      ],
      inlineImage: "/assets/Simin moountain/Simien Mountains National Park, Ethiopia.jpg"
    },
    {
      id: 2,
      title: "Experiencing the Danakil Heat",
      author: "Jane Explorer",
      date: "Sep 28, 2026",
      coverImage: "/assets/Danakil Depression/ETHIOPIA_ Lake Assale, Danakil Depression - Reggy de With.jpg",
      paragraphs: [
        "We ventured into one of the most extreme environments on the planet: the Danakil Depression. The heat hit us like a physical wall upon exiting our vehicles, with temperatures soaring well above 40°C.",
        "What struck me most wasn't merely the temperature, but the surreal beauty born from it. The glowing sulfuric pools of Dallol painted the arid ground in vivid greens, yellows, and oranges—a palette you'd expect on Jupiter rather than Earth.",
        "Alongside local Afar guides, tracking the camel caravans extracting salt blocks under a blazing sun put centuries of human endurance into perspective. It's a harsh, unforgiving frontier, but its alien charm is completely mesmerizing."
      ],
      inlineImage: "/assets/Danakil Depression/Screenshot 2026-04-04 151519.png"
    },
    {
      id: 3,
      title: "The Hyena Men of Harar",
      author: "Mark Smith",
      date: "Nov 05, 2026",
      coverImage: "/assets/Harar/Vintage Harar Ethiopia Travel Poster to Inspire Adventure.jpg",
      paragraphs: [
        "Navigating the labyrinthine alleyways of Harar Jegol is a journey backward through time. Its heavily fortified walls house hundreds of colorful mosques and shrines, alongside bustling spice markets.",
        "However, my most vivid memory took place just outside those ancient walls at dusk. We met the legendary 'Hyena Men'. For generations, they've maintained a symbiotic relationship with wild spotted hyenas.",
        "Kneeling on the ground, holding out meat on short sticks—and sometimes even from their mouths—they summon these powerful predators from the dark. Witnessing this mutual trust in such proximity was spine-tingling and utterly captivating."
      ],
      inlineImage: "/assets/The Hyena Men of Harar/HARAR, HYENAS.jpg"
    }
  ];

  return (
    <div className="py-20 bg-background max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.1em]">Travel Stories</h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-muted-foreground font-light">Immersive narratives curated directly from the Ethiopian highlands and valleys.</p>
      </div>

      <div className="space-y-24">
        {stories.map(story => (
          <article key={story.id} className="border-b border-border/50 pb-24 last:border-0 last:pb-0">
            <div className="mb-10 group relative rounded-2xl overflow-hidden shadow-2xl h-[60vh] max-h-[600px]">
              <img 
                src={story.coverImage} 
                alt={story.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10000ms] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white">
                <div className="flex gap-4 items-center text-sm text-primary mb-4 font-bold uppercase tracking-widest drop-shadow-md">
                  <span>{story.date}</span>
                  <span className="w-1 h-1 rounded-full bg-primary inline-block"></span>
                  <span>{story.author}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-xl leading-tight">
                  {story.title}
                </h2>
              </div>
            </div>

            <div className="prose prose-lg prose-invert max-w-none text-muted-foreground grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
              
              <div className="md:col-span-7 space-y-6">
                <p className="text-2xl leading-relaxed text-foreground font-light">{story.paragraphs[0]}</p>
                <p className="leading-relaxed">{story.paragraphs[1]}</p>
                <p className="leading-relaxed">{story.paragraphs[2]}</p>
              </div>

              <div className="md:col-span-5 relative mt-4 md:mt-0">
                <div className="sticky top-24 rounded-xl overflow-hidden shadow-xl border border-border">
                  <img src={story.inlineImage} alt="Story context" className="w-full object-cover aspect-square md:aspect-[4/5] hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 bg-background/60 backdrop-blur-sm p-4 border-t border-border/50">
                     <p className="text-xs text-foreground/80 italic text-center font-serif">A closer look at the environment discussed in {story.author}'s notes.</p>
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
