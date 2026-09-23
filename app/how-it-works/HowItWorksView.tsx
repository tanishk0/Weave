"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FileText, 
  Link2, 
  Image as ImageIcon, 
  FileUp, 
  Sparkles, 
  Filter, 
  FolderKanban, 
  Tag, 
  Search, 
  ArrowRight, 
  Check, 
  Bot,
  ExternalLink,
  Layers,
  Zap,
  CheckCircle2,
  Bookmark
} from "lucide-react";
import GetStarted from "@/components/Navbar/GetStarted";

export default function HowItWorksView() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  const steps = [
    {
      id: 1,
      num: "01",
      title: "1. Capture",
      shortTitle: "Capture",
      description: "Drop in anything worth remembering—notes, PDFs, links, screenshots, and more.",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
      accentBg: "from-blue-500/10 via-indigo-500/5 to-transparent",
      icon: FileUp,
    },
    {
      id: 2,
      num: "02",
      title: "2. Extract",
      shortTitle: "Extract",
      description: "Weave extracts the useful knowledge and strips away the noise.",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/60",
      accentBg: "from-purple-500/10 via-pink-500/5 to-transparent",
      icon: Sparkles,
    },
    {
      id: 3,
      num: "03",
      title: "3. Organize",
      shortTitle: "Organize",
      description: "AI places it into the right Playbook and Topic automatically.",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      accentBg: "from-emerald-500/10 via-teal-500/5 to-transparent",
      icon: FolderKanban,
    },
    {
      id: 4,
      num: "04",
      title: "4. Use",
      shortTitle: "Use",
      description: "When you need it, ask Weave. Get the knowledge you need, with the original sources when you want to dig deeper.",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      accentBg: "from-amber-500/10 via-orange-500/5 to-transparent",
      icon: Search,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-50/50 overflow-hidden pb-24">
      {/* Canvas Base Dotted Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.04) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Mouse Spotlight Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.28) 1.4px, transparent 1.4px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 25%, transparent 100%)`,
          maskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, black 25%, transparent 100%)`,
        }}
      />

      {/* Radiant Ambient Glow Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.08), rgba(59, 130, 246, 0.05) 40%, transparent 75%)`,
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-md shadow-xs mb-6 text-xs font-medium text-purple-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>The Weave Engine</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6"
          >
            How it works
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-600 leading-relaxed font-normal"
          >
            From scattered thoughts to instant, structured intelligence. Discover how Weave turns your chaos into actionable playbooks.
          </motion.p>
        </div>

        {/* Quick Nav / Step Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-md scale-105"
                    : "bg-white/80 text-zinc-600 hover:bg-white hover:text-zinc-900 border border-zinc-200/80 shadow-xs"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-600"
                }`}>
                  {step.id}
                </span>
                <Icon className="w-4 h-4" />
                <span>{step.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Core Steps Timeline & Showcase Grid */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isSelected = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                id={`step-${step.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? "border-zinc-300 bg-white shadow-xl ring-2 ring-purple-500/10"
                    : "border-zinc-200/80 bg-white/70 backdrop-blur-sm hover:border-zinc-300 hover:bg-white shadow-sm"
                }`}
              >
                {/* Background Subtle Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.accentBg} pointer-events-none`} />

                <div className="relative p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Text Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold border ${step.badgeColor}`}>
                        Step {step.num}
                      </span>
                      <div className="p-2 rounded-xl bg-zinc-100 text-zinc-700">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                      {step.title}
                    </h2>

                    <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step specific highlight bullet points */}
                    <div className="pt-2 space-y-2">
                      {step.id === 1 && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span>Supports Markdown notes, PDF documents, and URLs</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span>Instant drag-and-drop or clipboard paste</span>
                          </div>
                        </>
                      )}
                      {step.id === 2 && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                            <span>AI strips away fluff, headers, and irrelevant noise</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                            <span>Distills core concepts, code snippets, and action items</span>
                          </div>
                        </>
                      )}
                      {step.id === 3 && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>Automatic topic tags & semantic categorization</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>Organizes knowledge directly into themed Playbooks</span>
                          </div>
                        </>
                      )}
                      {step.id === 4 && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>Natural language AI Q&A across all stored content</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span>Exact source links & citations for verification</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Visual UI Card Column */}
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-zinc-200/90 bg-zinc-900/5 p-4 sm:p-6 backdrop-blur-xs">
                      {step.id === 1 && <CaptureVisualDemo />}
                      {step.id === 2 && <ExtractVisualDemo />}
                      {step.id === 3 && <OrganizeVisualDemo />}
                      {step.id === 4 && <UseVisualDemo />}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Subtle glow effect */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to organize your knowledge?
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Start capturing, extracting, and querying your information with Weave today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <GetStarted text="Get started for free" showArrow={true} />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>No credit card required</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

