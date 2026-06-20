import { getTranslations } from "next-intl/server";
import { Mail, Github, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "hidayatahmadd1377@gmail.com",
      href: "mailto:hidayatahmadd1377@gmail.com",
      description: t("emailDesc"),
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/Medskiyyy",
      href: "https://github.com/Medskiyyy",
      description: t("githubDesc"),
      external: true,
    },
  ];

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Contact Cards */}
      <div className="space-y-4">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target={method.external ? "_blank" : undefined}
            rel={method.external ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {method.icon}
              </span>
              <div>
                <p className="font-semibold text-card-foreground">{method.label}</p>
                <p className="text-sm text-primary">{method.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
        ))}
      </div>

      {/* LinkedIn placeholder */}
      <div className="mt-4 rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">{t("linkedinComingSoon")}</p>
      </div>

      {/* Note */}
      <p className="mt-10 text-center text-sm text-muted-foreground leading-relaxed">
        {t("note")}
      </p>
    </main>
  );
}
