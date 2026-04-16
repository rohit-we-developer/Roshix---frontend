"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary based on scope. A pre-built SaaS can be deployed in 2–4 weeks; custom enterprise platforms typically take 2–4 months. We provide a detailed timeline during the discovery phase.",
  },
  {
    q: "Do you provide the source code after delivery?",
    a: "Yes, absolutely. You receive full ownership of all source code, assets, and documentation upon project completion and final payment. No vendor lock-in.",
  },
  {
    q: "What is your development process?",
    a: "We follow an agile process: Discovery → Design → Development → QA → Launch → Support. You're involved at every stage with regular demos and check-ins.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. We offer flexible maintenance and support packages — from basic bug fixes to full managed DevOps. We're committed to your long-term success.",
  },
  {
    q: "What tech stack do you specialize in?",
    a: "Our core stack is Next.js, React, TypeScript, FastAPI/Node.js, PostgreSQL/Supabase, React Native, and Flutter. We also work with AWS, GCP, Docker, and Kubernetes for infrastructure.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We frequently integrate with client in-house teams, providing staff augmentation, code reviews, architecture consulting, or end-to-end development as needed.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-[#111111]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label block mb-3">// Got Questions?</span>
          <h2
            className="text-5xl md:text-6xl font-display"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FREQUENTLY ASKED
            <br />
            <span className="gradient-text">QUESTIONS</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-[#1A1A1A] border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#FF6B00]">
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
