
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertTriangle, Zap } from "lucide-react";

const ventures = [
  {
    id: "msd-lims",
    label: "Flagship Deployment",
    name: "MSD-LIMS",
    tagline: "Cloud-Native Laboratory Information Management System",
    description:
      "A multi-tenant, cloud-native LIMS platform that digitized the entire diagnostic sector workflow for three Navi Mumbai clinics. End-to-end from patient intake to automated billing and record management.",
    challenge:
      "Three independent diagnostic labs in Navi Mumbai operating on paper-based workflows — zero digital traceability, manual billing errors, and no real-time reporting capability.",
    architecture:
      "Multi-tenant Firebase RTDB with path-based tenant isolation, Next.js SSR with domain-pinned Google Auth, SWR-powered zero-latency dashboards, and PostgreSQL for structured billing data.",
    resolution:
      "Digitized 100% of workflows across 3 clients. Handles 150+ daily patients with 0% downtime and 100% automated billing accuracy. Deployed in an 18-day Velocity Sprint.",
    metrics: [
      { label: "Daily Patients", value: "150+" },
      { label: "Downtime", value: "0%" },
      { label: "Billing Accuracy", value: "100%" },
      { label: "Sprint Duration", value: "18 Days" },
    ],
    clients: [
      "Dr. Bhonsle's Laboratory",
      "MegaScan Imaging Centre",
      "Niriksha Laboratory",
    ],
    stack: ["Next.js", "Firebase RTDB", "PostgreSQL", "SWR", "Google Auth", "AWS"],
    status: "Live & Scaling",
    accentColor: "#C47A3A",
  },
];

const upcomingVentures = [
  {
    name: "Agentic Nexus",
    description: "Enterprise AI orchestration platform for autonomous business process automation.",
    stage: "In Development",
    stack: ["LangGraph", "CrewAI", "n8n", "Claude"],
  },
  {
    name: "Multi-Tenant Shield",
    description: "Turnkey multi-tenant SaaS boilerplate with V2 Firestore + Custom Auth Claims architecture.",
    stage: "Architecture Phase",
    stack: ["Firestore", "Custom Claims", "Next.js", "RBAC"],
  },
  {
    name: "Core-LIMS API",
    description: "Open healthcare data layer — a REST API powering multi-lab integrations.",
    stage: "Design Phase",
    stack: ["REST API", "PostgreSQL", "HL7 FHIR", "OpenAPI"],
  },
];

export default function Ventures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"challenge" | "architecture" | "resolution">("challenge");

  const venture = ventures[0];

  return (
    <section id="ventures" className="relative py-28 px-6 bg-obsidian-800/30">
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
              Flagship Ventures
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Portfolio
            <span className="text-[#9E8A26]"> Deployments</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Real enterprise problems solved. Metric-backed outcomes delivered.
          </p>
        </motion.div>

        {/* Flagship Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-sm border border-bronze-400/20 overflow-hidden mb-8"
        >
          {/* Card header */}
          <div className="border-b border-bronze-400/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-[#9E8A26] bg-bronze-400/10 px-2 py-0.5 rounded-full border border-bronze-400/20">
                  {venture.label}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {venture.status}
                </span>
              </div>
              <h3 className="text-3xl font-black text-white">{venture.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{venture.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {venture.clients.map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-obsidian-800 border border-gray-700/50 text-gray-400"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-bronze-400/10">
            {venture.metrics.map((m, i) => (
              <div
                key={i}
                className={`p-6 text-center ${i < 3 ? "border-r border-bronze-400/10" : ""}`}
              >
                <div className="text-3xl font-black text-[#9E8A26]">
                  {m.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-bronze-400/10 flex">
            {(["challenge", "architecture", "resolution"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-200 ${
                    activeTab === tab
                      ? "text-[#9E8A26] border-b-2 border-bronze-400 bg-bronze-400/5"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="flex items-start gap-3">
              {activeTab === "challenge" && (
                <>
                  <AlertTriangle className="text-yellow-500 mt-0.5 shrink-0" size={18} />
                  <p className="text-gray-300 leading-relaxed">{venture.challenge}</p>
                </>
              )}
              {activeTab === "architecture" && (
                <>
                  <Zap className="text-[#9E8A26] mt-0.5 shrink-0" size={18} />
                  <p className="text-gray-300 leading-relaxed">{venture.architecture}</p>
                </>
              )}
              {activeTab === "resolution" && (
                <>
                  <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={18} />
                  <p className="text-gray-300 leading-relaxed">{venture.resolution}</p>
                </>
              )}
            </div>
          </div>

          {/* Stack */}
          <div className="px-6 pb-6 flex flex-wrap gap-2 border-t border-bronze-400/10 pt-4">
            <span className="text-xs text-gray-500 font-mono mr-2 self-center">
              STACK:
            </span>
            {venture.stack.map((s, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded font-mono bg-obsidian-700/50 border border-gray-700/50 text-gray-400"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Ventures */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {upcomingVentures.map((v, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="glass-card rounded-sm p-6 border border-gray-700/30 hover:border-[#9E8A26]/30 hover:shadow-[0_0_30px_-5px_rgba(158,138,38,0.2)] hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-gray-500 bg-obsidian-700/50 px-2 py-0.5 rounded-full border border-gray-700/40 uppercase tracking-wider">
                  {v.stage}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-gray-700 group-hover:text-[#9E8A26] transition-colors"
                />
              </div>
              <h4 className="text-white font-bold text-base mb-2">{v.name}</h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">
                {v.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {v.stack.map((s, j) => (
                  <span
                    key={j}
                    className="text-[10px] px-2 py-0.5 rounded font-mono bg-obsidian-700/30 border border-gray-700/30 text-gray-500"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
