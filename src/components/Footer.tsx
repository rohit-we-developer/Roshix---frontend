"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Github, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Team", "Careers", "Blog"],
  Services: ["Web Development", "Mobile Apps", "SaaS Products", "AI Integration"],
  Connect: ["Contact", "Projects", "Testimonials", "FAQ"],
};

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/Roshix logo-2.jpg"
              alt="Roshix Solutions"
              width={160}
              height={50}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Building world-class digital products that scale. Headquartered in Pune, serving clients globally.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-[#FF6B00]/20 rounded-2xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FF6B00]/5"
        >
          <div>
            <h3
              className="text-3xl md:text-4xl font-display mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              READY TO <span className="gradient-text">BUILD?</span>
            </h3>
            <p className="text-white/50 text-sm">Let's turn your idea into a product.</p>
          </div>
          <a href="#contact" className="btn-primary whitespace-nowrap">
            Start a Project →
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25 border-t border-white/5 pt-8">
          <span>© {new Date().getFullYear()} Roshix Solutions Pvt. Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <Link href="/admin-dashboard" className="hover:text-white/60 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
