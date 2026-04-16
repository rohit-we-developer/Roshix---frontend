import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <StatsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
