
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, ExternalLink } from "lucide-react";

const leaders = [
  {
    name: "Dhruv Jagannath Hadal",
    initials: "DH",
    role: "Founder & CEO",
    subtitle: "Chief Architect",
    domain: "Enterprise Strategy & Overarching System Architecture",
    description:
      "Visionary behind the Unnitro enterprise blueprint. Architects the overarching digital ecosystem strategy, drives 10x execution culture, and leads enterprise client relationships.",
    tags: ["Enterprise Strategy", "System Architecture", "Venture Studio"],
    accent: "bronze",
  },
  {
    name: "Manan Bhanushali",
    initials: "MB",
    role: "Co-Founder & CTO",
    subtitle: "Chief Technology Officer",
    domain: "Core Infrastructure, Cloud & Backend Logic",
    description:
      "Owns the technical heartbeat of Unnitro. Masters cloud infrastructure, polyglot database architecture, and the backend logic powering every production deployment.",
    tags: ["Cloud Infrastructure", "AWS Serverless", "Backend Systems"],
    accent: "olive",
  },
  {
    name: "Sushil Bhonsle",
    initials: "SB",
    role: "Co-Founder & CPO",
    subtitle: "Chief Product Officer",
    domain: "Product Operations, Quality Assurance & User Journey",
    description:
      "Bridges technical engineering and real-world user needs. Commands product operations, QA frameworks, and ensures every release meets the 100% accuracy standard.",
    tags: ["Product Operations", "QA Engineering", "User Journey"],
    accent: "bronze",
  },
  {
    name: "Shyam Parmar",
    initials: "SP",
    role: "CDO / Head of Frontend",
    subtitle: "Chief Design Officer",
    domain: "Visual Architecture, UI/UX & Pixel-Perfect Interfaces",
    description:
      "Translates enterprise architecture into interfaces that feel inevitable. Owns the complete visual layer — from brand identity systems to production-ready component libraries.",
    tags: ["UI/UX Design", "Visual Architecture", "Frontend Engineering"],
    accent: "olive",
  },
];

const accentMap = {
  bronze: {
    border: "border-bronze-400/20 hover:border-bronze-400/40",
    initials: "bg-bronze-400/10 text-[#9E8A26] border-bronze-400/30",
    tag: "bg-bronze-400/10 text-[#9E8A26]/80 border-bronze-400/20",
    bar: "from-bronze-400 to-copper-500",
    dot: "bg-bronze-400",
  },
  olive: {
    border: "border-olive-500/20 hover:border-olive-500/40",
    initials: "bg-olive-500/10 text-olive-400 border-olive-500/30",
    tag: "bg-olive-500/10 text-olive-400/80 border-olive-500/20",
    bar: "from-olive-500 to-olive-400",
    dot: "bg-olive-400",
  },
};

export default function LeadershipBoard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leadership" className="relative py-28 px-6">
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
              Governing Board
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            The Command
            <span className="text-[#9E8A26]"> Architecture</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Four specialists. Four distinct domains. One unified execution
            engine built to deliver at enterprise scale.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {leaders.map((leader, i) => {
            const classes = accentMap[leader.accent as keyof typeof accentMap];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`glass-card rounded-sm border transition-all duration-300 overflow-hidden group hover:shadow-xl ${classes.border}`}
              >
                {/* Top accent bar */}
                <div className={`h-0.5 bg-gradient-to-r ${classes.bar}`} />

                <div className="p-6">
                  {/* Avatar */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-sm border-2 flex items-center justify-center font-black text-lg ${classes.initials}`}
                    >
                      {leader.initials}
                    </div>
                    <a
                      href="https://www.linkedin.com/company/unnitro/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-[#9E8A26] transition-colors"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>

                  {/* Name & Role */}
                  <div className="mb-4">
                    <h3 className="text-white font-black text-base leading-tight mb-0.5">
                      {leader.name}
                    </h3>
                    <div className="text-[#9E8A26] text-xs font-bold">
                      {leader.role}
                    </div>
                    <div className="text-gray-500 text-[10px] font-mono mt-0.5">
                      {leader.subtitle}
                    </div>
                  </div>

                  {/* Domain */}
                  <div className="flex items-start gap-2 mb-4 p-2.5 rounded-sm bg-obsidian-900/50 border border-gray-800/50">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${classes.dot}`} />
                    <span className="text-gray-400 text-[10px] leading-relaxed">
                      {leader.domain}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {leader.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {leader.tags.map((tag, j) => (
                      <span
                        key={j}
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${classes.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href="https://www.linkedin.com/company/unnitro/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-bronze-400/20 hover:border-bronze-400/50 text-gray-400 hover:text-[#9E8A26] text-sm font-medium transition-all duration-200 rounded-sm"
          >
            <Linkedin size={15} />
            Follow Unnitro on LinkedIn
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
