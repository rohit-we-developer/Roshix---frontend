"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

const categories = ["All", "Web", "Mobile", "SaaS", "E-commerce"];

const projects = [
  {
    title: "TradePulse Analytics",
    category: "SaaS",
    description: "Real-time trading journal platform with AI-backed analytics and portfolio tracking.",
    tech: ["Next.js", "FastAPI", "Supabase", "Python"],
    color: "#FF6B00",
    href: "#",
  },
  {
    title: "LuxeMart E-commerce",
    category: "E-commerce",
    description: "Premium luxury goods platform with advanced filtering, AR preview, and global payments.",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    color: "#FF8C33",
    href: "#",
  },
  {
    title: "MediLink Health",
    category: "SaaS",
    description: "Hospital management SaaS with patient records, billing, and appointment scheduling.",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#FFB366",
    href: "#",
  },
  {
    title: "FleetTrack Mobile",
    category: "Mobile",
    description: "Fleet management mobile app with real-time GPS, route optimization, and driver scoring.",
    tech: ["React Native", "Firebase", "Maps API"],
    color: "#FF6B00",
    href: "#",
  },
  {
    title: "Bloom Education Portal",
    category: "Web",
    description: "E-learning platform with live classes, assessments, certificates, and student analytics.",
    tech: ["Next.js", "Supabase", "WebRTC"],
    color: "#FF8C33",
    href: "#",
  },
  {
    title: "GreenCart Sustainable",
    category: "E-commerce",
    description: "Eco-friendly marketplace with carbon footprint tracking and sustainable brand vetting.",
    tech: ["Next.js", "Shopify API", "AWS"],
    color: "#FFB366",
    href: "#",
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="section-label block mb-3">// Our Portfolio</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="text-5xl md:text-7xl font-display leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TURNING VISION
            <br />
            INTO <span className="gradient-text">REALITY</span>
          </h2>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex gap-2 flex-wrap mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-[#FF6B00] text-white"
                : "bg-[#1A1A1A] text-white/50 border border-white/5 hover:border-[#FF6B00]/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative bg-[#111111] border border-white/5 rounded-xl overflow-hidden block"
            >
              {/* Color band */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }}
              />

              {/* Card visual */}
              <div
                className="h-48 relative flex items-center justify-center overflow-hidden"
                style={{ background: `${project.color}08` }}
              >
                <div
                  className="text-8xl font-display opacity-10 select-none"
                  style={{ color: project.color, fontFamily: "var(--font-display)" }}
                >
                  {project.title.substring(0, 2).toUpperCase()}
                </div>

                {/* Hover icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${project.color}40`,
                      color: project.color,
                      background: `${project.color}10`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-white/30 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <a href="#contact" className="btn-outline">
          Start Your Project →
        </a>
      </motion.div>
    </section>
  );
}
