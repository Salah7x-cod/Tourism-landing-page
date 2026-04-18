import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const heroImage = "/assets/Tourism%20hero%20page%20.png";

export default function AuthShell({ children, title, wide = false }) {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div
      className="min-h-screen flex flex-col relative bg-[#0f1a2c] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url('${heroImage}')` }}
    >
      <div className="absolute inset-0 bg-[#0f1a2c]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2c]/80 via-transparent to-[#0f1a2c]/30" />

      <div className="absolute top-0 left-0 right-0 p-4 sm:px-8 z-20 flex justify-between items-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border-2 border-[#013220] bg-white/95 px-4 py-2 text-sm font-bold text-[#013220] shadow-md transition-colors hover:bg-[#013220] hover:text-white hover:border-[#013220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220] focus-visible:ring-offset-2 focus-visible:ring-offset-white/80"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to home
        </Link>
        <Link
          to={isSignup ? "/login" : "/signup"}
          className="inline-flex min-h-[44px] items-center justify-center px-5 py-2 rounded-lg border-2 border-[#013220] bg-white/95 text-sm font-semibold text-[#013220] shadow-md transition-colors hover:bg-[#013220] hover:text-white hover:border-[#013220] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013220] focus-visible:ring-offset-2 focus-visible:ring-offset-white/80 shrink-0"
        >
          {isSignup ? "Login" : "Register"}
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8 pt-20 w-full">
        <div
          className={`relative w-full ${wide ? "max-w-2xl" : "max-w-[440px]"} rounded-2xl p-6 sm:p-9 bg-white/95 backdrop-blur-sm border-2 border-white shadow-2xl overflow-hidden ring-1 ring-[#013220]/15`}
        >
          {title && (
            <h1 className="text-2xl font-bold text-center text-[#013220] mb-6 tracking-tight">
              {title}
            </h1>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
