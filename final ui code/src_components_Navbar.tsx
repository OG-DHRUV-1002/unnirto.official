
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Zap, ChevronDown, Layers, Brain, Cloud,
  RefreshCw, Code2, Database, Server, Shield,
  Package, Lock, Bot, ArrowRight, Linkedin,
} from "lucide-react";

const solutionsMenu = [
  { icon: Layers, title: "Enterprise SaaS", desc: "Multi-tenant cloud platforms", href: "#capabilities" },
  { icon: Brain, title: "Agentic AI", desc: "Autonomous workflow orchestration", href: "#capabilities" },
  { icon: Cloud, title: "Cloud Infrastructure", desc: "AWS serverless architecture", href: "#capabilities" },
  { icon: RefreshCw, title: "Legacy Migration", desc: "Modernize existing systems", href: "#capabilities" },
  { icon: Code2, title: "Full-Stack Engineering", desc: "End-to-end product builds", href: "#capabilities" },
  { icon: Database, title: "Data Architecture", desc: "Pipelines & analytics", href: "#capabilities" },
  { icon: Server, title: "DevOps & Platform", desc: "Antigravity deployments", href: "#capabilities" },
  { icon: Shield, title: "Security Engineering", desc: "RBAC, SSO & compliance", href: "#capabilities" },
];

const venturesMenu = [
  { title: "MSD-LIMS", desc: "Cloud-native laboratory management", status: "Live", href: "#ventures" },
  { title: "Agentic Nexus", desc: "Enterprise AI orchestration platform", status: "Dev", href: "#ventures" },
  { title: "Multi-Tenant Shield", desc: "SaaS isolation boilerplate", status: "Internal", href: "#accelerators" },
  { title: "Core-LIMS API", desc: "Healthcare data REST layer", status: "Design", href: "#accelerators" },
];

const navLinks = [
  { label: "Methodology", href: "#methodology" },
  { label: "Leadership", href: "#leadership" },
];

const statusColor: Record<string, string> = {
  Live: "text-green-400 bg-green-400/10 border-green-400/20",
  Dev: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Internal: "text-bronze-400 bg-bronze-400/10 border-bronze-400/20",
  Design: "text-blue-400 bg-blue-400/10 border-blue-400/20",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur bg-obsidian-900/85 border-b border-bronze-400/10 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative" ref={dropdownRef}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 hex-clip bg-gradient-to-br from-bronze-400 to-olive-500 flex items-center justify-center">
            <span className="text-obsidian-900 font-black text-sm">UN</span>
          </div>
          <div>
            <span className="text-white font-black text-xl tracking-tight">UNNIT<span className="text-bronze-400">RO</span></span>
            <div className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase -mt-0.5">Enterprise</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("solutions")}
            onMouseLeave={closeDropdown}
          >
            <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-sm transition-colors ${activeDropdown === "solutions" ? "text-bronze-400" : "text-gray-400 hover:text-white"}`}>
              Solutions
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180 text-bronze-400" : ""}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => openDropdown("solutions")}
                  onMouseLeave={closeDropdown}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] glass-card border border-bronze-400/15 rounded-sm shadow-2xl shadow-black/60 overflow-hidden"
                >
                  <div className="p-2 grid grid-cols-2 gap-1">
                    {solutionsMenu.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 p-3 rounded-sm hover:bg-bronze-400/8 group/item transition-all duration-150"
                      >
                        <div className="w-8 h-8 rounded-sm bg-bronze-400/10 flex items-center justify-center shrink-0 group-hover/item:bg-bronze-400/20 transition-colors">
                          <item.icon size={15} className="text-bronze-400" />
                        </div>
                        <div>
                          <div className="text-white text-xs font-semibold group-hover/item:text-bronze-400 transition-colors">{item.title}</div>
                          <div className="text-gray-600 text-[10px]">{item.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-bronze-400/10 px-4 py-3 bg-obsidian-900/50 flex items-center justify-between">
                    <span className="text-gray-600 text-[10px] font-mono">8 CORE CAPABILITIES</span>
                    <a href="#capabilities" onClick={() => setActiveDropdown(null)} className="text-bronze-400 text-[10px] font-mono flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ArrowRight size={10} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ventures Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("ventures")}
            onMouseLeave={closeDropdown}
          >
            <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-sm transition-colors ${activeDropdown === "ventures" ? "text-bronze-400" : "text-gray-400 hover:text-white"}`}>
              Ventures
              <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "ventures" ? "rotate-180 text-bronze-400" : ""}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === "ventures" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={() => openDropdown("ventures")}
                  onMouseLeave={closeDropdown}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[360px] glass-card border border-bronze-400/15 rounded-sm shadow-2xl shadow-black/60 overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    {venturesMenu.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between p-3 rounded-sm hover:bg-bronze-400/8 group/item transition-all duration-150"
                      >
                        <div>
                          <div className="text-white text-xs font-semibold group-hover/item:text-bronze-400 transition-colors">{item.title}</div>
                          <div className="text-gray-600 text-[10px]">{item.desc}</div>
                        </div>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${statusColor[item.status]}`}>{item.status}</span>
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-bronze-400/10 px-4 py-3 bg-obsidian-900/50 flex items-center justify-between">
                    <span className="text-gray-600 text-[10px] font-mono">PORTFOLIO DEPLOYMENTS</span>
                    <a href="#ventures" onClick={() => setActiveDropdown(null)} className="text-bronze-400 text-[10px] font-mono flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ArrowRight size={10} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="px-4 py-2 text-sm text-gray-400 hover:text-white font-medium transition-colors rounded-sm">
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://www.linkedin.com/company/unnitro/" target="_blank" rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-bronze-400 transition-colors">
            <Linkedin size={16} />
          </a>
          <a href="#trust"
            className="flex items-center gap-2 px-5 py-2.5 bg-bronze-400 hover:bg-bronze-300 text-obsidian-900 text-sm font-black rounded-sm transition-all duration-200 hover:shadow-lg hover:shadow-bronze-400/25">
            <Zap size={13} />
            Engage Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-400 hover:text-white transition-colors">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-obsidian-900/95 nav-blur border-b border-bronze-400/10 overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              <div className="text-[10px] font-mono text-gray-700 uppercase tracking-widest mb-3">Solutions</div>
              {solutionsMenu.slice(0, 4).map((item, i) => (
                <a key={i} href={item.href} onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 text-gray-400 hover:text-bronze-400 transition-colors">
                  <item.icon size={14} />
                  <span className="text-sm">{item.title}</span>
                </a>
              ))}
              <div className="border-t border-gray-800/50 my-3" />
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-gray-400 hover:text-white text-sm transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="#trust" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 mt-4 py-3 bg-bronze-400 text-obsidian-900 text-sm font-black rounded-sm">
                <Zap size={14} /> Engage Unnitro
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
