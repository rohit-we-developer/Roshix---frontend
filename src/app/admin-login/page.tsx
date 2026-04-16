"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simple hardcoded check — replace with Supabase Auth later
      // OR use environment variables for credentials
      const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@roshix.com";
      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Admin@123";

      await new Promise((r) => setTimeout(r, 1000)); // fake delay

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Save session in localStorage
        localStorage.setItem(
          "roshix_admin",
          JSON.stringify({
            email,
            loggedIn: true,
            loginTime: new Date().toISOString(),
          })
        );
        router.push("/admin-dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] grid-pattern flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B00]/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/roshix-logo.png"
              alt="Roshix Solutions"
              width={150}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-display gradient-text mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ADMIN LOGIN
            </h1>
            <p className="text-white/40 text-sm">
              Roshix Solutions Dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6"
            >
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <input
                  type="email"
                  placeholder="admin@roshix.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#FF6B00]/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#FF6B00]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="32"
                      strokeLinecap="round"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login to Dashboard →"
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>

        {/* Credentials hint — REMOVE IN PRODUCTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 bg-[#FF6B00]/5 border border-[#FF6B00]/10 rounded-xl text-center"
        >
          <p className="text-xs text-white/30 mb-1">Default Credentials</p>
          <p className="text-xs text-[#FF6B00]/70 font-mono">
            admin@roshix.com / Admin@123
          </p>
          <p className="text-xs text-white/20 mt-1">
            Remove this hint in production!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}