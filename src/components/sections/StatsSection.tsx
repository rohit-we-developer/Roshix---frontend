"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered", description: "Across web, mobile & SaaS" },
  { value: 30, suffix: "+", label: "Happy Clients", description: "From startups to enterprises" },
  { value: 5, suffix: "★", label: "Avg. Rating", description: "Consistently top-rated" },
  { value: 3, suffix: "yrs", label: "In Business", description: "Growing every year" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/5 via-transparent to-[#FF6B00]/5" />
      <div className="absolute inset-0 border-y border-[#FF6B00]/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">// By The Numbers</span>
          <h2
            className="text-4xl md:text-6xl font-display mt-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            RESULTS THAT <span className="gradient-text">SPEAK</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-lg mb-1">{stat.label}</div>
              <div className="text-white/40 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
