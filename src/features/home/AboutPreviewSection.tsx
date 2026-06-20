import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutPreviewSection() {
  const t = useTranslations("AboutPreview");

  return (
    <section className="w-full py-20 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          {t("label")}
        </h2>
        <p className="text-xl text-foreground leading-relaxed font-medium">
          {t("summary")}
        </p>
        <div className="mt-8">
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
