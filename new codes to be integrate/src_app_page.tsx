
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Capabilities from "@/components/Capabilities";
import Ventures from "@/components/Ventures";
import TechStack from "@/components/TechStack";
import Accelerators from "@/components/Accelerators";
import VelocitySprint from "@/components/VelocitySprint";
import LeadershipBoard from "@/components/LeadershipBoard";
import TrustFilter from "@/components/TrustFilter";
import Footer from "@/components/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian-900 overflow-x-hidden">
      <ParticleCanvas />
      <div className="scanline" />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Capabilities />
      <Ventures />
      <TechStack />
      <Accelerators />
      <VelocitySprint />
      <LeadershipBoard />
      <TrustFilter />
      <Footer />
    </main>
  );
}
