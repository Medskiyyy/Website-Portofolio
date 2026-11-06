import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/Heading";
import { Reveal } from "@/components/motion";
import { profile } from "@/content/profile";

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
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      description: t("emailDesc"),
    },
    {
      label: "WhatsApp / Phone",
      value: profile.phone,
      href: profile.whatsappUrl,
      description: t("phoneDesc"),
      external: true,
    },
    {
      label: "GitHub",
      value: profile.githubHandle,
      href: profile.githubUrl,
      description: t("githubDesc"),
      external: true,
    },
  ];

  return (
    <main className="py-14 md:py-20">
      <div className="section-shell">
        <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <Reveal amount={0.1}>
          <ul>
            {contactMethods.map((method, i) => (
              <li key={method.label} className="border-b border-border">
                <a
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
                >
                  <span className="eyebrow md:col-span-3">
                    <span className="mr-2 text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {method.label}
                  </span>
                  <span className="md:col-span-9">
                    <span className="display inline-flex items-baseline gap-2 break-all text-2xl leading-tight transition-colors group-hover:text-primary sm:text-4xl">
                      {method.value}
                      <ArrowUpRight className="h-5 w-5 shrink-0 self-center text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </span>
                    <span className="mt-3 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {method.description}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 md:grid md:grid-cols-12 md:gap-8">
          <p className="display max-w-2xl text-xl leading-relaxed text-pretty text-muted-foreground italic md:col-span-9 md:col-start-4">
            {t("note")}
          </p>
        </Reveal>
      </div>
    </main>
  );
}
