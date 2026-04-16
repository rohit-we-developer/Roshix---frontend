"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MapPin, Mail, Phone, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="section-label block mb-3">// Let's Connect</span>
        <h2
          className="text-5xl md:text-7xl font-display leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          START YOUR
          <br />
          <span className="gradient-text">PROJECT</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Left — Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="text-white/60 text-lg leading-relaxed">
            Ready to build something great? Tell us about your project and we'll get back to you
            within 24 hours with a tailored proposal.
          </p>

          <div className="space-y-5">
            {[
              { Icon: MapPin, label: "Location", value: "Pune, Maharashtra, India" },
              { Icon: Mail, label: "Email", value: "hello@roshixsolutions.com" },
              { Icon: Phone, label: "Phone", value: "+91 98765 43210" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-0.5">{label}</div>
                  <div className="text-white text-sm font-medium">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative */}
          <div className="mt-12 p-6 bg-[#111111] border border-white/5 rounded-xl">
            <div className="text-2xl font-bold gradient-text mb-1">24hr</div>
            <div className="text-sm text-white/50">Average response time for new inquiries</div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center gap-4 p-10 bg-[#111111] border border-[#FF6B00]/20 rounded-xl"
            >
              <CheckCircle size={48} className="text-[#FF6B00]" />
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-white/50">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "Rahul Mehta" },
                { id: "email", label: "Email Address", type: "email", placeholder: "rahul@company.com" },
                { id: "budget", label: "Project Budget", type: "text", placeholder: "₹5L – ₹10L" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    required
                    className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#FF6B00]/50 focus:bg-[#1A1A1A] transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project — what you're building, who it's for, and your timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#FF6B00]/50 focus:bg-[#1A1A1A] transition-all resize-none"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
