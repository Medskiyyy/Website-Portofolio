import type { ProjectMeta } from "@/types/project";

/**
 * Language-independent facts. Order here is the order projects appear in the
 * grid. Prose for each slug lives in ./en.ts and ./id.ts.
 */
export const projectMeta: ProjectMeta[] = [
  {
    slug: "pempek-cek-lis",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Firebase", "Turborepo"],
    liveUrl: "https://pempekceklis.biz.id",
    githubUrl: "https://github.com/Medskiyyy/Website-Pempek",
    imageUrl: "/thumb-pempek.webp",
    isFeatured: true,
    status: "live",
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
  },
  {
    slug: "hitung-uang",
    techStack: ["Kotlin", "Jetpack Compose", "Dagger Hilt", "Room DB", "DataStore", "WorkManager", "Google ML Kit"],
    githubUrl: "https://github.com/Medskiyyy/HitungUang",
    imageUrl: "/thumb-hitung.webp",
    status: "source available",
    activeDevelopment: true,
  },
];

export const projectSlugs = projectMeta.map((p) => p.slug);
