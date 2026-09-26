import * as React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { signIn } from "@/services/auth";
import { GoogleLinkDialog } from "@/components/auth/GoogleLinkDialog";
import { Honeypot } from "@/components/auth/Honeypot";
import { useGoogleSignIn } from "@/components/auth/useGoogleSignIn";
import { SESSION_EXPIRED_PARAM } from "@/config/session";
import { LaserBorder } from "@/components/ui/LaserBorder";
import { DecryptedText } from "@/components/ui/DecryptedText";

function getSignInErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password. Please verify your credentials.";
    case "auth/too-many-requests":
      return "Too many failed login attempts. Please wait a moment and try again.";
    default:
      return "Unable to sign in. Please verify your details and try again.";
  }
}

function GoogleLogo({
  className = "h-4 w-4 shrink-0",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

const MEMBER_BENEFITS = [
  {
    icon: Zap,
    title: "Instant Download Delivery",
    description:
      "Your digital files, license keys, and API access are always unlocked and ready.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted Cloud Session",
    description:
      "256-bit TLS encrypted session with strict zero-tracking telemetry.",
  },
  {
    icon: Sparkles,
    title: "24/7 Dedicated Concierge",
    description:
      "Need order recovery or invoice assistance? Our support desk is standing by.",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const google = useGoogleSignIn();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get(SESSION_EXPIRED_PARAM) === "1";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    // Honeypot trap: silently ignore bot submissions.
    if (honeypot) {
      return;
    }

    setPending(true);
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (caught) {
      setError(getSignInErrorMessage((caught as { code?: string }).code ?? ""));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#030303] text-[#EDEDED] relative overflow-hidden py-12 md:py-20 font-sans">
      {/* Background Ambience & Quantum Particle Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E1E 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-[600px] h-[500px] bg-[#00FF66]/15 rounded-full blur-[160px]"
        />
        <div className="absolute bottom-10 right-0 w-[500px] h-[400px] bg-[#0099FF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Split Screen Grid (50% Member Welcome | 50% Luxury Login Terminal) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols): Member Citadel Experience */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] text-xs font-mono">
                <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-[11px]">
                  MEMBER ACCESS GATEWAY
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
                <DecryptedText
                  text="WELCOME BACK TO THE UNDERGROUND"
                  speed={25}
                  maxIterations={8}
                />
              </h1>

              {/* Plain-English Subtitle */}
              <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-xl">
                Sign in to access your personal dashboard, digital product
                downloads, and private community updates.
              </p>
            </div>

            {/* 3 Member Benefits */}
            <div className="space-y-4 pt-2">
              {MEMBER_BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-[#1E1E1E] bg-[#080808]/80 backdrop-blur-md hover:border-[#00FF66]/30 transition-all duration-300 group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-sm font-bold text-white tracking-tight font-sans">
                        {benefit.title}
                      </h2>
                      <p className="text-xs text-[#808080] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Community Proof Telemetry Ribbon */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-[#737373] border-t border-[#181818]">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
                <span>21,400+ ACTIVE MEMBERS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0099FF]" />
                <span>99.98% AUTOMATED SETTLEMENT</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Luxury Member Login Terminal */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none">
            <LaserBorder
              speed="10s"
              laserColor="#00FF66"
              secondaryColor="rgba(0, 180, 255, 0.4)"
              glowIntensity="vibrant"
              className="shadow-[0_0_50px_rgba(0,255,102,0.15)]"
              innerClassName="bg-[#090909] p-6 sm:p-8 md:p-9 rounded-2xl space-y-6"
            >
              {/* Form Header */}
              <div className="space-y-1.5 pb-4 border-b border-[#1A1A1A]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#00FF66] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                    256-BIT ENCRYPTED
                  </span>
                  <span className="text-[10px] font-mono text-[#525252]">
                    MEMBER_AUTHENTICATION
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase pt-1 font-sans">
                  LOG IN TO YOUR ACCOUNT
                </h2>
                <p className="text-xs text-[#808080]">
                  Enter your registered credentials to access your dashboard.
                </p>
              </div>

              {/* Session Expired Notice */}
              <AnimatePresence>
                {sessionExpired && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 text-xs text-[#FFC84D] flex items-start gap-2.5"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <span className="font-bold uppercase">Session expired.</span>{" "}
                      Your session ended for security. Please sign in again to
                      continue.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Honeypot value={honeypot} onChange={setHoneypot} />

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                    Email Address <span className="text-[#00FF66]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#555555]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#050505] border border-[#1E1E1E] rounded-xl text-white placeholder-[#444444] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Password Input & Show/Hide Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                      Password <span className="text-[#00FF66]">*</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[11px] text-[#0099FF] hover:text-[#00FF66] transition-colors font-mono"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#555555]">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#050505] border border-[#1E1E1E] rounded-xl text-white placeholder-[#444444] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#737373] hover:text-[#EDEDED] transition-colors cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="p-3 rounded-xl border border-[#FF3333]/30 bg-[#FF3333]/10 text-xs text-[#FF4444] flex items-center gap-2"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={pending}
                  className="relative group w-full py-3.5 px-6 rounded-xl bg-[#00FF66] hover:bg-[#00E55C] text-black font-sans font-black text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,102,0.3)] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] disabled:opacity-50 cursor-pointer overflow-hidden"
                >
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none opacity-40"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                    }}
                  />
                  <span>
                    {pending ? "AUTHENTICATING..." : "LOG IN TO ACCOUNT"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1C1C1C]" />
                  </div>
                  <span className="relative z-10 bg-[#090909] px-3 font-mono text-[10px] text-[#555555] uppercase tracking-wider">
                    OR CONTINUE WITH
                  </span>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={google.handleGoogle}
                  disabled={google.pending}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#222222] bg-[#0E0E0E] hover:bg-[#141414] hover:border-[#333333] text-white text-xs font-semibold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <GoogleLogo className="h-4 w-4" />
                  <span>
                    {google.pending
                      ? "Connecting Google..."
                      : "Continue with Google"}
                  </span>
                </button>

                {google.error && (
                  <p className="text-xs text-[#FF4444] text-center">
                    {google.error}
                  </p>
                )}

                {/* Footer Switcher */}
                <div className="pt-2 text-center text-xs text-[#737373]">
                  <span>New to Inside Underground? </span>
                  <Link
                    to="/register"
                    className="text-[#00FF66] hover:underline font-semibold font-mono"
                  >
                    Create an account &gt;
                  </Link>
                </div>
              </form>
            </LaserBorder>
          </div>
        </div>
      </div>

      {google.conflict && (
        <GoogleLinkDialog
          email={google.conflict.email}
          googleCredential={google.conflict.googleCredential}
          onClose={() => google.setConflict(null)}
          onLinked={() => navigate("/account")}
        />
      )}
    </div>
  );
}
