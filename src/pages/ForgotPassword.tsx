import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  RefreshCw,
  LifeBuoy,
  Clock,
} from "lucide-react";
import { resetPassword } from "@/services/auth";
import { LaserBorder } from "@/components/ui/LaserBorder";
import { DecryptedText } from "@/components/ui/DecryptedText";

function getResetErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
      return "No account was found with this email address.";
    case "auth/too-many-requests":
      return "Too many recovery attempts. Please wait a few moments before trying again.";
    case "auth/network-request-failed":
      return "Network connection issue. Please check your internet connection and try again.";
    default:
      return "Unable to send the reset email. Please verify your address and try again.";
  }
}

const RECOVERY_FEATURES = [
  {
    icon: Zap,
    title: "Instant Automated Dispatch",
    description:
      "One-click recovery links are generated and dispatched within 15–30 seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Knowledge Security Token",
    description:
      "Reset links are cryptographically hashed and automatically expire after 1 hour for your protection.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Concierge Backup",
    description:
      "Having trouble or no longer have access to this email? Our concierge desk is standing by.",
  },
];

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  // Timer countdown for resending email
  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your account email address.");
      return;
    }

    setPending(true);
    try {
      await resetPassword(trimmedEmail);
      setSent(true);
      setResendCooldown(60);
    } catch (caught) {
      setError(getResetErrorMessage((caught as { code?: string }).code ?? ""));
    } finally {
      setPending(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || pending) return;
    setError(null);
    setPending(true);
    try {
      await resetPassword(email.trim());
      setResendCooldown(60);
    } catch (caught) {
      setError(getResetErrorMessage((caught as { code?: string }).code ?? ""));
    } finally {
      setPending(false);
    }
  };

  const handleResetForm = () => {
    setSent(false);
    setError(null);
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
        {/* Split Screen Grid (50% Reassurance Citadel | 50% Luxury Recovery Terminal) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (6 cols): Reassurance Citadel Experience */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] text-xs font-mono">
                <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
                <span className="font-bold tracking-wider uppercase text-[11px]">
                  SECURE IDENTITY RECOVERY
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
                <DecryptedText
                  text="RESTORE ACCESS TO YOUR ASSETS"
                  speed={25}
                  maxIterations={8}
                />
              </h1>

              {/* Plain-English Reassurance Subtitle */}
              <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-xl">
                Enter your registered email address and our automated recovery
                engine will dispatch a secure, one-click reset link directly to
                your inbox. Your account licenses, files, and orders remain 100%
                safe.
              </p>
            </div>

            {/* 3 Reassurance Feature Pods */}
            <div className="space-y-4 pt-2">
              {RECOVERY_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-[#1E1E1E] bg-[#080808]/80 backdrop-blur-md hover:border-[#00FF66]/30 transition-all duration-300 group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-sm font-bold text-white tracking-tight font-sans">
                        {feature.title}
                      </h2>
                      <p className="text-xs text-[#808080] leading-relaxed">
                        {feature.description}
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

          {/* Right Column (6 cols): Luxury Recovery Terminal */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none">
            <LaserBorder
              speed="10s"
              laserColor="#00FF66"
              secondaryColor="rgba(0, 180, 255, 0.4)"
              glowIntensity="vibrant"
              className="shadow-[0_0_50px_rgba(0,255,102,0.15)]"
              innerClassName="bg-[#090909] p-6 sm:p-8 md:p-9 rounded-2xl space-y-6"
            >
              <AnimatePresence mode="wait">
                {!sent ? (
                  /* Form State */
                  <motion.div
                    key="form-state"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="space-y-1.5 pb-4 border-b border-[#1A1A1A]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#00FF66] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                          256-BIT ENCRYPTED
                        </span>
                        <span className="text-[10px] font-mono text-[#525252]">
                          ACCOUNT_RECOVERY
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase pt-1 font-sans">
                        RESET YOUR PASSWORD
                      </h2>
                      <p className="text-xs text-[#808080]">
                        Enter the email associated with your account to receive
                        a secure reset link.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold font-mono text-[#A3A3A3] uppercase tracking-wider block">
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
                            className="w-full pl-10 pr-3.5 py-3 text-xs bg-[#050505] border border-[#1E1E1E] rounded-xl text-white placeholder-[#444444] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-xl bg-[#FF3333]/10 border border-[#FF3333]/30 flex items-start gap-2.5 text-[#FF6666] text-xs"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span className="leading-tight">{error}</span>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={pending}
                        className="relative w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#00FF66] hover:bg-[#00FF66]/90 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,102,0.35)] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 overflow-hidden group"
                      >
                        {/* Shimmer sweep effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                        {pending ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>DISPATCHING RECOVERY LINK...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND RECOVERY LINK</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Navigation Links */}
                    <div className="pt-4 border-t border-[#181818] space-y-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="text-[#737373]">
                          Remember your password?
                        </span>
                        <Link
                          to="/login"
                          className="font-bold text-[#00FF66] hover:underline transition-all flex items-center gap-1"
                        >
                          <span>Log in</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <div className="text-[11px] text-[#555555]">
                        Don't have an account yet?{" "}
                        <Link
                          to="/register"
                          className="text-[#888888] hover:text-[#EDEDED] transition-colors underline"
                        >
                          Create an account
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Success Transmutation State */
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-center"
                  >
                    {/* Pulsing Recovery Beacon */}
                    <div className="relative inline-flex mx-auto">
                      <div className="absolute inset-0 rounded-2xl bg-[#00FF66]/20 blur-xl animate-pulse" />
                      <div className="relative h-16 w-16 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] shadow-[0_0_30px_rgba(0,255,102,0.3)]">
                        <CheckCircle2 className="h-8 w-8 text-[#00FF66]" />
                      </div>
                    </div>

                    {/* Success Header */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#00FF66] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30">
                        DISPATCH SUCCESSFUL
                      </span>
                      <h2 className="text-2xl font-black text-white tracking-tight uppercase pt-2 font-sans">
                        RECOVERY LINK SENT
                      </h2>
                      <p className="text-xs text-[#A3A3A3] max-w-sm mx-auto leading-relaxed">
                        We have dispatched a secure password reset link to your
                        email address.
                      </p>
                    </div>

                    {/* Target Email Box */}
                    <div className="p-3.5 rounded-xl border border-[#1E1E1E] bg-[#050505] flex items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail className="h-4 w-4 text-[#00FF66] shrink-0" />
                        <span className="text-xs font-mono text-[#EDEDED] truncate font-medium">
                          {email}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20 shrink-0">
                        SENT ✓
                      </span>
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="p-4 rounded-xl border border-[#181818] bg-[#080808] text-left space-y-2.5 text-xs text-[#808080]">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-[#00FF66] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          The reset link is valid for{" "}
                          <strong className="text-white">1 hour</strong>.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#0099FF] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          Be sure to check your{" "}
                          <strong className="text-white">
                            Spam or Junk folder
                          </strong>{" "}
                          if the message doesn't appear in 60 seconds.
                        </span>
                      </div>
                    </div>

                    {/* Resend Action */}
                    <div className="space-y-3 pt-2">
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#00FF66] hover:bg-[#00FF66]/90 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,102,0.35)] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>RETURN TO LOGIN</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <div className="flex items-center justify-center gap-4 text-xs font-mono pt-1">
                        <button
                          type="button"
                          onClick={handleResend}
                          disabled={resendCooldown > 0 || pending}
                          className="text-[#0099FF] hover:text-[#00FF66] disabled:text-[#525252] disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          {resendCooldown > 0
                            ? `Resend link in ${resendCooldown}s`
                            : "Resend recovery email"}
                        </button>
                        <span className="text-[#333333]">|</span>
                        <button
                          type="button"
                          onClick={handleResetForm}
                          className="text-[#737373] hover:text-[#EDEDED] transition-colors cursor-pointer"
                        >
                          Use another email
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </LaserBorder>
          </div>
        </div>
      </div>
    </div>
  );
}