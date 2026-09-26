import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { registerUser } from "@/services/auth";
import { GoogleLinkDialog } from "@/components/auth/GoogleLinkDialog";
import { Honeypot } from "@/components/auth/Honeypot";
import { validatePassword } from "@/components/auth/passwordStrength";
import { useGoogleSignIn } from "@/components/auth/useGoogleSignIn";
import { LaserBorder } from "@/components/ui/LaserBorder";
import { DecryptedText } from "@/components/ui/DecryptedText";

const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]{3,24}$/;

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    default:
      return "Unable to create your account. Please try again.";
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

const VALUE_PILLARS = [
  {
    icon: Zap,
    title: "Instant 60-Second Setup",
    description:
      "No credit cards, bank accounts, or KYC checks required. Just your email.",
  },
  {
    icon: ShieldCheck,
    title: "100% Private & Zero Tracking",
    description:
      "We never sell your data, load ad pixels, or track your browsing activity.",
  },
  {
    icon: Sparkles,
    title: "Lifetime Ownership & Updates",
    description:
      "Every purchase grants permanent download access and all future releases.",
  },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const google = useGoogleSignIn();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [created, setCreated] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState("");

  const passwordValidation = React.useMemo(() => {
    return validatePassword(password);
  }, [password]);

  const passwordsMatch = Boolean(password && confirm && password === confirm);
  const passwordsMismatch = Boolean(confirm && password !== confirm);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    // Honeypot trap: bots that autofill the hidden field are silently given
    // the success screen but no account is created.
    if (honeypot) {
      setCreated(true);
      return;
    }

    if (!USERNAME_PATTERN.test(username)) {
      setError(
        "Username must be 3-24 characters using letters, numbers, _ . or -.",
      );
      return;
    }
    if (!passwordValidation.valid) {
      setError("Password must meet all 3 security requirements below.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms of Service to continue.");
      return;
    }

    setPending(true);
    try {
      await registerUser({ email, password, username });
      setCreated(true);
    } catch (caught) {
      setError(getAuthErrorMessage((caught as { code?: string }).code ?? ""));
    } finally {
      setPending(false);
    }
  };

  // Success Screen After Registration
  if (created) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#030303] relative overflow-hidden font-sans">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00FF66]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-lg relative z-10">
          <LaserBorder
            speed="8s"
            laserColor="#00FF66"
            secondaryColor="rgba(0, 204, 255, 0.4)"
            glowIntensity="vibrant"
            className="shadow-[0_0_50px_rgba(0,255,102,0.2)]"
            innerClassName="bg-[#090909] p-8 sm:p-10 text-center space-y-6 rounded-2xl"
          >
            <div className="h-16 w-16 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] mx-auto shadow-[0_0_25px_rgba(0,255,102,0.25)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#00FF66] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                STATUS: ACCOUNT CREATED
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase pt-2">
                ACCOUNT INITIALIZED
              </h2>
              <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                Welcome to Inside Underground! Your member account has been
                registered. You can now explore the catalog and unlock digital
                tools with instant crypto checkout.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#1E1E1E] bg-[#050505] text-left text-xs font-mono space-y-2 text-[#737373]">
              <div className="flex justify-between">
                <span>ACCOUNT:</span>
                <span className="text-[#EDEDED] font-bold">{username}</span>
              </div>
              <div className="flex justify-between">
                <span>EMAIL:</span>
                <span className="text-[#EDEDED] font-bold">{email}</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-[#00FF66] font-bold">
                  READY FOR ACTIVATION
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/account")}
                className="w-full py-3 px-5 rounded-xl bg-[#00FF66] hover:bg-[#00E55C] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,102,0.3)]"
              >
                <span>VIEW MY ACCOUNT</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/browse")}
                className="w-full py-3 px-5 rounded-xl border border-[#222222] bg-[#111111] hover:bg-[#181818] text-[#EDEDED] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-[#00FF66]" />
                <span>EXPLORE PRODUCTS</span>
              </button>
            </div>
          </LaserBorder>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#030303] text-[#EDEDED] relative overflow-hidden py-12 md:py-20 font-sans">
      {/* Background Ambience & Quantum Particles */}
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
        {/* Split Screen Grid (50% Value Citadel | 50% Luxury Registration Terminal) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): The Quantum Citadel & Reassurance */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] text-xs font-mono">
                <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-[11px]">
                  OFFICIAL ACCESS PORTAL
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                <DecryptedText
                  text="ACCESS VERIFIED DIGITAL ASSETS"
                  speed={25}
                  maxIterations={8}
                />
              </h1>

              {/* Plain-English Subtitle */}
              <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-xl">
                Join our private community of builders and engineers. Settle
                transactions privately with cryptocurrency and unlock lifetime
                access to exclusive digital products and updates.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="space-y-4 pt-2">
              {VALUE_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-[#1E1E1E] bg-[#080808]/80 backdrop-blur-md hover:border-[#00FF66]/30 transition-all duration-300 group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-sm font-bold text-white tracking-tight font-sans">
                        {pillar.title}
                      </h2>
                      <p className="text-xs text-[#808080] leading-relaxed">
                        {pillar.description}
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
                <span>21,400+ VERIFIED MEMBERS ACTIVE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0099FF]" />
                <span>99.98% AUTOMATED SETTLEMENT</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): The Luxury Registration Terminal */}
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
                    REGISTRATION_GATEWAY
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase pt-1">
                  CREATE YOUR ACCOUNT
                </h2>
                <p className="text-xs text-[#808080]">
                  Enter your details below to initialize your member portal.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Honeypot value={honeypot} onChange={setHoneypot} />

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                    Choose a Username <span className="text-[#00FF66]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#555555]">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. quantum_coder"
                      autoComplete="username"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#050505] border border-[#1E1E1E] rounded-xl text-white placeholder-[#444444] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-[#555555] block">
                    3–24 characters (letters, numbers, _ or -)
                  </span>
                </div>

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
                  <span className="text-[10px] text-[#555555] block">
                    Your digital downloads and order keys are delivered here.
                  </span>
                </div>

                {/* Password Input & Show/Hide Toggle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                    Create Password <span className="text-[#00FF66]">*</span>
                  </label>
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
                      autoComplete="new-password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#050505] border border-[#1E1E1E] rounded-xl text-white placeholder-[#444444] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#737373] hover:text-[#EDEDED] transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Requirements Indicator */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-2 space-y-2 overflow-hidden"
                    >
                      {/* Segmented Strength Bar */}
                      <div className="grid grid-cols-3 gap-1.5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`rounded-full transition-colors ${
                            passwordValidation.metCount >= 1
                              ? "bg-[#FF9900]"
                              : "bg-[#222222]"
                          }`}
                        />
                        <div
                          className={`rounded-full transition-colors ${
                            passwordValidation.metCount >= 2
                              ? "bg-[#FFCC00]"
                              : "bg-[#222222]"
                          }`}
                        />
                        <div
                          className={`rounded-full transition-colors ${
                            passwordValidation.valid
                              ? "bg-[#00FF66]"
                              : "bg-[#222222]"
                          }`}
                        />
                      </div>

                      {/* Requirement Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        {passwordValidation.checks.map((check) => (
                          <span
                            key={check.label}
                            className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${
                              check.met
                                ? "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30"
                                : "bg-[#141414] text-[#737373] border border-[#1E1E1E]"
                            }`}
                          >
                            <span>{check.met ? "✓" : "○"}</span>
                            <span>{check.label}</span>
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                    Confirm Password <span className="text-[#00FF66]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#555555]">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-10 py-2.5 text-xs bg-[#050505] border rounded-xl text-white placeholder-[#444444] focus:outline-none transition-all font-mono ${
                        passwordsMatch
                          ? "border-[#00FF66]/60 focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]"
                          : passwordsMismatch
                            ? "border-[#FF3333]/60 focus:border-[#FF3333]"
                            : "border-[#1E1E1E] focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#737373] hover:text-[#EDEDED] transition-colors"
                      title={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordsMatch && (
                    <span className="text-[10px] text-[#00FF66] font-mono flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Passwords match
                    </span>
                  )}
                  {passwordsMismatch && (
                    <span className="text-[10px] text-[#FF4444] font-mono flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Passwords do not match
                      yet
                    </span>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-2.5 pt-1 text-xs text-[#A3A3A3]">
                  <input
                    type="checkbox"
                    id="terms-agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#1E1E1E] bg-[#050505] text-[#00FF66] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#00FF66]"
                  />
                  <label
                    htmlFor="terms-agree"
                    className="leading-snug select-none cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-[#00FF66] hover:underline font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and Privacy Covenant.
                  </label>
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
                    {pending ? "INITIALIZING ACCOUNT..." : "CREATE ACCOUNT"}
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
                  <span>Already have an account? </span>
                  <Link
                    to="/login"
                    className="text-[#00FF66] hover:underline font-semibold font-mono"
                  >
                    Log In &gt;
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
