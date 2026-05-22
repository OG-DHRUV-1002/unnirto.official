
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Ventures from "@/components/Ventures";
import Accelerators from "@/components/Accelerators";
import VelocitySprint from "@/components/VelocitySprint";
import TrustFilter from "@/components/TrustFilter";
import Footer from "@/components/Footer";
import TechVentureBackground from "@/components/TechVentureBackground";

export default function Home() {
  return (
    // The "dark" class forces Tailwind's dark: modifiers for all children
    <div className="dark">
      <main className="relative min-h-screen text-gray-100 overflow-x-hidden">
        {/* Heavy Tech & Venture Background System */}
        <TechVentureBackground />
        
        {/* Subtle Breathing Glow overlay for extra elegance */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-breathing-glow z-[-10]" />
        
        <div className="scanline" />
        <Navbar />
        <Hero />
        <MarqueeStrip />
        <About />
        <Capabilities />
        <Ventures />
        <Accelerators />
        <VelocitySprint />
        <TrustFilter />
        <Footer />
      </main>
    </div>
  );
}

