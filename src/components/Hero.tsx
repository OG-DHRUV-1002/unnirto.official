
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Shield, Zap, Globe, TrendingUp } from "lucide-react";

const stats = [
  { value: 150, suffix: "+", label: "Daily Patients Processed" },
  { value: 0, suffix: "%", label: "System Downtime" },
  { value: 60, suffix: "D", label: "Velocity Sprint" },
  { value: 100, suffix: "%", label: "Billing Accuracy" },
];

const words = ["Indestructible", "Unstoppable", "Scalable", "Intelligent"];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="counter-value">{count}{suffix}</span>;
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg z-0" />

      {/* Radial glows */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-bronze-400/4 blur-[140px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-olive-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-bronze-400/4 blur-[100px]" />
      </motion.div>

      {/* Corner accent lines */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-bronze-400/20 z-10" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r-2 border-t-2 border-bronze-400/20 z-10" />
      <div className="absolute bottom-16 left-6 w-16 h-16 border-l-2 border-b-2 border-bronze-400/20 z-10" />
      <div className="absolute bottom-16 right-6 w-16 h-16 border-r-2 border-b-2 border-bronze-400/20 z-10" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-bronze-400/20 bg-bronze-400/5 mb-8"
            >
              <div className="relative w-2 h-2">
                <div className="w-full h-full rounded-full bg-bronze-400 animate-pulse" />
                <div className="absolute inset-0 w-full h-full rounded-full bg-bronze-400/40 animate-ping" />
              </div>
              <span className="text-[#9E8A26] text-xs font-mono tracking-[0.15em] uppercase">
                Technology Holding Enterprise & Venture Studio
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-6"
            >
              <span className="block text-white mb-1">Architecting</span>
              <span className="block h-[1.1em] overflow-hidden relative">
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    className="block text-[#9E8A26] bronze-glow-text absolute inset-0"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={i === wordIndex ? { y: "0%", opacity: 1 } : i === (wordIndex - 1 + words.length) % words.length ? { y: "-100%", opacity: 0 } : { y: "100%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block text-white mt-1">Digital</span>
              <span className="block text-gray-500 font-light italic">Ecosystems.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              Unnitro incubates, launches, and scales enterprise-grade SaaS, agentic
              AI workflows, and cloud infrastructure — purpose-engineered for
              organizations that refuse to be average.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a href="#ventures"
                className="group btn-shine-sweep shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] flex items-center gap-2 px-8 py-4 bg-bronze-400 hover:bg-bronze-300 text-obsidian-900 font-black text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_30px_-5px_rgba(158,138,38,0.4)] rounded-sm">
                Explore Portfolio
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#trust"
                className="group btn-shine-sweep flex items-center gap-2 px-8 py-4 border border-obsidian-600 hover:border-[#9E8A26]/60 text-gray-300 hover:text-white font-semibold text-sm tracking-wide transition-all duration-200 rounded-sm hover:bg-obsidian-700 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                <Play size={13} className="text-[#9E8A26]" />
                Watch Overview
              </a>
            </motion.div>

          </div>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 hidden lg:block"
          >
            {/* Architecture diagram card */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-sm bg-bronze-400/5 blur-2xl" />

              <div className="relative glass-card border border-bronze-400/15 rounded-sm p-6 float">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-error" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                    <div className="w-2.5 h-2.5 rounded-full bg-success" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">unnitro::architecture</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] font-mono text-success">LIVE</span>
                  </div>
                </div>

                {/* Architecture visualization */}
                <div className="space-y-3 font-mono text-xs">
                  {[
                    { label: "→ Next.js SSR Layer", color: "text-[#9E8A26]", indent: 0 },
                    { label: "  ├─ SWR Cache [HIT] 0ms", color: "text-success", indent: 1 },
                    { label: "  ├─ Firebase RTDB", color: "text-info", indent: 1 },
                    { label: "  └─ PostgreSQL billing", color: "text-purple-400", indent: 1 },
                    { label: "→ Multi-Tenant Isolation", color: "text-[#9E8A26]", indent: 0 },
                    { label: "  ├─ Tenant: bhonsle_lab ✓", color: "text-success", indent: 1 },
                    { label: "  ├─ Tenant: megascan ✓", color: "text-success", indent: 1 },
                    { label: "  └─ Tenant: niriksha ✓", color: "text-success", indent: 1 },
                    { label: "→ Agentic Nexus [v0.1]", color: "text-olive-400", indent: 0 },
                    { label: "  └─ LangGraph :: RUNNING", color: "text-[#9E8A26]", indent: 1 },
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.15, ease: "linear" }}
                      className={`${line.color} leading-relaxed overflow-hidden whitespace-nowrap border-r-2 border-transparent`}
                    >
                      {line.label}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-[#9E8A26] flex items-center gap-1 mt-2"
                  >
                    <span>$</span>
                    <span className="animate-pulse w-2 h-4 bg-[#9E8A26] inline-block"></span>
                  </motion.div>
                </div>

                {/* Metrics strip */}
                <div className="mt-5 pt-4 border-t border-bronze-400/10 grid grid-cols-3 gap-3">
                  {[
                    { label: "Uptime", value: "99.99%", color: "text-success" },
                    { label: "Latency", value: "<2ms", color: "text-[#9E8A26]" },
                    { label: "Tenants", value: "3 Live", color: "text-info" },
                  ].map((m, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-sm font-black ${m.color}`}>{m.value}</div>
                      <div className="text-[9px] text-gray-500 font-mono">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -right-4 glass-card border border-olive-500/30 rounded-sm px-3 py-2 flex items-center gap-2"
              >
                <Shield size={12} className="text-olive-400" />
                <span className="text-[10px] font-mono text-olive-400">NDA Protected</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -bottom-4 -left-4 glass-card border border-bronze-400/30 rounded-sm px-3 py-2 flex items-center gap-2"
              >
                <TrendingUp size={12} className="text-[#9E8A26]" />
                <span className="text-[10px] font-mono text-[#9E8A26]">10x Execution</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-700 text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-bronze-400/40 to-transparent" />
      </motion.div>
    </section>
  );
}
