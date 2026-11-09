import type { ProjectMeta } from "@/types/project";

/**
 * Language-independent facts. Order here is the order projects appear in the
 * grid. Prose for each slug lives in ./en.ts and ./id.ts.
 */
export const projectMeta: ProjectMeta[] = [
  {
    slug: "pempek-cek-lis",
    accent: "#205B23",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Turborepo"],
    liveUrl: "https://pempekceklis.biz.id",
    githubUrl: "https://github.com/Medskiyyy/Website-Pempek",
    imageUrl: "/thumb-pempek.webp",
    isFeatured: true,
    aspectRatio: "landscape",
  },
  {
    slug: "synclancer",
    accent: "#2563EB",
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
    aspectRatio: "landscape",
  },
  {
    slug: "mother",
    accent: "#E0B400",
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
    aspectRatio: "portrait",
  },
  {
    slug: "hitung-uang",
    accent: "#0F6E62",
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
    aspectRatio: "portrait",
  },
];

export const projectSlugs = projectMeta.map((p) => p.slug);
