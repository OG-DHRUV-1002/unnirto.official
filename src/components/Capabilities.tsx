
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Layers, Brain, Cloud, RefreshCw, Code2,
  Database, Server, Shield, ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: "saas",
    icon: Layers,
    label: "Enterprise SaaS",
    headline: "Multi-Tenant Platforms Built for Scale",
    description:
      "We architect cloud-native, multi-tenant SaaS platforms from the ground up. Every system is designed for the scale you'll need in 3 years, not just today. From schema design to production CI/CD, we own the full lifecycle.",
    points: [
      "Path-based & claim-based tenant isolation",
      "Zero-downtime blue-green deployments",
      "Automated billing & subscription engines",
      "Real-time analytics dashboards via SWR",
    ],
    stack: ["Next.js", "Firebase", "PostgreSQL", "SWR", "AWS Lambda"],
    accent: "bronze",
  },
  {
    id: "ai",
    icon: Brain,
    label: "Agentic AI",
    headline: "Autonomous Workflows That Replace Entire Teams",
    description:
      "We deploy intelligent agent systems using LangGraph state machines, CrewAI multi-agent crews, and n8n automation bridges. These aren't chatbots — they're autonomous systems that execute complex multi-step enterprise logic end-to-end.",
    points: [
      "LangGraph stateful agent pipelines",
      "CrewAI multi-agent orchestration",
      "n8n workflow automation bridges",
      "Gemini & Claude API integration",
    ],
    stack: ["LangGraph", "CrewAI", "n8n", "Gemini API", "Claude"],
    accent: "olive",
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud Architecture",
    headline: "Polyglot Infrastructure Engineered for Resilience",
    description:
      "We deploy on AWS Serverless with a polyglot database strategy — Firebase RTDB for real-time unstructured data, MongoDB for documents, and PostgreSQL for relational billing. The right database for each data domain.",
    points: [
      "AWS Lambda + API Gateway serverless",
      "Polyglot database architecture",
      "Hybrid Firebase + PostgreSQL strategy",
      "Auto-scaling with cost optimization",
    ],
    stack: ["AWS Lambda", "MongoDB", "PostgreSQL", "Firebase", "Docker"],
    accent: "bronze",
  },
  {
    id: "migration",
    icon: RefreshCw,
    label: "Legacy Migration",
    headline: "Surgical Modernization. Zero Data Loss.",
    description:
      "We extract legacy systems and re-architect them as cloud-native platforms. Our migration methodology ensures zero data loss, minimal business disruption, and a complete handover within the 30-Day Velocity Sprint framework.",
    points: [
      "Full system audit before migration",
      "Parallel-run validation strategy",
      "Data integrity verification at every step",
      "Cutover with rollback safety net",
    ],
    stack: ["CI/CD", "Docker", "Terraform", "PostgreSQL", "Next.js"],
    accent: "olive",
  },
  {
    id: "fullstack",
    icon: Code2,
    label: "Full-Stack Eng.",
    headline: "End-to-End Product Engineering at 10x Velocity",
    description:
      "From pixel-perfect UI to battle-hardened backend APIs. We use Next.js with SWR for zero-latency interfaces, Tailwind CSS for rapid UI systems, and the MERN stack for flexible backend logic. No hand-offs, no bottlenecks.",
    points: [
      "Next.js SSR with aggressive SWR caching",
      "Tailwind CSS component systems",
      "RESTful & GraphQL API design",
      "End-to-end TypeScript type safety",
    ],
    stack: ["React", "Next.js", "Tailwind", "Node.js", "TypeScript"],
    accent: "bronze",
  },
  {
    id: "devops",
    icon: Server,
    label: "DevOps & Platform",
    headline: "The Advance Framework - Frictionless Deployments",
    description:
      "We run the Advance Framework: automated CI/CD, containerized deployments, and zero-maintenance-window releases. Blameless post-mortems treat every incident as a data point, not a blame game.",
    points: [
      "Zero-downtime deployment pipelines",
      "Container orchestration with Docker",
      "Automated testing & coverage gates",
      "Blameless incident post-mortems",
    ],
    stack: ["GitHub Actions", "Docker", "AWS", "Vercel", "Monitoring"],
    accent: "olive",
  },
];

const accentConfig = {
  bronze: {
    active: "border-bronze-400/40 bg-bronze-400/5",
    inactive: "border-gray-800/50 hover:border-bronze-400/20",
    tag: "bg-bronze-400/10 text-[#9E8A26] border-bronze-400/20",
    bullet: "bg-bronze-400",
    icon: "text-[#9E8A26] bg-bronze-400/10",
    bar: "bg-bronze-400",
  },
  olive: {
    active: "border-olive-500/40 bg-olive-500/5",
    inactive: "border-gray-800/50 hover:border-olive-500/20",
    tag: "bg-olive-500/10 text-olive-400 border-olive-500/20",
    bullet: "bg-olive-400",
    icon: "text-olive-400 bg-olive-500/10",
    bar: "bg-olive-500",
  },
};

export default function Capabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("saas");

  const activeItem = categories.find((c) => c.id === active)!;
  const cfg = accentConfig[activeItem.accent as keyof typeof accentConfig];

  return (
    <section id="capabilities" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-bronze-400" />
            <span className="text-[#9E8A26] text-xs font-mono tracking-widest uppercase">Core Capabilities</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              The Engineering <span className="text-[#9E8A26]">Matrix</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-sm md:text-right">
              Six domains of technical mastery unified under one command architecture.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tab list */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-2"
          >
            {categories.map((cat) => {
              const c = accentConfig[cat.accent as keyof typeof accentConfig];
              const isActive = active === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  onClick={() => setActive(cat.id)}
                  className={`w-full text-left p-4 rounded-sm transition-all duration-300 group flex items-start gap-4 ${
                    isActive
                      ? "glass-card border border-[#9E8A26]/20 shadow-[0_0_30px_-5px_rgba(158,138,38,0.1)]"
                      : "hover:bg-obsidian-800/50 hover:scale-[1.01] hover:border-[#9E8A26]/30 hover:shadow-[0_0_30px_-5px_rgba(158,138,38,0.2)]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-sm flex items-center justify-center shrink-0 transition-all ${
                    isActive ? c.icon : "text-gray-500 bg-obsidian-800/50"
                  }`}>
                    <cat.icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold transition-colors truncate ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                    }`}>
                      {cat.label}
                    </div>
                  </div>
                  {isActive && (
                    <div className={`ml-auto w-1 h-8 rounded-full shrink-0 ${c.bar}`} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={`h-full glass-card rounded-sm border p-8 ${cfg.active}`}
              >
                {/* Icon + headline */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 ${cfg.icon}`}>
                    <activeItem.icon size={22} />
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${cfg.icon.split(" ")[0]}`}>
                      {activeItem.label}
                    </div>
                    <h3 className="text-white font-black text-xl leading-tight">
                      {activeItem.headline}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {activeItem.description}
                </p>

                {/* Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {activeItem.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${cfg.bullet}`} />
                      <span className="text-gray-300 text-xs leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeItem.stack.map((s, i) => (
                    <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full border font-mono ${cfg.tag}`}>{s}</span>
                  ))}
                </div>

                <a href="#trust" className={`inline-flex items-center gap-2 text-xs font-mono group ${cfg.icon.split(" ")[0]} hover:gap-3 transition-all`}>
                  Discuss this capability <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
