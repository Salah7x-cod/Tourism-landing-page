export default function Blog() {
  const stories = [
    {
      id: 1,
      title: "Journey to the Roof of Africa",
      author: "Jane Doe",
      date: "Oct 12, 2023",
      image: "https://images.unsplash.com/photo-1615609653119-94ffc61cbe41?auto=format&fit=crop&q=80",
      excerpt: "Trekking through the Simien Mountains was a challenge, but the views from Ras Dashen were worth every step."
    },
    {
      id: 2,
      title: "Experiencing the Danakil Heat",
      author: "Mark Smith",
      date: "Sep 28, 2023",
      image: "https://images.unsplash.com/photo-1596423023057-0ae0cd5d5bc5?auto=format&fit=crop&q=80",
      excerpt: "We ventured into one of the most extreme environments on the planet. The glowing pools of the depression felt like another world."
    },
    {
      id: 3,
      title: "The Hyena Men of Harar",
      author: "Local Guide",
      date: "Nov 05, 2023",
      image: "https://images.unsplash.com/photo-1588665792193-4e4cf19d7d4c?auto=format&fit=crop&q=80",
      excerpt: "A nighttime tradition unlike any other. Feeding wild hyenas just outside the ancient walls of Harar is a mesmerizing experience."
    }
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Travel Stories</h1>
        <p className="text-lg text-muted-foreground">Read about the adventures and experiences of fellow travelers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map(story => (
          <div key={story.id} className="bg-card rounded-lg border border-border shadow-md overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
            <img src={story.image} alt={story.title} className="w-full h-48 object-cover opacity-90" />
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex gap-2 text-xs text-primary mb-3 font-semibold uppercase tracking-wider">
                <span>{story.date}</span>
                <span>•</span>
                <span>{story.author}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{story.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">{story.excerpt}</p>
              <button className="text-primary hover:text-primary/80 font-medium text-sm w-fit group-hover:translate-x-1 transition-transform border-b border-primary/30 pb-0.5">
                Read Full Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
