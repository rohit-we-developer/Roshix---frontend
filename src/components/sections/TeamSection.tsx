"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";

const team = [
  { name: "Rahul Joshi", role: "Founder & CEO", initials: "RJ", color: "#FF6B00" },
  { name: "Sneha Patil", role: "Co-Founder & CTO", initials: "SP", color: "#FF8C33" },
  { name: "Amit Kulkarni", role: "Chief Operations", initials: "AK", color: "#FFB366" },
  { name: "Divya Nair", role: "Lead Designer", initials: "DN", color: "#FF6B00" },
  { name: "Karan Shah", role: "Full Stack Dev", initials: "KS", color: "#FF8C33" },
  { name: "Pooja Mehta", role: "Mobile Developer", initials: "PM", color: "#FFB366" },
  { name: "Nikhil Verma", role: "Backend Engineer", initials: "NV", color: "#FF6B00" },
  { name: "Ananya Rao", role: "Sales Head", initials: "AR", color: "#FF8C33" },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="section-label block mb-3">// Our People</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="text-5xl md:text-7xl font-display leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TEAM BEHIND
            <br />
            THE <span className="gradient-text">MAGIC</span>
          </h2>
          <p className="text-white/50 max-w-xs text-sm leading-relaxed">
            A passionate crew of designers, developers, and strategists — driven by craft.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="group bg-[#111111] border border-white/5 rounded-xl p-6 text-center relative overflow-hidden cursor-pointer"
          >
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
              style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}88)` }}
            >
              {member.initials}
            </div>

            <h3 className="font-semibold text-white text-sm mb-1">{member.name}</h3>
            <p className="text-white/40 text-xs mb-4">{member.role}</p>

            {/* Social links */}
            <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              {[Linkedin, Twitter, Github].map((Icon, j) => (
                <a
                  key={j}
                  href="#"
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-[#FF6B00] transition-colors"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${member.color}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
