"use client";

import { motion } from "framer-motion";

const techStack1 = [
  "Next.js", "React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL",
  "Supabase", "AWS", "Docker", "Tailwind CSS", "React Native", "Flutter",
];

const techStack2 = [
  "Python", "GraphQL", "Redis", "Kubernetes", "Vercel", "Stripe", 
  "Figma", "MongoDB", "Firebase", "OpenAI", "Prisma", "tRPC",
];

function MarqueeItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-3 mx-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
      <span className="text-white/50 text-sm font-medium tracking-wider uppercase">
        {text}
      </span>
    </span>
  );
}

export default function MarqueeStrip() {
  return (
    <section className="py-12 overflow-hidden border-y border-white/5 bg-[#111111]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* Row 1 — left */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...techStack1, ...techStack1].map((t, i) => (
              <MarqueeItem key={i} text={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="marquee-container">
          <div className="marquee-track-reverse">
            {[...techStack2, ...techStack2].map((t, i) => (
              <MarqueeItem key={i} text={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
