
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield,
  Lock,
  FileCheck,
  ChevronDown,
  Send,
  CheckCircle2,
} from "lucide-react";

const trustBadges = [
  {
    icon: Shield,
    title: "Zero-Downtime Guarantee",
    desc: "Every deployment uses the Antigravity Framework. No maintenance windows.",
  },
  {
    icon: Lock,
    title: "NDA-First Engagements",
    desc: "All discussions covered under mutual NDA from first contact.",
  },
  {
    icon: FileCheck,
    title: "Data Privacy Architecture",
    desc: "Tenant-isolated data with zero cross-contamination guarantees.",
  },
];

const faqs = [
  {
    q: "What is the typical engagement model?",
    a: "We operate on project-based and retainer engagements. Most enterprise builds follow our 60-Day Velocity Sprint. Retainers are available for ongoing product scaling, DevOps management, and AI workflow iteration.",
  },
  {
    q: "How does multi-tenant architecture protect client data?",
    a: "V1 uses path-based Firebase RTDB isolation with email-pinned security rules. V2 upgrades to Firestore with Custom Auth Claims, providing cryptographic tenant separation. Zero cross-tenant data access is architecturally enforced.",
  },
  {
    q: "Which industries does Unnitro serve?",
    a: "We are domain-agnostic but proven in healthcare (LIMS), diagnostics, and enterprise operations. Our architecture patterns apply to any industry requiring multi-tenant SaaS, AI automation, or cloud migration.",
  },
  {
    q: "What does '10x Execution' mean in practice?",
    a: "It means we refuse to deliver baseline solutions. Every system is over-engineered for the next 5 years of scale, not just current requirements. We build as if you'll have 100x your current load from day one.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. Through our Venture Studio arm, we co-build with early-stage founders under equity or hybrid models. Reach out with your concept for a discovery call.",
  },
];

export default function TrustFilter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="trust" className="relative py-28 px-6 bg-obsidian-800/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-bronze-400" />
            <span className="text-bronze-400 text-xs font-mono tracking-widest uppercase">
              Enterprise Trust Filter
            </span>
            <div className="h-px w-12 bg-bronze-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Ready to
            <span className="text-bronze-400"> Engage?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Start with a no-obligation discovery call. NDA on request. We
            qualify every engagement for maximum mutual value.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14"
        >
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 glass-card rounded-sm border border-bronze-400/10"
            >
              <div className="w-10 h-10 rounded-sm bg-bronze-400/10 border border-bronze-400/20 flex items-center justify-center shrink-0">
                <badge.icon size={18} className="text-bronze-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm mb-1">
                  {badge.title}
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  {badge.desc}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main content: Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="glass-card rounded-sm border border-bronze-400/15 p-8"
          >
            <h3 className="text-white font-black text-xl mb-2">
              Initiate Engagement
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Fill in your details and our team will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle2 size={48} className="text-green-400" />
                <div className="text-white font-bold text-lg">
                  Message Received
                </div>
                <div className="text-gray-500 text-sm text-center">
                  Our team will reach out within 24 hours to schedule a
                  discovery call.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1.5 block">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-obsidian-900/80 border border-gray-700/50 focus:border-bronze-400/50 outline-none text-white text-sm px-3 py-2.5 rounded-sm transition-colors placeholder:text-gray-700"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1.5 block">
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full bg-obsidian-900/80 border border-gray-700/50 focus:border-bronze-400/50 outline-none text-white text-sm px-3 py-2.5 rounded-sm transition-colors placeholder:text-gray-700"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1.5 block">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-obsidian-900/80 border border-gray-700/50 focus:border-bronze-400/50 outline-none text-white text-sm px-3 py-2.5 rounded-sm transition-colors placeholder:text-gray-700"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1.5 block">
                    Project Brief *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-obsidian-900/80 border border-gray-700/50 focus:border-bronze-400/50 outline-none text-white text-sm px-3 py-2.5 rounded-sm transition-colors resize-none placeholder:text-gray-700"
                    placeholder="Tell us about your project, timeline, and goals..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-bronze-400 hover:bg-bronze-300 text-obsidian-900 font-black text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-bronze-400/20 rounded-sm"
                >
                  <Send size={14} />
                  Send Engagement Request
                </button>
              </form>
            )}
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-white font-black text-xl mb-6">
              Common Questions
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`glass-card rounded-sm border transition-all duration-300 ${
                    openFaq === i
                      ? "border-bronze-400/30"
                      : "border-gray-700/30 hover:border-gray-600/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-gray-300 text-sm font-medium pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-bronze-400 shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-bronze-400/10 pt-3">
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
