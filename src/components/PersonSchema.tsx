import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

/**
 * schema.org Person markup. This is what search engines read when someone
 * googles the name directly — it ties the site, the photo, the location, the
 * university, and the public profiles together into one entity.
 *
 * New profile links only need adding to `profile.socialUrls`.
 */
export default function PersonSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${siteUrl}/${locale}`,
    // Only ever a real photograph — see the note on profile.photoUrl.
    ...(profile.photoUrl ? { image: `${siteUrl}${profile.photoUrl}` } : {}),
    email: `mailto:${profile.email}`,
    jobTitle: "Full-Stack Web & Android Developer",
    description:
      "Information Systems student building full-stack web applications with Next.js and TypeScript, and native Android applications with Kotlin.",
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressRegion: profile.region,
      addressCountry: profile.country,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Gunadarma University",
    },
    knowsLanguage: ["id-ID", "en"],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Kotlin",
      "Jetpack Compose",
      "Android development",
    ],
    seeks: {
      "@type": "Demand",
      name: "Part-time internship or freelance software development work",
    },
    sameAs: profile.socialUrls,
  };

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled object — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
