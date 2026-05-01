import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { CheckCircle, XCircle, Clock, User, MapPin } from "lucide-react";

export default function AdminBlogs() {
  const { token, user } = useAuth();
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState("");

  useEffect(() => {
    if (!token || !user?.is_admin) return;
    api
      .listPendingBlogs(token)
      .then(setPending)
      .catch(() => setPending([]))
      .finally(() => setLoading(false));
  }, [token, user]);

  const handleAction = async (blogId, status) => {
    try {
      await api.updateBlogStatus(blogId, status, token);
      setPending((prev) => prev.filter((p) => p.id !== blogId));
      setActionFeedback(
        status === "approved"
          ? "Blog post approved and published!"
          : "Blog post rejected."
      );
      setTimeout(() => setActionFeedback(""), 3000);
    } catch (err) {
      setActionFeedback(err.message);
    }
  };

  if (!user?.is_admin) {
    return (
      <div className="py-20 text-center text-foreground flex-grow">
        <h2 className="text-2xl font-serif">Access Denied</h2>
        <p className="text-muted-foreground mt-2">Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow bg-background min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
          Blog Review
        </h1>
        <p className="text-muted-foreground">
          Review and approve community-submitted travel stories.
        </p>
      </div>

      {actionFeedback && (
        <div className="mb-6 p-4 rounded-xl bg-[#c8e6d5]/20 border border-[#c8e6d5]/40 text-primary font-medium text-center animate-fade-in">
          {actionFeedback}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : pending.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Clock className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-xl font-serif">No pending submissions</p>
          <p className="text-sm mt-2">All blog posts have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.map((post) => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {post.cover_image && (
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={api.assetUrl(post.cover_image)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.user?.full_name || "Unknown"}
                    </span>
                    {post.destination && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {post.destination.name}
                      </span>
                    )}
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2 font-serif">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleAction(post.id, "approved")}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors shadow-md active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(post.id, "rejected")}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-600/80 hover:bg-red-700 text-white font-semibold rounded-full transition-colors shadow-md active:scale-95"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