{/* Visual Component 1: Capture */}
function CaptureVisualDemo() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 shadow-sm p-4 sm:p-5 space-y-4">
      {/* Mock Dropzone header */}
      <div className="border-2 border-dashed border-blue-200 rounded-lg p-5 bg-blue-50/30 text-center hover:bg-blue-50/60 transition-colors cursor-pointer group">
        <FileUp className="w-8 h-8 mx-auto text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
        <p className="text-sm font-semibold text-zinc-800">Drop files or paste links here</p>
        <p className="text-xs text-zinc-500 mt-0.5">Notes, PDFs, URLs, Screenshots, Audio & more</p>
      </div>

      {/* Grid of captured items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/80 transition-colors">
          <div className="p-2 rounded-md bg-red-100 text-red-600">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-zinc-800 truncate">Q3_Research_Notes.pdf</p>
            <p className="text-[11px] text-zinc-400">PDF • 2.4 MB</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Captured</span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/80 transition-colors">
          <div className="p-2 rounded-md bg-blue-100 text-blue-600">
            <Link2 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-zinc-800 truncate">github.com/weave-ai/docs</p>
            <p className="text-[11px] text-zinc-400">Web Article</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Captured</span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/80 transition-colors">
          <div className="p-2 rounded-md bg-amber-100 text-amber-700">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-zinc-800 truncate">Product Strategy Quick Note</p>
            <p className="text-[11px] text-zinc-400">Markdown Note</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Captured</span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/80 transition-colors">
          <div className="p-2 rounded-md bg-purple-100 text-purple-600">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-zinc-800 truncate">Architecture_Diagram.png</p>
            <p className="text-[11px] text-zinc-400">Screenshot</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Captured</span>
        </div>
      </div>
    </div>
  );
}

{/* Visual Component 2: Extract */}
function ExtractVisualDemo() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 shadow-sm p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-semibold text-zinc-800">Weave Knowledge Extractor</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center gap-1">
          <Filter className="w-3 h-3" /> Strip Noise Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Raw Unstructured Noise (Left) */}
        <div className="p-3.5 rounded-lg border border-red-100 bg-red-50/20 text-xs space-y-2 opacity-60">
          <div className="flex items-center justify-between text-red-500 font-medium text-[11px]">
            <span>Raw Input (Unfiltered)</span>
            <span className="line-through">Ads / Nav / Fluff</span>
          </div>
          <p className="text-zinc-500 line-through text-[11px] leading-snug">
            [Header Nav] Home About Contact Privacy Cookie Banner Accept All. Published Aug 11 2026.
          </p>
          <p className="text-zinc-700 font-mono text-[11px] bg-white p-2 rounded border border-red-100">
            &quot;Our key metric was 42% growth in Q3. Main bottleneck is latency in the embeddings model.&quot;
          </p>
          <p className="text-zinc-500 line-through text-[11px] leading-snug">
            Subscribe to our newsletter! Sponsored by XYZ corp...
          </p>
        </div>

        {/* Extracted Intelligence (Right) */}
        <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/30 text-xs space-y-2 relative">
          <div className="flex items-center justify-between text-purple-700 font-semibold text-[11px]">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-purple-600" /> Extracted Insight
            </span>
            <span className="text-emerald-600 font-medium">98% Noise Stripped</span>
          </div>
          
          <div className="bg-white p-2.5 rounded-md border border-purple-100 shadow-xs space-y-1.5">
            <div className="flex items-start gap-1.5 text-zinc-800 font-medium">
              <span className="text-purple-600 font-bold">•</span>
              <span>Growth Metric: 42% increase recorded in Q3 performance</span>
            </div>
            <div className="flex items-start gap-1.5 text-zinc-800 font-medium">
              <span className="text-purple-600 font-bold">•</span>
              <span>Primary Bottleneck: Latency within embeddings pipeline</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-medium">#growth</span>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-medium">#embeddings</span>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-medium">#metrics</span>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* Visual Component 3: Organize */}
