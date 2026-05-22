
"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Search, Cpu, FlaskConical, Rocket, BarChart3 } from "lucide-react";

const phases = [
  {
    number: "01",
    days: "Day 1–3",
    icon: Search,
    title: "Audit & Blueprint",
    description:
      "Deep-dive technical discovery. Audit existing systems, map data flows, identify critical bottlenecks, and draft the master architecture blueprint.",
    deliverables: ["Technical Audit Report", "Architecture Blueprint", "Risk Register", "Sprint Roadmap"],
  },
  {
    number: "02",
    days: "Day 4–10",
    icon: Cpu,
    title: "Core Infrastructure",
    description:
      "Foundation layer deployment. Cloud environment provisioning, database schemas, authentication systems, and CI/CD pipeline establishment.",
    deliverables: ["Cloud Environment", "DB Schema", "Auth System", "CI/CD Pipeline"],
  },
  {
    number: "03",
    days: "Day 11–20",
    icon: FlaskConical,
    title: "Product Engineering",
    description:
      "Full-stack feature development. Frontend interfaces, backend APIs, AI integrations, and business logic implementation at maximum velocity.",
    deliverables: ["Frontend UI", "Backend APIs", "AI Integrations", "Business Logic"],
  },
  {
    number: "04",
    days: "Day 21–27",
    icon: Rocket,
    title: "QA & Hardening",
    description:
      "Rigorous quality assurance, load testing, security hardening, and performance optimization before production release.",
    deliverables: ["QA Test Suite", "Load Tests", "Security Audit", "Performance Optimization"],
  },
  {
    number: "05",
    days: "Day 28–30",
    icon: BarChart3,
    title: "Launch & Handover",
    description:
      "Zero-downtime production deployment, client onboarding, documentation delivery, and 30-day post-launch support activation.",
    deliverables: ["Production Deploy", "Client Onboarding", "Full Docs", "30-Day Support"],
  },
];

export default function VelocitySprint() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="methodology" className="relative py-28 px-6 bg-obsidian-800/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-bronze-400" />
            <span className="text-[#9E8A26] text-xs font-mono tracking-widest uppercase">
              Operational Framework
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            The 30-Day
            <span className="text-[#9E8A26]"> Velocity Sprint</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Five precision phases. Thirty days. Enterprise-grade digital
            transformation delivered without compromise.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-gray-800 z-0 overflow-hidden">
            <motion.div 
              style={{ scaleX, transformOrigin: "left" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#9E8A26] to-[#9E8A26]" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-card rounded-sm border border-bronze-400/10 hover:border-bronze-400/30 transition-all duration-300 overflow-hidden group"
              >
                {/* Phase number header */}
                <div className="p-4 border-b border-bronze-400/10 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-bronze-400/30 group-hover:border-bronze-400/60 flex items-center justify-center bg-obsidian-900 transition-all duration-300">
                      <phase.icon size={16} className="text-[#9E8A26]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                      Phase {phase.number}
                    </div>
                    <div className="text-[10px] font-mono text-[#9E8A26]/70">
                      {phase.days}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-1.5">
                    {phase.deliverables.map((d, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-bronze-400/50 shrink-0" />
                        <span className="text-gray-500 text-[10px] font-mono">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom guarantee strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: "Blameless Post-Mortems", desc: "Failures are data points, never blame games." },
            { label: "Antigravity Deployments", desc: "Zero-downtime releases. No maintenance windows." },
            { label: "10x Execution Standard", desc: "We refuse baseline. Every output is enterprise-grade." },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-sm bg-obsidian-800/40 border border-gray-800/50"
            >
              <div className="w-2 h-2 rounded-full bg-bronze-400 shrink-0 mt-1.5" />
              <div>
                <div className="text-white text-xs font-bold mb-0.5">
                  {item.label}
                </div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
