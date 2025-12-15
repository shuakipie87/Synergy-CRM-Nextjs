import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Users,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Layout,
  Command,
  Search,
  Menu,
  X,
  Star,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Head>
        <title>SynergyHub - The CRM for Modern Teams</title>
        <meta
          name="description"
          content="Collaborative CRM platform for high-growth teams."
        />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-black/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20 text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              SynergyHub
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Multiple Features</a>
            <a href="#customers" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Customers</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <Link href="/dashboard">
              <a className="px-5 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_-10px_rgba(255,255,255,0.5)]">
                Login
              </a>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-semibold text-zinc-400">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#customers" onClick={() => setMobileMenuOpen(false)}>Customers</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Link href="/dashboard">
              <a className="text-white">Login</a>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-[100%] blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-600/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-full text-sm text-zinc-400 mb-8 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              v2.0 is now live with AI Insights
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] md:leading-[1.1]"
            >
              The CRM that <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 animate-gradient-x">
                thinks like you do.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              SynergyHub bridges the gap between customer data and team
              communication. Stop switching tabs and start closing deals together
              with our real-time, collaborative workspace.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/dashboard">
                <a className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all hover:scale-105 shadow-xl shadow-white/10 flex items-center justify-center gap-2">
                  Get Started Free <ArrowRight size={20} />
                </a>
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 border border-zinc-700 bg-zinc-800/50 rounded-xl font-semibold text-lg hover:bg-zinc-800 transition-all hover:scale-105 flex items-center justify-center gap-2">
                <span className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center">
                  <span className="w-0 ml-0.5 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent"></span>
                </span>
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Abstract Interface Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
            className="mt-20 md:mt-32 max-w-6xl mx-auto relative z-10"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-b from-indigo-500/30 to-purple-600/10 rounded-[2rem] blur-2xl -z-10 opacity-60"></div>

            <div className="rounded-[1.5rem] border border-zinc-800/60 bg-[#0A0A0B] shadow-2xl overflow-hidden ring-1 ring-white/10">
              {/* Mock Browser Header */}
              <div className="h-14 border-b border-zinc-800/60 bg-black/40 backdrop-blur-md flex items-center px-6 gap-20 sticky top-0 z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="flex-1 max-w-xl mx-auto hidden md:block">
                  <div className="h-8 bg-zinc-900/50 rounded-lg border border-zinc-800/50 flex items-center px-3 gap-2 text-zinc-600 text-xs font-mono">
                    <Shield size={12} />
                    synergyhub.app/dashboard
                  </div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="p-2 md:p-8 bg-[#0C0C0E] grid grid-cols-12 gap-6 min-h-[500px] md:min-h-[700px]">
                {/* Sidebar Mock */}
                <div className="hidden lg:flex col-span-2 flex-col gap-4 border-r border-zinc-800/50 pr-6">
                  <div className="space-y-1">
                    <div className="h-8 bg-zinc-800/30 rounded-lg w-full"></div>
                    <div className="h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg w-full"></div>
                    <div className="h-8 bg-zinc-800/30 rounded-lg w-full"></div>
                    <div className="h-8 bg-zinc-800/30 rounded-lg w-full"></div>
                  </div>
                </div>

                {/* Main Content Mock */}
                <div className="col-span-12 lg:col-span-10">
                  <div className="flex justify-between items-end mb-8">
                    <div className="space-y-2">
                      <div className="h-8 w-48 bg-zinc-800/50 rounded-lg animate-pulse"></div>
                      <div className="h-4 w-96 bg-zinc-900 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 w-24 bg-zinc-800/50 rounded-lg"></div>
                      <div className="h-10 w-32 bg-indigo-600/20 border border-indigo-500/30 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Grid mockup */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-32 rounded-xl bg-zinc-900/30 border border-zinc-800/50 p-5 space-y-3">
                        <div className="flex justify-between">
                          <div className="h-8 w-8 rounded-lg bg-zinc-800/50"></div>
                          <div className="h-4 w-12 rounded-full bg-green-500/10"></div>
                        </div>
                        <div className="h-6 w-24 bg-zinc-800/50 rounded"></div>
                        <div className="h-4 w-full bg-zinc-900 rounded"></div>
                      </div>
                    ))}
                  </div>

                  <div className="h-96 rounded-xl bg-zinc-900/20 border border-zinc-800/50 relative overflow-hidden">
                    {/* Abstract Chart */}
                    <div className="absolute inset-0 flex items-end justify-around px-8 pb-0 opacity-50">
                      {[40, 70, 50, 90, 60, 80, 50, 95, 80, 100].map((h, i) => (
                        <div key={i} className="w-full mx-1 bg-gradient-to-t from-indigo-500/20 to-violet-500/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-zinc-800/50 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {["Acme Corp", "GlobalTech", "Nebula", "Trio", "FoxRun"].map((logo) => (
              <span key={logo} className="text-xl font-bold font-serif text-white">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-indigo-400">scale faster</span></h2>
            <p className="text-zinc-400 text-lg">Detailed insights, powerful automation, and seamless collaboration. All in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Contextual Chat",
                desc: "Every customer profile is a chat room. Discuss deals right where the data lives, with full history context.",
              },
              {
                icon: Zap,
                title: "Real-time Sync",
                desc: "See who is viewing a page and get instant updates. No more refreshing to see the latest status.",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "SOC2 compliant infrastructure with role-based access control and audit logs built-in from day one.",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "Visualise your sales pipeline with beautiful, interactive charts that update in real-time.",
              },
              {
                icon: Command,
                title: "Command Menu",
                desc: "Navigate anywhere in the app without lifting your hands from the keyboard. Speed is a feature.",
              },
              {
                icon: Layout,
                title: "Custom Views",
                desc: "Save your favorite filters and layouts. Create distinct workspaces for different teams.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                  <f.icon className="text-zinc-400 group-hover:text-indigo-400 transition-colors" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-zinc-500 group-hover:text-zinc-400 leading-relaxed transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Globe size={12} /> Global Scale
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Manage customers across <br />
                <span className="text-white">multiple timezones effortlessly.</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Our smart scheduling automatically converts times for all parties involved.
                Never miss a meeting due to timezone math again.
              </p>

              <ul className="space-y-4">
                {[
                  "Automatic timezone detection",
                  "Smart meeting scheduler",
                  "Async notification delivery",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="text-green-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-[2rem] opacity-20 blur-2xl"></div>
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                {/* Mock Scheduler UI */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="font-semibold">Schedule Meeting</div>
                    <div className="text-xs text-zinc-500">GMT+8</div>
                  </div>
                  {[1, 2, 3].map((slot) => (
                    <div key={slot} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">10:00 AM - 11:00 AM</span>
                      </div>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400">Start free, upgrade when you love it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {[
              {
                name: "Starter",
                price: "$0",
                desc: "For individuals and side projects.",
                features: ["Up to 3 customers", "Basic Analytics", "Community Support"],
                cta: "Start Free",
                popular: false
              },
              {
                name: "Pro",
                price: "$29",
                desc: "For growing teams and startups.",
                features: ["Unlimited customers", "Advanced Reporting", "Priority Support", "API Access"],
                cta: "Start Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For large organizations.",
                features: ["Dedicated Success Manager", "SLA", "On-premise Deployment", "Custom Integrations"],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border ${plan.popular ? "bg-zinc-900/50 border-indigo-500/50 ring-1 ring-indigo-500/20 shadow-2xl shadow-indigo-500/10" : "bg-black/40 border-zinc-800 hover:border-zinc-700"} flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-zinc-300 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-zinc-500">/month</span>}
                  </div>
                  <p className="text-zinc-500 text-sm mt-2">{plan.desc}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 size={16} className="text-indigo-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? "bg-white text-black hover:bg-zinc-200" : "bg-zinc-800 text-white hover:bg-zinc-700"}`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-700 p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your workflow?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-lg mx-auto">Join thousands of teams who have already switched to SynergyHub.</p>
            <Link href="/dashboard">
              <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-zinc-50 transition-all hover:scale-105 shadow-xl">
                Get Started Now <ArrowRight size={20} />
              </a>
            </Link>
            <div className="mt-8 flex justify-center items-center gap-6 text-indigo-200 text-sm">
              <span className="flex items-center gap-2"><CheckCircle2 size={14} /> No credit card required</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} /> 14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-white">
                <Zap size={16} fill="currentColor" />
              </div>
              <span className="font-bold text-xl">SynergyHub</span>
            </div>
            <p className="text-zinc-500 max-w-xs mb-8">
              Making customer relationships efficient, collaborative, and human again.
            </p>
            <div className="flex gap-4">
              {/* Socials placeholders */}
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-colors cursor-pointer">
                <Globe size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-colors cursor-pointer">
                <Users size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Features</li>
              <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
              <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
              <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Docs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-white cursor-pointer transition-colors">Partners</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          © 2024 SynergyHub Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