function OrganizeVisualDemo() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 shadow-sm p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-zinc-800">Auto-Playbook Classifier</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
          Auto Organized
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Playbook 1 */}
        <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
            <FolderKanban className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Architecture</span>
          </div>
          <div className="space-y-1.5">
            <div className="bg-white p-2 rounded border border-emerald-100 text-[11px] font-medium text-zinc-800 flex items-center justify-between">
              <span className="truncate">RAG Optimization Notes</span>
              <Tag className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            </div>
            <div className="bg-white p-2 rounded border border-emerald-100 text-[11px] font-medium text-zinc-800 flex items-center justify-between">
              <span className="truncate">Vector DB Indexing</span>
              <Tag className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Playbook 2 */}
        <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/20 space-y-2">
          <div className="flex items-center gap-2 text-blue-800 font-semibold text-xs">
            <FolderKanban className="w-3.5 h-3.5 text-blue-600" />
            <span>Product Strategy</span>
          </div>
          <div className="space-y-1.5">
            <div className="bg-white p-2 rounded border border-blue-100 text-[11px] font-medium text-zinc-800 flex items-center justify-between">
              <span className="truncate">Q4 Roadmap Deck</span>
              <Tag className="w-3 h-3 text-blue-500 flex-shrink-0" />
            </div>
            <div className="bg-white p-2 rounded border border-blue-100 text-[11px] font-medium text-zinc-800 flex items-center justify-between">
              <span className="truncate">User Interview Summary</span>
              <Tag className="w-3 h-3 text-blue-500 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Playbook 3 */}
        <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/20 space-y-2">
          <div className="flex items-center gap-2 text-purple-800 font-semibold text-xs">
            <FolderKanban className="w-3.5 h-3.5 text-purple-600" />
            <span>Market Research</span>
          </div>
          <div className="space-y-1.5">
            <div className="bg-white p-2 rounded border border-purple-100 text-[11px] font-medium text-zinc-800 flex items-center justify-between">
              <span className="truncate">Competitor Benchmark</span>
              <Tag className="w-3 h-3 text-purple-500 flex-shrink-0" />
            </div>
            <div className="bg-white p-2 rounded border border-purple-100 text-[11px] font-medium text-zinc-800 flex items-center justify-between">
              <span className="truncate">Pricing Analysis</span>
              <Tag className="w-3 h-3 text-purple-500 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* Visual Component 4: Use */}
function UseVisualDemo() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/90 shadow-sm p-4 sm:p-5 space-y-3">
      {/* Search Input Simulation */}
      <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-200 bg-amber-50/30">
        <Search className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span className="text-xs font-medium text-zinc-800 flex-1 truncate">
          &quot;What were our key findings on vector search performance?&quot;
        </span>
        <span className="px-2 py-0.5 rounded bg-zinc-900 text-white text-[10px] font-medium">Ask Weave</span>
      </div>

      {/* AI Answer Box */}
      <div className="p-3.5 rounded-lg border border-zinc-100 bg-zinc-50 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-zinc-800 font-semibold">
          <Bot className="w-4 h-4 text-purple-600" />
          <span>Weave Intelligence Response</span>
        </div>

        <p className="text-zinc-600 leading-relaxed">
          Vector index latency decreased by <span className="font-semibold text-zinc-900">35%</span> after switching to HNSW indexing, maintaining <span className="font-semibold text-zinc-900">99.4% recall</span> across 500k documents.
        </p>

        {/* Source Citations */}
        <div className="pt-2 border-t border-zinc-200/60 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-zinc-400 font-medium">Sources:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] text-zinc-700 font-medium hover:border-purple-300 transition-colors cursor-pointer">
            <FileText className="w-3 h-3 text-red-500" /> Vector_Bench_Q3.pdf (p.4) <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] text-zinc-700 font-medium hover:border-purple-300 transition-colors cursor-pointer">
            <Bookmark className="w-3 h-3 text-amber-500" /> Architecture Note <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
          </span>
        </div>
      </div>
    </div>
  );
}
