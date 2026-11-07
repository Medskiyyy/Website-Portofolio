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
    <main className="pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="section-shell">
        <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <Reveal amount={0.1}>
          <ul className="grid gap-4 lg:grid-cols-3">
            {contactMethods.map((method) => (
              <li key={method.label}>
                <a
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-[24px] bg-muted p-6 transition-colors duration-200 hover:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)] sm:p-7"
                >
                  <span className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                    {method.label}
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </span>
                  <span className="display mt-8 block text-lg leading-snug break-all">
                    {method.value}
                  </span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-muted-foreground">
                    {method.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">{t("note")}</p>
        </Reveal>
      </div>
    </main>
  );
}
