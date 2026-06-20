import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Download, Github, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex flex-col items-center justify-center py-24 md:py-36 px-6 text-center overflow-hidden">
      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="h-[400px] w-[700px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Profile Photo */}
      <div className="mb-6">
        <div className="relative h-24 w-24 rounded-full border border-border overflow-hidden bg-muted shadow-sm">
          <Image
            src="/profile.jpg"
            alt="Ahmad Hidayatullah"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Available badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        {t("badge")}
      </div>

      {/* Headline */}
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight">
        {t("title")}
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        {t("subtitle")}
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/projects"
          className={cn(buttonVariants({ size: "lg" }), "gap-2 px-6 h-11")}
        >
          {t("ctaProjects")}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="/resume.pdf"
          download
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2 px-6 h-11")}
        >
          {t("ctaResume")}
          <Download className="h-4 w-4" />
        </a>
      </div>

      {/* Social Links */}
      <div className="mt-8 flex items-center gap-6">
        <a
          href="https://github.com/Medskiyyy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </a>
        <a
          href="mailto:hidayatahmadd1377@gmail.com"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </a>
      </div>
    </section>
  );
}
