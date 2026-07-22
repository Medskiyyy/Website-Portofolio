"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Layers,
  Smartphone,
  Globe,
  Terminal,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE_OUT, Magnetic } from "@/components/motion";

type CodeTab = "stack" | "android" | "status";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const [activeTab, setActiveTab] = useState<CodeTab>("stack");
  const [copied, setCopied] = useState(false);

  const techBadges = [
    { name: "Next.js 16", icon: Globe },
    { name: "Supabase & Prisma", icon: Layers },
    { name: "Kotlin & Compose", icon: Smartphone },
    { name: "TypeScript", icon: Terminal },
  ];

  const codeSnippets: Record<CodeTab, { filename: string; language: string; code: string }> = {
    stack: {
      filename: "developer.config.ts",
      language: "typescript",
      code: `export const engineer = {
  name: "Ahmad Hidayatullah",
  role: "Full Stack & Android Developer",
  focus: ["Type-Safety", "Zero-Latency UI", "Clean Architecture"],
  webStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Supabase"],
  mobileStack: ["Kotlin", "Jetpack Compose", "Room DB", "Dagger Hilt"],
  status: "Ready for high-impact engineering roles"
};`,
    },
    android: {
      filename: "Architecture.kt",
      language: "kotlin",
      code: `@Singleton
class ProductionEngine @Inject constructor(
  private val repository: DataRepository,
  private val offlineStore: RoomDatabase
) {
  suspend fun syncOfflineData(): Result<SyncStatus> = 
    withContext(Dispatchers.IO) {
      // Offline-first synchronization pipeline
      offlineStore.verifyAndPush(repository.fetchLatest())
    }
}`,
    },
    status: {
      filename: "system_status.json",
      language: "json",
      code: `{
  "uptime": "99.99%",
  "architecturalIntegrity": "VERIFIED",
  "lighthouseScore": 100,
  "availability": {
    "fullTime": true,
    "freelance": true,
    "location": "Jakarta / Remote"
  }
}`,
    },
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background radial gradient & grid lines */}
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-70" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />

      <div className="section-shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copywriting Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Live Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t("badge")}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.08 }}
            >
              {t("title").split("&").map((part, index) => (
                <span key={index}>
                  {index > 0 && <span className="text-primary">&</span>}
                  {index === 0 ? (
                    part
                  ) : (
                    <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      {part}
                    </span>
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl text-pretty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
            >
              {t("subtitle")}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="mt-8 flex w-full flex-col sm:w-auto sm:flex-row gap-3.5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
            >
              <Magnetic strength={0.2}>
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 cursor-pointer gap-2.5 px-6 text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/30",
                  )}
                >
                  {t("ctaProjects")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.15}>
                <a
                  href="/resume.pdf"
                  download
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 cursor-pointer gap-2 border-border/80 px-6 text-sm font-semibold transition-all hover:border-primary/50 hover:bg-card/80",
                  )}
                >
                  {t("ctaResume")}
                  <Download className="h-4 w-4" />
                </a>
              </Magnetic>
            </motion.div>

            {/* Tech Badges & Github link */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-border/50 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.36 }}
            >
              <a
                href="https://github.com/Medskiyyy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/80 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:bg-card"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub Profile
              </a>
              {techBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.name}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {badge.name}
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Interactive Code & Terminal Preview Widget */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border/80 bg-card/95 shadow-2xl shadow-black/20 overflow-hidden backdrop-blur-xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-primary" />
                    {codeSnippets[activeTab].filename}
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Tabs */}
              <div className="flex border-b border-border/40 bg-muted/30 px-2 pt-2 gap-1 overflow-x-auto">
                {(["stack", "android", "status"] as CodeTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all border-t border-x",
                      activeTab === tab
                        ? "bg-card border-border/60 text-primary font-semibold"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    )}
                  >
                    {tab === "stack" && "stack.ts"}
                    {tab === "android" && "Architecture.kt"}
                    {tab === "status" && "status.json"}
                  </button>
                ))}
              </div>

              {/* Code Display Area */}
              <div className="p-4 font-mono text-xs leading-relaxed text-card-foreground overflow-x-auto min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <code>{codeSnippets[activeTab].code}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="flex items-center justify-between border-t border-border/40 bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Type-Check: Pass
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  Clean Architecture
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
