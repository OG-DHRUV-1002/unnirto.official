
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Package, Lock, Bot, ArrowRight } from "lucide-react";

const accelerators = [
  {
    icon: Lock,
    name: "Multi-Tenant Shield",
    type: "Codebase Asset",
    description:
      "Production-hardened multi-tenant isolation architecture. Path-based Firebase RTDB security rules with V2 upgrade path to Firestore Custom Auth Claims. Drops weeks of architecture decisions.",
    features: [
      "Path-based tenant isolation",
      "Custom Auth Claims V2",
      "Role-based access control",
      "SSR hydration-safe auth",
    ],
    status: "Internal Asset",
    lines: "~4,200 LOC",
  },
  {
    icon: Package,
    name: "Core-LIMS API",
    type: "Domain API",
    description:
      "Battle-tested healthcare data layer powering 3 production tenants. Patient management, automated billing, test records, and multi-lab analytics baked in from day one.",
    features: [
      "Multi-tenant patient records",
      "Automated billing engine",
      "Real-time analytics",
      "RTDB + PostgreSQL bridge",
    ],
    status: "Production Proven",
    lines: "~8,700 LOC",
  },
  {
    icon: Bot,
    name: "Agentic Nexus",
    type: "AI Orchestration",
    description:
      "Pre-wired LangGraph + CrewAI + n8n orchestration stack. Drop in business logic and deploy autonomous AI agents that handle complex multi-step enterprise workflows.",
    features: [
      "LangGraph state machines",
      "CrewAI agent crews",
      "n8n automation bridges",
      "Gemini + Claude adapters",
    ],
    status: "In Development",
    lines: "~2,100 LOC",
  },
];

export default function Accelerators() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="accelerators" className="relative py-28 px-6">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-radial from-olive-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-olive-400" />
            <span className="text-olive-400 text-xs font-mono tracking-widest uppercase">
              Proprietary Accelerators
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Unfair
            <span className="text-olive-400"> Advantages</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Years of production battles compressed into reusable codebase
            assets. These are the weapons we deploy on every engagement.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accelerators.map((acc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-sm border border-olive-500/15 hover:border-olive-500/40 transition-all duration-300 overflow-hidden group hover:shadow-xl hover:shadow-olive-500/5"
            >
              {/* Top bar */}
              <div className="h-0.5 bg-gradient-to-r from-olive-500 to-bronze-400" />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-sm bg-olive-500/10 border border-olive-500/20 flex items-center justify-center">
                    <acc.icon size={22} className="text-olive-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-mono">
                      {acc.lines}
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        acc.status === "Production Proven"
                          ? "text-green-400 bg-green-400/10 border-green-400/20"
                          : acc.status === "In Development"
                          ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                          : "text-[#9E8A26] bg-bronze-400/10 border-bronze-400/20"
                      }`}
                    >
                      {acc.status}
                    </span>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-1">
                    {acc.type}
                  </div>
                  <h3 className="text-xl font-black text-white">{acc.name}</h3>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  {acc.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {acc.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-olive-400 shrink-0" />
                      <span className="text-gray-400 text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-olive-500/20 text-olive-400 text-xs font-mono tracking-widest hover:bg-olive-500/10 transition-all duration-200 rounded-sm group-hover:border-olive-500/40">
                  View Architecture
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 glass-card rounded-sm border border-bronze-400/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <div className="text-white font-bold text-base mb-1">
              Custom Accelerators on Request
            </div>
            <div className="text-gray-500 text-sm">
              We build proprietary tooling tailored to your specific domain.
              Every engagement generates permanent IP.
            </div>
          </div>
          <a
            href="#trust"
            className="flex items-center gap-2 px-6 py-3 bg-bronze-400/10 border border-bronze-400/30 text-[#9E8A26] text-sm font-bold hover:bg-bronze-400/20 transition-all duration-200 rounded-sm whitespace-nowrap"
          >
            Start a Conversation
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
