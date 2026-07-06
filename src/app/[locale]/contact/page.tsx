import { getTranslations } from "next-intl/server";
import { Mail, Github, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

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
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "hidayatahmadd1377@gmail.com",
      href: "mailto:hidayatahmadd1377@gmail.com",
      description: t("emailDesc"),
    },
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      value: "github.com/Medskiyyy",
      href: "https://github.com/Medskiyyy",
      description: t("githubDesc"),
      external: true,
    },
  ];

  return (
    <main className="border-b border-border bg-background py-28 md:py-36">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <AnimatedSection delay={0.05}>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-foreground md:text-6xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </AnimatedSection>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {contactMethods.map((method, idx) => (
            <AnimatedSection key={method.label} delay={0.1 + idx * 0.1} className="h-full">
              <a
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="surface-card block h-full p-6 transition-colors duration-200 hover:border-primary/35 sm:p-8"
              >
                <div className="flex cursor-pointer items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                      {method.icon}
                    </span>
                    <div>
                      <p className="font-heading font-bold text-lg text-card-foreground">{method.label}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">{method.value}</p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty">{method.description}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <p className="mx-auto mt-16 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground text-pretty">
            {t("note")}
          </p>
        </AnimatedSection>
      </div>
    </main>
  );
}
