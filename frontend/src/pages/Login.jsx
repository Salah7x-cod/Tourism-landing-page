import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin } = useAuth();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      googleLogin(decoded);
      setMessage({
        type: 'success',
        text: `Google sign-in successful! Welcome, ${decoded.name}. Redirecting…`,
      });
      setTimeout(() => navigate(location.state?.from || '/dashboard'), 1200);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to decode Google credential' });
    }
  };

  const handleGoogleError = () => {
    setMessage({ type: 'error', text: 'Google sign-in failed' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !password) {
      setMessage({ type: "error", text: "Please enter your credentials" });
      return;
    }
    try {
      await login({ user, password });
      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate(location.state?.from || '/dashboard'), 700);
    } catch (err) {
      if (err.message && err.message.includes("Failed to fetch")) {
        setMessage({ type: "error", text: "Unable to connect to the server. Please try again later." });
      } else {
        setMessage({ type: "error", text: err.message });
      }
    }
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
        <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
          <label className="block text-xs font-medium text-[#013220]/80 mb-1">Email or username</label>
          <div className="flex items-center pb-2">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Email or username"
              className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0"
            />
            <Mail className="h-5 w-5 text-[#013220]/50 ml-2 flex-shrink-0" />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative border-b border-[#013220]/35 hover:border-[#013220]/55 focus-within:border-[#013220] focus-within:border-b-2 transition-all">
          <label className="block text-xs font-medium text-[#013220]/80 mb-1">Password</label>
          <div className="flex items-center pb-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-[#013220] placeholder-[#013220]/45 outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#013220]/50 hover:text-[#013220]/80 ml-2 flex-shrink-0"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <Lock className="h-5 w-5 text-[#013220]/50 ml-2 flex-shrink-0" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 mt-2 bg-[#013220] hover:bg-white text-white hover:text-[#013220] active:scale-95 font-bold rounded-full border-2 border-[#013220] shadow-md hover:shadow-xl transition-all duration-300"
        >
          Login
        </button>

        <div className="flex items-center gap-3 my-6 rounded">
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
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-[#013220] hover:underline">
            Register
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
