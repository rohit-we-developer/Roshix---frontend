"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Founder, TechVenture India",
    rating: 5,
    text: "Roshix delivered our SaaS platform in record time with exceptional quality. The team understood our vision from day one and brought it to life with precision. Highly recommended.",
  },
  {
    name: "Priya Sharma",
    role: "CEO, EduBloom",
    rating: 5,
    text: "The e-learning platform Roshix built for us handles thousands of concurrent users flawlessly. Their technical expertise and attention to UX details set them apart.",
  },
  {
    name: "Rahul Desai",
    role: "CTO, FinTrack Solutions",
    rating: 5,
    text: "Outstanding work on our trading analytics platform. The real-time features, AI integrations, and clean architecture exceeded our expectations.",
  },
  {
    name: "Sneha Kapoor",
    role: "Director, LuxeMart",
    rating: 5,
    text: "Roshix transformed our brick-and-mortar luxury store into a world-class digital experience. Sales increased by 40% within 3 months of launch.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#111111]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#FF6B00]/20 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-3">// Client Testimonials</span>
          <h2
            className="text-5xl md:text-7xl font-display"
            style={{ fontFamily: "var(--font-display)" }}
          >
            HAPPY <span className="gradient-text">CLIENTS</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-10 md:p-14 text-center"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={18} fill="#FF6B00" className="text-[#FF6B00]" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C33] flex items-center justify-center text-white font-bold text-lg">
                {testimonials[current].name[0]}
              </div>
              <div className="font-semibold text-white mt-2">{testimonials[current].name}</div>
              <div className="text-sm text-white/40">{testimonials[current].role}</div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#FF6B00] w-6" : "bg-white/20 w-1.5"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
