import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin, Calendar, BadgeInfo } from "lucide-react";
import AuthShell from "../components/AuthShell";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    password: ""
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    window.location.href = '#';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }
    // Simulate API Call
    setMessage({ type: "success", text: "Signup successful! Please login." });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthShell title="Register" wide>
      {message && (
        <div className={`p-3 mb-5 rounded border ${message.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Full Name *</label>
            <div className="flex items-center pb-2">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <BadgeInfo className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Username</label>
            <div className="flex items-center pb-2">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe" className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <User className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Email *</label>
            <div className="flex items-center pb-2">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <Mail className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Phone Number</label>
            <div className="flex items-center pb-2">
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+123456789" className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <Phone className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Location</label>
            <div className="flex items-center pb-2">
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="New York, USA" className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <MapPin className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Birth Date</label>
            <div className="flex items-center pb-2">
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <Calendar className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>

          <div className="sm:col-span-2 relative border-b border-slate-900/40 hover:border-slate-900/60 focus-within:border-[#1e3a5f] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-900/70 mb-1">Password *</label>
            <div className="flex items-center pb-2">
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-transparent text-slate-900 placeholder-slate-900/50 outline-none focus:ring-0" />
              <Lock className="h-5 w-5 text-slate-900/45 ml-2 shrink-0" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3.5 mt-4 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded shadow transition-colors">
          Create Account
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-slate-900/20"></div>
          <span className="text-xs font-semibold text-slate-900/55 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-slate-900/20"></div>
        </div>

        <button type="button" onClick={handleGoogleSignup} className="w-full py-3 flex items-center justify-center gap-2 border border-slate-900/40 hover:border-slate-900/60 hover:bg-white/20 text-[#0f172a] font-semibold rounded transition-colors">
          <svg className="w-5 h-5 text-[#0f172a]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
          </svg>
          Continue with Google
        </button>

        <div className="text-center text-sm text-slate-900/75 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#0f172a] hover:underline">
            Login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
