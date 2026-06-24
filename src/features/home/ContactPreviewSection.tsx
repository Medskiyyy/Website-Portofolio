import { useTranslations } from "next-intl";
import { Mail, Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactPreviewSection() {
  const t = useTranslations("ContactPreview");

  return (
    <section className="w-full py-20">
      <div className="section-shell">
        <div className="surface-card mx-auto max-w-4xl rounded-lg p-6 text-center md:p-10">
          <p className="eyebrow">{t("label")}</p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hidayatahmadd1377@gmail.com"
              className={cn(buttonVariants(), "cursor-pointer gap-2 px-6")}
            >
              <Mail className="h-4 w-4" />
              {t("sendEmail")}
            </a>
            <a
              href="https://github.com/Medskiyyy"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer gap-2 px-6")}
            >
              <Github className="h-4 w-4" />
              {t("viewGithub")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
