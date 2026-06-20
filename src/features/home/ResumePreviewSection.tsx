import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FileText, Download, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResumePreviewSection() {
  const t = useTranslations("ResumePreview");

  const resumeItems = [
    { label: t("summaryLabel"), value: t("summaryValue") },
    { label: t("educationLabel"), value: t("educationValue") },
    { label: t("projectsLabel"), value: t("projectsValue") },
  ];

  return (
    <section className="w-full py-20 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {t("label")}
          </h2>
          <p className="text-2xl font-bold text-foreground">{t("title")}</p>
        </div>

        {/* Resume Card */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-card-foreground">Ahmad Hidayatullah</p>
              <p className="text-sm text-muted-foreground">Full Stack Developer &amp; Product Builder</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {resumeItems.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/resume"
              className={cn(buttonVariants(), "gap-2 flex-1 justify-center")}
            >
              {t("viewResume")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ variant: "outline" }), "gap-2 flex-1 justify-center")}
            >
              {t("download")}
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
