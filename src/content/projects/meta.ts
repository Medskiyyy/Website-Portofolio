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
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Auth.js v5",
      "Tailwind CSS",
      "Supabase",
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
      "Room Database",
      "Foreground Service",
      "Coroutines Flow",
    ],
    githubUrl: "https://github.com/Medskiyyy/Mother.git",
    imageUrl: "/thumb-mother.jpg",
    status: "source available",
    activeDevelopment: true,
    aspectRatio: "portrait",
  },
  {
    slug: "hitung-uang",
    techStack: [
      "Kotlin 2.x",
      "Jetpack Compose",
      "Clean Architecture",
      "Room FTS4",
      "Dagger Hilt",
      "Google ML Kit",
    ],
    githubUrl: "https://github.com/Medskiyyy/HitungUang",
    imageUrl: "/thumb-hitung.jpg",
    status: "source available",
    activeDevelopment: true,
    aspectRatio: "portrait",
  },
];

export const projectSlugs = projectMeta.map((p) => p.slug);
