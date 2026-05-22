
"use client";

const items = [
  "Enterprise SaaS Architecture",
  "Agentic AI Orchestration",
  "Multi-Tenant Systems",
  "60-Day Velocity Sprint",
  "Zero Downtime Deployments",
  "LangGraph Workflows",
  "Cloud-Native Infrastructure",
  "10x Execution Standard",
  "Antigravity Framework",
  "Firebase · MongoDB · PostgreSQL",
  "Next.js · React · Tailwind",
  "AWS Serverless",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];
  return (
    <div className="relative py-4 border-y border-bronze-400/10 bg-obsidian-950/60 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian-950/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian-950/60 to-transparent z-10 pointer-events-none" />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-8 shrink-0">
            <span className="text-gray-600 text-xs font-mono uppercase tracking-wider whitespace-nowrap">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-bronze-400/40 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
