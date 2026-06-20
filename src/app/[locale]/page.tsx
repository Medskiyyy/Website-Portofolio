import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import HeroSection from "@/features/home/HeroSection";
import AboutPreviewSection from "@/features/home/AboutPreviewSection";
import SkillsSection from "@/features/home/SkillsSection";
import FeaturedProjectSection from "@/features/home/FeaturedProjectSection";
import AIWorkflowSection from "@/features/home/AIWorkflowSection";
import ResumePreviewSection from "@/features/home/ResumePreviewSection";
import GithubShowcaseSection from "@/features/home/GithubShowcaseSection";
import ContactPreviewSection from "@/features/home/ContactPreviewSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutPreviewSection />
      <SkillsSection />
      <FeaturedProjectSection />
      <AIWorkflowSection />
      <ResumePreviewSection />
      <GithubShowcaseSection />
      <ContactPreviewSection />
    </main>
  );
}
