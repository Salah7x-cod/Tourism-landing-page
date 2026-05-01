import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { PenLine, Upload, Link as LinkIcon, ChevronUp, Loader2, CheckCircle2 } from "lucide-react";

const fallbackStories = [
  {
    id: "local-1",
    title: "Journey to the Roof of Africa",
    user: { full_name: "Local Guide" },
    created_at: "2026-10-12T00:00:00Z",
    cover_image: "/assets/Simin moountain/Simien Mountains (1).jpg",
    content:
      "Trekking through the Simien Mountains was a challenge unlike any other. Scaling jagged peaks required mental as much as physical resilience. But the rewards were boundless. As we ascended towards Ras Dashen, the vistas opened up to reveal seemingly infinite escarpments.\n\nA major highlight was mingling with the endemic Gelada monkeys. Their golden manes fluttered in the brisk highland winds. Seeing them peacefully feeding against the dramatic drops of the rift valley is a scene I won't soon forget.\n\nBy sunset, the landscape took on hues of burning orange and deep violet. If you're pondering whether the physical exertion is worth it, I assure you: nothing compares to standing on the roof of Africa.",
    inlineImage: "/assets/Simin moountain/Simien Mountains National Park, Ethiopia.jpg",
  },
  {
    id: "local-2",
    title: "Experiencing the Danakil Heat",
    user: { full_name: "Jane Explorer" },
    created_at: "2026-09-28T00:00:00Z",
    cover_image: "/assets/Danakil Depression/ETHIOPIA_ Lake Assale, Danakil Depression - Reggy de With.jpg",
    content:
      "We ventured into one of the most extreme environments on the planet: the Danakil Depression. The heat hit us like a physical wall upon exiting our vehicles, with temperatures soaring well above 40°C.\n\nWhat struck me most wasn't merely the temperature, but the surreal beauty born from it. The glowing sulfuric pools of Dallol painted the arid ground in vivid greens, yellows, and oranges, a palette you'd expect on Jupiter rather than Earth.\n\nAlongside local Afar guides, tracking the camel caravans extracting salt blocks under a blazing sun put centuries of human endurance into perspective. It's a harsh, unforgiving frontier, but its alien charm is completely mesmerizing.",
    inlineImage: "/assets/Danakil Depression/Screenshot 2026-04-04 151519.png",
  },
  {
    id: "local-3",
    title: "The Hyena Men of Harar",
    user: { full_name: "Mark Smith" },
    created_at: "2026-11-05T00:00:00Z",
    cover_image: "/assets/Harar/Vintage Harar Ethiopia Travel Poster to Inspire Adventure.jpg",
    content:
      "Navigating the labyrinthine alleyways of Harar Jegol is a journey backward through time. Its heavily fortified walls house hundreds of colorful mosques and shrines, alongside bustling spice markets.\n\nHowever, my most vivid memory took place just outside those ancient walls at dusk. We met the legendary 'Hyena Men'. For generations, they've maintained a symbiotic relationship with wild spotted hyenas.\n\nKneeling on the ground, holding out meat on short sticks, and sometimes even from their mouths, they summon these powerful predators from the dark. Witnessing this mutual trust in such proximity was spine-tingling and utterly captivating.",
    inlineImage: "/assets/The Hyena Men of Harar/HARAR, HYENAS.jpg",
  },
];

