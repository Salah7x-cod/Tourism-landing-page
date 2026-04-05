import { Link, useLocation } from "react-router-dom";

export default function AuthShell({ children, title, wide = false }) {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col relative bg-[#1a3a5c] bg-cover bg-center bg-no-repeat bg-fixed" 
         style={{ backgroundImage: `url('/assets/Simin moountain/North Mountain, beautiful landscape in Ethiopia.jpg')` }}>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Top Bar Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:px-8 z-10 flex justify-end">
        <Link
          to={isSignup ? "/login" : "/signup"}
          className="px-6 py-2 border hover:border-white/90 hover:bg-white/10 border-white/70 text-white font-semibold rounded-md transition-all duration-300 backdrop-blur-sm"
        >
          {isSignup ? "Login" : "Register"}
        </Link>
      </div>

      {/* Main Container */}
      <div className={`flex-1 flex items-center justify-center p-4 sm:p-8 z-10 w-full`}>
        <div 
          className={`relative w-full ${wide ? 'max-w-2xl' : 'max-w-[440px]'} rounded-xl p-6 sm:p-8 bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl overflow-hidden`}
        >
          {title && (
            <h1 className="text-2xl font-bold text-center text-[#0f172a] mb-6 tracking-tight drop-shadow-sm">
              {title}
            </h1>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
