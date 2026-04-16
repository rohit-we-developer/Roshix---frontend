"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Zap, Globe, Code2 } from "lucide-react";
import { useRef } from "react";

const floatingBadges = [
  { icon: <Zap size={14} />, label: "Fast Delivery", x: "8%", y: "25%", delay: 0 },
  { icon: <Globe size={14} />, label: "Global Clients", x: "85%", y: "20%", delay: 0.3 },
  { icon: <Code2 size={14} />, label: "Clean Code", x: "88%", y: "65%", delay: 0.6 },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Radial gradient bg */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FF6B00]/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6B00]/3 blur-[80px]" />
      </div>

      {/* Animated rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute border border-[#FF6B00]/10 rounded-full"
            style={{
              width: `${i * 280}px`,
              height: `${i * 280}px`,
              top: `${-i * 140}px`,
              left: `${-i * 140}px`,
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Floating badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          className="absolute hidden lg:flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-full px-3 py-2 text-xs text-white/70"
          style={{ left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: badge.delay + 1, duration: 0.5 },
            scale: { delay: badge.delay + 1, duration: 0.5 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
          }}
        >
          <span className="text-[#FF6B00]">{badge.icon}</span>
          {badge.label}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="w-8 h-px bg-[#FF6B00]" />
          <span className="section-label">Roshix Solutions Pvt. Ltd.</span>
          <span className="w-8 h-px bg-[#FF6B00]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-[110px] leading-none font-display tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="block text-white">BUILD</span>
          <span className="block gradient-text text-glow">FASTER.</span>
          <span className="block text-white">SCALE</span>
          <span className="block gradient-text text-glow">SMARTER.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We craft world-class digital products — from enterprise SaaS to custom
          software — that transform your vision into revenue-generating reality.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-primary text-base px-8 py-4">
            View Our Work <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-outline text-base px-8 py-4">
            <Play size={14} fill="currentColor" /> Let's Talk
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-white/5"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "Happy Clients" },
            { value: "5★", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-white/30 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FF6B00] to-transparent" />
      </motion.div>
    </section>
  );
}
