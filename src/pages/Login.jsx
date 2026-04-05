import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthShell from "../components/AuthShell";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulated auth or external redirect
    window.location.href = '#';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !password) {
      setMessage({ type: "error", text: "Please enter your credentials" });
      return;
    }
    // Simulate API call
    setMessage({ type: "success", text: "Login successful!" });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <AuthShell title="Login">
      {message && (
        <div className={`p-3 mb-5 rounded border ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
          <label className="block text-xs font-medium text-slate-900/70 mb-1">Email or username</label>
          <div className="flex items-center pb-2">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Email or username"
              className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0"
            />
            <Mail className="h-5 w-5 text-slate-900/45 ml-2 flex-shrink-0" />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
          <label className="block text-xs font-medium text-slate-900/70 mb-1">Password</label>
          <div className="flex items-center pb-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0"
            />
            <Lock className="h-5 w-5 text-slate-900/45 ml-2 flex-shrink-0" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 mt-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded shadow transition-colors"
        >
          Login
        </button>

        <div className="flex items-center gap-3 my-6 rounded">
          <div className="flex-1 h-px bg-slate-900/20"></div>
          <span className="text-xs font-semibold text-slate-900/55 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-slate-900/20"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 flex items-center justify-center gap-2 border border-slate-900/40 hover:border-slate-900/60 hover:bg-white/20 text-[#0f172a] font-semibold rounded transition-colors"
        >
          <svg className="w-5 h-5 text-[#0f172a]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Continue with Google
        </button>

        <div className="text-center text-sm text-slate-900/75 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-[#0f172a] hover:underline">
            Register
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
