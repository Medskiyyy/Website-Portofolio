import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "pempek-cek-lis",
    title: "Pempek Cek Lis",
    description:
      "A business website built to showcase products, improve online presence, and streamline customer ordering for a local food business.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://pempekceklist.com",
    githubUrl: "https://github.com/Medskiyyy",
    isFeatured: true,
    status: "completed",
    role: "Full Stack Developer",
    timeline: "2025",
    overview:
      "Pempek Cek Lis is a full-stack business website built for a local pempek (Indonesian fishcake) business. The site allows customers to browse the full product catalog, view pricing, and reach out for orders via WhatsApp — removing the friction of manual, chat-based inquiries.",
    problem:
      "The business had no online presence and relied entirely on word-of-mouth and direct messaging. Customers had no way to browse products independently, leading to repetitive manual inquiries and missed opportunities.",
    goal:
      "Build a professional, fast, and mobile-first business website that clearly presents the product catalog, builds customer trust, and drives orders through direct contact channels.",
    solution:
      "Developed a modern, responsive Next.js website with a product catalog, pricing display, WhatsApp integration for ordering, and an optimized SEO structure to improve local discoverability.",
    architecture:
      "Next.js App Router with server-side rendering for fast initial load. Tailwind CSS for styling. Supabase for future backend capabilities. Vercel for deployment with automatic CI/CD.",
    challenges: [
      "Designing a product layout that works across all screen sizes without a CMS.",
      "Optimizing images and load speed for mobile users on slow connections.",
      "Making the site feel professional without over-engineering the architecture.",
    ],
    results: [
      "Business gained a professional online presence for the first time.",
      "Customers can independently browse products without reaching out manually.",
      "Lighthouse performance score above 90.",
    ],
    lessonsLearned: [
      "Keep the architecture simple when the project scope is clearly defined.",
      "Mobile-first design significantly improves usability for the target audience.",
      "Prioritize performance early — images and fonts are the biggest bottlenecks.",
    ],
    futureImprovements: [
      "Add an online ordering system with WhatsApp deep links per product.",
      "Integrate a simple CMS so the owner can update products without a developer.",
      "Add Google Maps integration for store location.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.isFeatured);
}
