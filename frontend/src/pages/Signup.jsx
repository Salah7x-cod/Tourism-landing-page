import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin, Calendar, BadgeInfo, Eye, EyeOff } from "lucide-react";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, googleLogin } = useAuth();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      googleLogin(decoded);
      setMessage({
        type: 'success',
        text: `Google sign-up successful for ${decoded.email}. Redirecting…`,
      });
      setTimeout(() => navigate(location.state?.from || '/dashboard'), 1200);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to decode Google credential' });
    }
  };

  const handleGoogleError = () => {
    setMessage({ type: 'error', text: 'Google sign-up failed' });
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
    if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
      setMessage({ type: "error", text: "Please use a valid @gmail.com email address." });
      return;
    }
    const dob = new Date(formData.birthDate);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    if (!formData.birthDate || dob > eighteenYearsAgo) {
      setMessage({ type: "error", text: "You must be 18 years or older to register." });
      return;
    }
    try {
      await register({
        full_name: formData.fullName,
        username: formData.username || null,
        email: formData.email,
        phone: formData.phone || null,
        location: formData.location || null,
        birth_date: formData.birthDate || null,
        password: formData.password,
      });
      setMessage({ type: "success", text: "Signup successful! Redirecting to dashboard." });
      setTimeout(() => navigate(location.state?.from || "/dashboard"), 900);
    } catch (err) {
      if (err.message && err.message.includes("Failed to fetch")) {
        setMessage({ type: "error", text: "Unable to connect to the server. Please try again later." });
      } else {
        setMessage({ type: "error", text: err.message });
      }
    }
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
          
          <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Full Name *</label>
            <div className="flex items-center pb-2">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <BadgeInfo className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Username</label>
            <div className="flex items-center pb-2">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe" className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <User className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Email *</label>
            <div className="flex items-center pb-2">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <Mail className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Phone Number</label>
            <div className="flex items-center pb-2">
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+123456789" className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <Phone className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Location</label>
            <div className="flex items-center pb-2">
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="New York, USA" className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <MapPin className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>

          <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Birth Date</label>
            <div className="flex items-center pb-2">
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <Calendar className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>

          <div className="sm:col-span-2 relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#013220]/80 mb-1">Password *</label>
            <div className="flex items-center pb-2">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#013220]/50 hover:text-[#013220]/80 ml-2 flex-shrink-0"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <Lock className="h-5 w-5 text-[#013220]/50 ml-2 shrink-0" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3.5 mt-4 bg-[#013220] hover:bg-white text-white hover:text-[#013220] active:scale-95 font-bold rounded-full border-2 border-[#013220] shadow-md hover:shadow-xl transition-all duration-300">
          Create Account
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#013220]/25"></div>
          <span className="text-xs font-semibold text-[#013220]/60 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-[#013220]/25"></div>
        </div>

        <div className="w-full flex justify-center">
          <div className="hover:scale-105 active:scale-95 transition-transform duration-300 ease-out shadow-sm hover:shadow-md rounded-full overflow-hidden">
             <GoogleLogin
               onSuccess={handleGoogleSuccess}
               onError={handleGoogleError}
               theme="outline"
               size="large"
               type="standard"
               shape="pill"
               width="320"
             />
          </div>
        </div>

        <div className="text-center text-sm text-[#013220]/80 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#013220] hover:underline">
            Login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
