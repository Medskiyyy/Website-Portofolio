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
    <main className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[130px] pointer-events-none" />

      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <AnimatedSection delay={0.05}>
            <p className="eyebrow">{t("label")}</p>
            <h1 className="font-heading mt-4 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
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
                className="double-bezel-wrapper h-full block group"
              >
                <div className="double-bezel-inner h-full flex cursor-pointer items-start justify-between gap-4 p-6 sm:p-8 transition-colors duration-500 hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform duration-300">
                      {method.icon}
                    </span>
                    <div>
                      <p className="font-heading font-bold text-lg text-card-foreground">{method.label}</p>
                      <p className="mt-1 text-sm font-semibold text-primary transition-colors group-hover:text-primary-foreground">{method.value}</p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty">{method.description}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 duration-300" />
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
