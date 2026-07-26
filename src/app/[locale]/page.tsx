import { getProjects } from "@/content/projects";
import HeroSection from "@/features/home/HeroSection";
import FeaturedProjectSection from "@/features/home/FeaturedProjectSection";
import SkillsSection from "@/features/home/SkillsSection";
import AboutPreviewSection from "@/features/home/AboutPreviewSection";
import ContactPreviewSection from "@/features/home/ContactPreviewSection";

/*
 * No generateMetadata here on purpose. The [locale] layout already sets the
 * title, description, and the full openGraph object — and because Next.js
 * shallow-replaces metadata fields rather than merging them, redeclaring
 * `openGraph` on this page silently dropped og:image and og:url from the
 * home page, which is the page most likely to be shared.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection />
      <FeaturedProjectSection projects={getProjects(locale)} />
      <SkillsSection />
      <AboutPreviewSection />
      <ContactPreviewSection />
    </main>
  );
}
