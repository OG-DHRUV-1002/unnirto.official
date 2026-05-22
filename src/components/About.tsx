"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Cpu, Brain, Users } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-28 px-6 bg-obsidian-900/40">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-16"
        >
          {/* Overview */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent-400" />
              <h2 className="text-[#9E8A26] text-xs font-mono tracking-widest uppercase">
                Overview: Engineering Digital Ecosystems
              </h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
              Unnitro is a premier technology holding enterprise and venture builder.
            </h3>
            <p className="text-steel-400 text-base leading-relaxed">
              We operate as the central command architecture for a rapidly expanding portfolio of SaaS products, specialized startups, and high-performance digital platforms. We don&apos;t just build software—we incubate, launch, and scale independent, disruptive technology ventures entirely under the Unnitro umbrella.
            </p>
          </div>

          <div className="border-t border-accent-400/10" />

          {/* Venture Studio Framework */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Rocket size={18} className="text-[#9E8A26]" />
              <h3 className="text-xl font-bold text-white">The Venture Studio Framework</h3>
            </div>
            <p className="text-steel-400 text-base leading-relaxed">
              Our core philosophy: centralized engineering excellence powering decentralized ventures. We provide the foundational cloud infrastructure and strict operational frameworks that allow our subsidiary companies to scale. Built on an internal engineering culture of &quot;10x Execution&quot; and &quot;Decoupling Failure,&quot; we treat setbacks as data points, running rapid blameless post-mortems to patch issues and maintain momentum.
            </p>
          </div>

          {/* Portfolio Highlight */}
          <div className="glass-card rounded-sm border border-accent-400/20 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-400 to-transparent" />
            <div className="flex items-center gap-3 mb-6">
              <Cpu size={18} className="text-[#9E8A26]" />
              <h3 className="text-xl font-bold text-white">Portfolio Highlight: High-Stakes Environments</h3>
            </div>
            <p className="text-steel-400 text-base leading-relaxed">
              Our capability to build at scale is proven by our flagship execution: MSD-LIMS. Spearheading the digital transformation of Navi Mumbai&apos;s diagnostic sector, we executed a high-stakes 18-day sprint to architect a multi-tenant SaaS solution. Powering operations for Dr. Bhonsle&apos;s Laboratory, MegaScan Imaging Centre, and Niriksha Laboratory, it handles highly sensitive patient data and automated billing with absolute zero downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Engineering Stack */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Brain size={18} className="text-[#9E8A26]" />
                <h3 className="text-xl font-bold text-white">Parent-Level Engineering Stack</h3>
              </div>
              <p className="text-steel-400 text-sm leading-relaxed mb-4">
                Our core competencies drive every venture we launch:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0 mt-1.5" />
                  <span className="text-steel-300 text-sm"><strong className="text-white">Venture Incubation:</strong> Bridging the gap from &quot;Idea&quot; to &quot;Enterprise Scale.&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0 mt-1.5" />
                  <span className="text-steel-300 text-sm"><strong className="text-white">Cloud &amp; Backend:</strong> Secure, high-load serverless deployments (AWS, Firebase, PostgreSQL, MongoDB).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0 mt-1.5" />
                  <span className="text-steel-300 text-sm"><strong className="text-white">AI Orchestration:</strong> Integrating LLMs, LangGraph, and CrewAI to automate complex workflows.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0 mt-1.5" />
                  <span className="text-steel-300 text-sm"><strong className="text-white">Product Execution:</strong> Scalable MERN/Next.js architectures.</span>
                </li>
              </ul>
            </div>

            {/* Leadership Board */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users size={18} className="text-[#9E8A26]" />
                <h3 className="text-xl font-bold text-white">Core Leadership Board</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "Dhruv Jagannath Hadal", role: "Founder, CEO & Chief Architect" },
                  { name: "Manan Bhanushali", role: "Co-Founder & CTO" },
                  { name: "Sushil Bhonsle", role: "Co-Founder & CPO" },
                  { name: "Shyam Parmar", role: "Co-Founder & CDO" }
                ].map((leader, i) => (
                  <li key={i} className="glass-card border border-steel-600/20 p-4 flex flex-col justify-center rounded-sm">
                    <span className="text-white font-bold text-sm mb-1">{leader.name}</span>
                    <span className="text-[#9E8A26] text-xs font-mono">{leader.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
