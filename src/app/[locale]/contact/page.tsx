import { getTranslations } from "next-intl/server";
import { Mail, Github, ExternalLink } from "lucide-react";
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
    <main className="py-16 md:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t("label")}</p>
          <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className="surface-card group flex cursor-pointer items-start justify-between gap-4 rounded-lg p-6 transition-colors hover:border-primary/35"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                  {method.icon}
                </span>
                <div>
                  <p className="font-heading font-semibold text-card-foreground">{method.label}</p>
                  <p className="mt-1 text-sm font-medium text-primary">{method.value}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{method.description}</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <div className="mx-auto mt-4 max-w-4xl rounded-lg border border-dashed border-border bg-card/70 p-5 text-center">
          <p className="text-sm text-muted-foreground">{t("linkedinComingSoon")}</p>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          {t("note")}
        </p>
      </div>
    </main>
  );
}