export default function Blog() {
  const { t } = useLanguage();
  const { token, isAuthenticated } = useAuth();
  const [apiStories, setApiStories] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [destinationFilter, setDestinationFilter] = useState("");
  const [sort, setSort] = useState("date");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", cover_image: "", destination_id: "" });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  useEffect(() => {
    api
      .listBlogs({ destinationId: destinationFilter || undefined, sort })
      .then(setApiStories)
      .catch(() => setApiStories([]));
  }, [destinationFilter, sort]);

  useEffect(() => {
    api.destinations().then(setDestinations).catch(() => setDestinations([]));
  }, []);

  const allStories = [...apiStories, ...(destinationFilter ? [] : fallbackStories)];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    setSubmitting(true);
    setSubmitMsg("");

    try {
      let coverUrl = formData.cover_image;
      if (imageFile) {
        const upload = await api.uploadFile(imageFile, token);
        coverUrl = upload.url;
      }

      await api.createBlog(
        {
          title: formData.title,
          content: formData.content,
          cover_image: coverUrl || null,
          destination_id: formData.destination_id ? Number(formData.destination_id) : null,
        },
        token,
      );

      setSubmitMsg(t("blog.submitted"));
      setFormData({ title: "", content: "", cover_image: "", destination_id: "" });
      setImageFile(null);
      setShowForm(false);
    } catch (err) {
      setSubmitMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const splitContent = (content) => {
    const paragraphs = content.split("\n\n").filter(Boolean);
    return paragraphs.length > 0 ? paragraphs : [content];
  };

  return (
    <div className="py-20 bg-background max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-foreground mb-4 uppercase tracking-[0.1em]">{t("blog.title")}</h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-6" />
        <p className="text-xl text-muted-foreground font-light">{t("blog.subtitle")}</p>
      </div>

      {isAuthenticated && (
        <div className="mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-[#013220] text-white font-semibold hover:bg-[#024a30] transition-colors shadow-lg active:scale-95"
          >
            {showForm ? <ChevronUp className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
            {t("blog.shareStory")}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-6 max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-xl space-y-5 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t("blog.storyTitle")}</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="An unforgettable journey..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t("blog.storyContent")}</label>
                <textarea
                  required
                  minLength={10}
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
                  placeholder="Tell us about your experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t("blog.coverImage")}</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors text-sm font-medium text-foreground">
                    <Upload className="w-4 h-4" />
                    {t("blog.uploadImage")}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const nextFile = e.target.files?.[0] || null;
                        if (nextFile && nextFile.size > 5 * 1024 * 1024) {
                          setSubmitMsg("Image uploads must be 5 MB or smaller.");
                          e.target.value = "";
                          return;
                        }
                        setImageFile(nextFile);
                        if (nextFile) setFormData({ ...formData, cover_image: "" });
                      }}
                    />
                  </label>
                  <span className="text-muted-foreground text-xs text-center">{t("blog.orPasteUrl")}</span>
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={formData.cover_image}
                      onChange={(e) => {
                        setFormData({ ...formData, cover_image: e.target.value });
                        if (e.target.value) setImageFile(null);
                      }}
                      className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                {imageFile && <p className="text-xs text-primary mt-1.5">Attached: {imageFile.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t("blog.selectDestination")}</label>
                <select
                  value={formData.destination_id}
                  onChange={(e) => setFormData({ ...formData, destination_id: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-3 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="">None</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#013220] hover:bg-[#024a30] text-white font-bold rounded-full shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />{t("blog.submitting")}</> : t("blog.submit")}
              </button>
            </form>
          )}

          {submitMsg && (
            <div className="mt-4 max-w-2xl mx-auto p-4 rounded-xl bg-[#c8e6d5]/20 border border-[#c8e6d5]/40 text-center animate-fade-in flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <p className="text-sm text-primary font-medium">{submitMsg}</p>
            </div>
          )}
        </div>
      )}

      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <label className="text-sm font-semibold text-foreground">
          {t("blog.filterDestination")}
          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{t("blog.allDestinations")}</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-foreground">
          {t("blog.sortStories")}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">{t("blog.newestFirst")}</option>
            <option value="oldest">{t("blog.oldestFirst")}</option>
          </select>
        </label>
      </div>

      <div className="space-y-24">
        {allStories.map((story) => {
          const paragraphs = splitContent(story.content);
          const coverImg = api.assetUrl(story.cover_image);
          const inlineImg = story.inlineImage;
          const authorName = story.user?.full_name || "Anonymous";
          const dateStr = formatDate(story.published_at || story.created_at);

          return (
            <article key={story.id} className="border-b border-border/50 pb-24 last:border-0 last:pb-0">
              {coverImg ? (
                <div className="mb-10 group relative rounded-2xl overflow-hidden shadow-2xl h-[60vh] max-h-[600px]">
                  <img src={coverImg} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10000ms] ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white">
                    <div className="flex gap-4 items-center text-sm text-primary mb-4 font-bold uppercase tracking-widest drop-shadow-md">
                      <span>{dateStr}</span>
                      <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                      <span>{authorName}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-xl leading-tight">{story.title}</h2>
                  </div>
                </div>
              ) : (
                <div className="mb-10">
                  <div className="flex gap-4 items-center text-sm text-primary mb-4 font-bold uppercase tracking-widest">
                    <span>{dateStr}</span>
                    <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                    <span>{authorName}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">{story.title}</h2>
                </div>
              )}

              <div className="prose prose-lg prose-invert max-w-none text-muted-foreground grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                <div className="md:col-span-7 space-y-6">
                  {paragraphs[0] && <p className="text-2xl leading-relaxed text-foreground font-light">{paragraphs[0]}</p>}
                  {paragraphs.slice(1).map((p, i) => <p key={i} className="leading-relaxed">{p}</p>)}
                </div>

                {inlineImg && (
                  <div className="md:col-span-5 relative mt-4 md:mt-0">
                    <div className="sticky top-24 rounded-xl overflow-hidden shadow-xl border border-border">
                      <img src={inlineImg} alt="Story context" className="w-full object-cover aspect-square md:aspect-[4/5] hover:opacity-90 transition-opacity" />
                      <div className="absolute bottom-0 inset-x-0 bg-background/60 backdrop-blur-sm p-4 border-t border-border/50">
                        <p className="text-xs text-foreground/80 italic text-center font-serif">
                          A closer look at the environment discussed in {authorName}'s notes.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
