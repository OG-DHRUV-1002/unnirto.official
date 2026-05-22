
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stackLayers = [
  {
    layer: "Frontend & Edge",
    color: "bronze",
    items: [
      { name: "Next.js", role: "SSR Framework", level: 98 },
      { name: "React", role: "UI Library", level: 98 },
      { name: "Tailwind CSS", role: "Styling", level: 95 },
      { name: "SWR", role: "Data Fetching", level: 92 },
      { name: "Framer Motion", role: "Animations", level: 88 },
      { name: "TypeScript", role: "Type Safety", level: 90 },
    ],
  },
  {
    layer: "Backend & APIs",
    color: "olive",
    items: [
      { name: "Node.js", role: "Runtime", level: 96 },
      { name: "Express", role: "API Layer", level: 94 },
      { name: "REST / GraphQL", role: "API Design", level: 92 },
      { name: "Firebase Admin", role: "Server SDK", level: 90 },
      { name: "JWT / OAuth", role: "Auth", level: 93 },
      { name: "WebSockets", role: "Real-time", level: 85 },
    ],
  },
  {
    layer: "Data & Cloud",
    color: "bronze",
    items: [
      { name: "PostgreSQL", role: "Relational DB", level: 94 },
      { name: "Firebase RTDB", role: "Real-time DB", level: 96 },
      { name: "MongoDB", role: "Document DB", level: 91 },
      { name: "AWS Lambda", role: "Serverless", level: 89 },
      { name: "AWS S3", role: "Storage", level: 92 },
      { name: "Firestore", role: "NoSQL DB", level: 90 },
    ],
  },
  {
    layer: "AI & Automation",
    color: "olive",
    items: [
      { name: "LangGraph", role: "Agent Orchestration", level: 88 },
      { name: "CrewAI", role: "Multi-Agent", level: 85 },
      { name: "n8n", role: "Automation", level: 90 },
      { name: "Gemini API", role: "LLM", level: 92 },
      { name: "Claude API", role: "LLM", level: 91 },
      { name: "OpenAI", role: "LLM", level: 89 },
    ],
  },
];

const colorMap = {
  bronze: { bar: "bg-bronze-400", label: "text-bronze-400", border: "border-bronze-400/20", bg: "bg-bronze-400/5" },
  olive: { bar: "bg-olive-400", label: "text-olive-400", border: "border-olive-500/20", bg: "bg-olive-500/5" },
};

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="relative py-28 px-6 bg-obsidian-800/20">
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
            <div className="h-px w-12 bg-olive-400" />
            <span className="text-olive-400 text-xs font-mono tracking-widest uppercase">Engine Room</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              The Technical <span className="text-olive-400">Arsenal</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-sm md:text-right">
              Production-proven. Battle-tested. Chosen for maximum enterprise output.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stackLayers.map((layer, li) => {
            const c = colorMap[layer.color as keyof typeof colorMap];
            return (
              <motion.div
                key={li}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: li * 0.1 }}
                className={`glass-card rounded-sm border p-6 ${c.border}`}
              >
                <div className={`text-[10px] font-mono uppercase tracking-widest mb-5 ${c.label}`}>
                  {layer.layer}
                </div>
                <div className="space-y-4">
                  {layer.items.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-xs font-semibold">{item.name}</span>
                          <span className="text-gray-600 text-[10px] font-mono">{item.role}</span>
                        </div>
                        <span className={`text-[10px] font-mono ${c.label}`}>{item.level}%</span>
                      </div>
                      <div className="h-0.5 bg-gray-800/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${item.level}%` } : {}}
                          transition={{ duration: 1, delay: li * 0.1 + i * 0.06, ease: "easeOut" }}
                          className={`h-full rounded-full ${c.bar}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-6 glass-card rounded-sm border border-bronze-400/10 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex-1">
            <div className="text-white font-black text-base mb-1">Polyglot by Design. Pragmatic by Default.</div>
            <div className="text-gray-500 text-sm">
              We choose the right tool for each domain — not the fashionable one. Every stack decision is backed by production proof, not hype.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {["Firebase", "AWS", "Vercel"].map((t, i) => (
              <div key={i} className="px-3 py-1.5 rounded-sm border border