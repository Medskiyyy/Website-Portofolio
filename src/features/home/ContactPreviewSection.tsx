import { useTranslations } from "next-intl";
import { Mail, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full py-20 px-6 bg-muted/30">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          {t("label")}
        </h2>
        <p className="text-2xl font-bold text-foreground mb-3">{t("title")}</p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:contact@ahmadhidayatullah.com"
            className={cn(buttonVariants(), "gap-2 px-6")}
          >
            <Mail className="h-4 w-4" />
            {t("sendEmail")}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2 px-6")}
          >
            <Github className="h-4 w-4" />
            {t("viewGithub")}
          </a>
        </div>
      </div>
    </section>
  );
}
