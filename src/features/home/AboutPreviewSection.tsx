import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");
  const highlights = [t("highlightProduct"), t("highlightEngineering"), t("highlightDelivery")];

  return (
    <section className="w-full py-20">
      <div className="section-shell grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
        </div>
        <div className="surface-card rounded-lg p-6 md:p-8">
          <p className="text-xl font-medium leading-8 text-foreground">
            {t("summary")}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium leading-5 text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer gap-2")}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
