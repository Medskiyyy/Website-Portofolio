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
    <section className="w-full py-20">
      <div className="section-shell grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="surface-card rounded-lg p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-border pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-card-foreground">Ahmad Hidayatullah</p>
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
              className={cn(buttonVariants(), "flex-1 cursor-pointer justify-center gap-2")}
            >
              {t("viewResume")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className={cn(buttonVariants({ variant: "outline" }), "flex-1 cursor-pointer justify-center gap-2")}
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
