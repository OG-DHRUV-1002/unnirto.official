
"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, ArrowUpRight, Zap } from "lucide-react";
import UnnitroLogo from "@/components/UnnitroLogo";

const footerLinks = {
  Capabilities: [
    "Enterprise SaaS",
    "Agentic AI",
    "Cloud Architecture",
    "Legacy Migration",
    "Full-Stack Engineering",
    "DevOps & Platform",
  ],
  Ventures: [
    "MSD-LIMS",
    "Agentic Nexus",
    "Multi-Tenant Shield",
    "Core-LIMS API",
  ],
  Company: [
    "About Unnitro",
    "Leadership Board",
    "Methodology",
    "LinkedIn",
    "Engage Us",
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-bronze-400/10 bg-obsidian-950/80">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <UnnitroLogo size={44} />
              <div>
                <span className="text-white font-black text-2xl tracking-tight">
                  UNNIT
                  <span className="text-[#9E8A26]">RO</span>
                </span>
                <div className="text-[9px] text-gray-500 font-mono tracking-[0.2em] uppercase -mt-0.5">
                  Technology Holding Enterprise
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Engineering Digital Ecosystems. Unnitro incubates, launches, and
              scales enterprise-grade SaaS, AI workflows, and cloud
              infrastructure.
            </p>

            {/* Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-500 text-xs font-mono">
                All Systems Operational
              </span>
            </div>

            {/* Social */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/company/unnitro/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-bronze-400/20 hover:border-bronze-400/50 text-gray-400 hover:text-[#9E8A26] text-xs font-medium transition-all duration-200 rounded-sm"
              >
                <Linkedin size={13} />
                Follow on LinkedIn
                <ArrowUpRight size={11} />
              </a>
              <a
                href="https://www.instagram.com/unnitro.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-bronze-400/20 hover:border-bronze-400/50 text-gray-400 hover:text-[#9E8A26] text-xs font-medium transition-all duration-200 rounded-sm"
              >
                <Instagram size={13} />
                Follow on Instagram
                <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-[#9E8A26] text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="border-t border-bronze-400/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-black text-lg mb-1">
              Ready to architect your digital ecosystem?
            </div>
            <div className="text-gray-500 text-sm">
              Let&apos;s build something indestructible together.
            </div>
          </div>
          <a
            href="#trust"
            className="flex items-center gap-2 px-7 py-3.5 bg-bronze-400 hover:bg-bronze-300 text-obsidian-900 font-black text-sm tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-bronze-400/20 rounded-sm whitespace-nowrap"
          >
            <Zap size={14} />
            Engage Unnitro
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-gray-700 text-xs font-mono">
            © {new Date().getFullYear()} Unnitro. All rights reserved.
            Engineering Digital Ecosystems.
          </div>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "NDA Request"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-gray-500 text-xs transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Evolved from MSD_DevOps note */}
      <div className="max-w-7xl mx-auto px-6 pb-4 text-center">
        <span className="text-gray-800 text-[10px] font-mono">
          Evolved from MSD_DevOps • Built with the Advance Framework •
          10x Execution Standard
        </span>
      </div>
    </footer>
  );
}
