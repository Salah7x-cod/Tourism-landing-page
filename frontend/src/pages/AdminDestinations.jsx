import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

const initialForm = {
  name: "",
  category: "",
  image: "",
  hero_image: "",
  description: "",
  location: "",
  best_time: "",
  highlights: "",
  price: "",
};

export default function AdminDestinations() {
  const { token, user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" replace />;
  if (!user.is_admin) return <Navigate to="/" replace />;

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.createDestination(form, token);
      setMessage("Destination added successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-12 bg-background min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-white mb-8">Admin: Add Destination</h1>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          {Object.keys(initialForm).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={onChange}
              placeholder={key.replace("_", " ")}
              className="w-full p-3 rounded bg-background border border-border text-foreground"
              required={["name", "category", "image", "description"].includes(key)}
            />
          ))}
          {message && <p className="text-green-400">{message}</p>}
          {error && <p className="text-red-300">{error}</p>}
          <button className="px-5 py-3 rounded bg-[#013220] text-white font-semibold">Save Destination</button>
        </form>
      </div>
    </div>
  );
}
