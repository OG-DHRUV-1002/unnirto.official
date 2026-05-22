
"use client";

import { motion } from "framer-motion";
import { Linkedin, ArrowUpRight, Zap } from "lucide-react";

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
              <div className="relative w-10 h-10">
                <div className="hex-clip w-full h-full bg-gradient-to-br from-bronze-400 to-olive-500 flex items-center justify-center">
                  <span className="text-obsidian-900 font-black text-sm">
                    UN
                  </span>
                </div>
              </div>
              <div>
                <span className="text-white font-black text-2xl tracking-tight">
                  UNNIT
                  <span className="text-bronze-400">RO</span>
                </span>
                <div className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase -mt-0.5">
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
              <span className="text-gray-600 text-xs font-mono">
                All Systems Operational
              </span>
            </div>

            {/* Social */}
            <a
              href="https://www.linkedin.com/company/unnitro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-bronze-400/20 hover:border-bronze-400/50 text-gray-400 hover:text-bronze-400 text-xs font-medium transition-all duration-200 rounded-sm"
            >
              <Linkedin size={13} />
              Follow on LinkedIn
              <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-bronze-400 text-sm transition-colors duration-200"
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
          Evolved from MSD_DevOps · Built with the Antigravity Framework ·
          10x Execution Standard
        </span>
      </div>
    </footer>
  );
}
