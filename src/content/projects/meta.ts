import type { ProjectMeta } from "@/types/project";

/**
 * Language-independent facts. Order here is the order projects appear in the
 * grid. Prose for each slug lives in ./en.ts and ./id.ts.
 */
export const projectMeta: ProjectMeta[] = [
  {
    slug: "pempek-cek-lis",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Turborepo"],
    liveUrl: "https://pempekceklis.biz.id",
    githubUrl: "https://github.com/Medskiyyy/Website-Pempek",
    imageUrl: "/thumb-pempek.webp",
    isFeatured: true,
    status: "live",
    aspectRatio: "landscape",
  },
  {
    slug: "synclancer",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "Auth.js",
      "TanStack Query",
    ],
    liveUrl: "https://synclancer.web.id/",
    githubUrl: "https://github.com/Medskiyyy/SyncLancer.git",
    imageUrl: "/thumb-saas.webp",
    status: "live",
    activeDevelopment: true,
    aspectRatio: "landscape",
  },
  {
    slug: "mother",
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Room DB",
      "Coroutines & Flow",
      "Foreground Service",
    ],
    githubUrl: "https://github.com/Medskiyyy/Mother.git",
    imageUrl: "/thumb-mother.webp",
    status: "source available",
    activeDevelopment: true,
    aspectRatio: "portrait",
  },
  {
    slug: "hitung-uang",
    techStack: ["Kotlin", "Jetpack Compose", "Dagger Hilt", "Room DB", "DataStore", "WorkManager", "Google ML Kit"],
    githubUrl: "https://github.com/Medskiyyy/HitungUang",
    imageUrl: "/thumb-hitung.webp",
    status: "source available",
    activeDevelopment: true,
    aspectRatio: "portrait",
  },
];

export const projectSlugs = projectMeta.map((p) => p.slug);
