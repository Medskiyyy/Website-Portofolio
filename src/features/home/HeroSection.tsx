import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Download, Github, Mail, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const stats = [
    { value: "3+", label: t("statProjects") },
    { value: "90+", label: t("statPerformance") },
    { value: "2", label: t("statLanguages") },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("badge")}
          </div>

          <h1 className="font-heading max-w-3xl text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }), "h-12 cursor-pointer gap-2 px-6")}
            >
              {t("ctaProjects")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 cursor-pointer gap-2 px-6")}
            >
              {t("ctaResume")}
              <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-border rounded-lg border border-border bg-card shadow-sm">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4">
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs font-medium leading-4 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="surface-card relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/5] min-h-[420px] bg-muted">
              <Image
                src="/profile.jpg"
                alt="Ahmad Hidayatullah"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 44vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-zinc-950/82 p-5 text-white backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Ahmad Hidayatullah</p>
                  <p className="mt-1 text-xs text-zinc-300">{t("profileRole")}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t("profileBadge")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
