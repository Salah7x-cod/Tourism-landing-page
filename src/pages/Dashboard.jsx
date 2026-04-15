import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

export default function Dashboard() {
  const { isAuthenticated, token } = useAuth();
  const [data, setData] = useState({ bookings: [], favorites: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    api.dashboard(token).then(setData).catch((err) => setError(err.message));
  }, [token]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="py-12 bg-background min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-white mb-8">Your Dashboard</h1>
        {error && <p className="text-red-300 mb-6">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-serif text-foreground mb-4">Booked Trips</h2>
            {data.bookings?.length ? (
              <ul className="space-y-3">
                {data.bookings.map((booking) => (
                  <li key={booking.id} className="p-3 rounded border border-border">
                    <p className="font-semibold text-foreground">{booking.destination.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {booking.trip_date} | Travelers: {booking.travelers}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No bookings yet.</p>
            )}
          </section>

          <section className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-serif text-foreground mb-4">Saved Favorites</h2>
            {data.favorites?.length ? (
              <ul className="space-y-3">
                {data.favorites.map((favorite) => (
                  <li key={favorite.id} className="p-3 rounded border border-border">
                    <p className="font-semibold text-foreground">{favorite.destination.name}</p>
                    <p className="text-sm text-muted-foreground">{favorite.destination.category}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No favorites saved yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
