"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Cloud, BarChart3, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: <Code2 size={28} />,
    title: "Custom Web Development",
    description:
      "Full-stack web applications built with Next.js, React, and modern backend architectures. From MVPs to enterprise systems.",
    tags: ["Next.js", "React", "Node.js", "FastAPI"],
  },
  {
    icon: <Smartphone size={28} />,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps using React Native and Flutter that deliver native-like performance on iOS & Android.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: <Cloud size={28} />,
    title: "SaaS Products",
    description:
      "End-to-end SaaS platforms with auth, billing, multi-tenancy, and analytics — ready to launch and scale.",
    tags: ["Supabase", "Stripe", "AWS", "Docker"],
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Data & Analytics",
    description:
      "Custom dashboards, business intelligence tools, and real-time analytics systems to make your data actionable.",
    tags: ["PostgreSQL", "Python", "Charts", "BI"],
  },
  {
    icon: <Shield size={28} />,
    title: "Security & DevOps",
    description:
      "CI/CD pipelines, cloud infrastructure, security audits, and performance optimization for production systems.",
    tags: ["CI/CD", "Kubernetes", "Security", "Monitoring"],
  },
  {
    icon: <Zap size={28} />,
    title: "AI Integration",
    description:
      "Embed AI capabilities into your products — chatbots, document analysis, intelligent automation, and more.",
    tags: ["OpenAI", "LangChain", "Embeddings", "AI"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="section-label block mb-3">// What We Do</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="text-5xl md:text-7xl font-display leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            OUR
            <br />
            <span className="gradient-text">SERVICES</span>
          </h2>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed md:text-right">
            We build digital solutions that are as powerful under the hood as they
            are beautiful on the surface.
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group bg-[#111111] border border-white/5 rounded-xl p-8 cursor-pointer relative overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#FF6B00]/5 to-transparent" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-6 group-hover:bg-[#FF6B00]/20 transition-colors">
              {service.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{service.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div className="absolute top-6 right-6 text-white/20 group-hover:text-[#FF6B00] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
