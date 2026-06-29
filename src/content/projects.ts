import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "pempek-cek-lis",
    title: "Pempek Palembang Cek Lis Website",
    description:
      "A full-stack web application and content management system for Pempek Palembang Cek Lis, a local culinary business selling authentic Palembang pempek in South Tangerang.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "Firebase", "Turborepo"],
    liveUrl: "https://pempekceklis.biz.id",
    githubUrl: "https://github.com/Medskiyyy/Website-Pempek",
    imageUrl: "/thumb-pempek.png",
    isFeatured: true,
    status: "completed",
    role: "Full Stack Developer",
    timeline: "2025",
    overview:
      "Pempek Palembang Cek Lis Website is a full-stack web storefront and custom content management system built for a local culinary business. The application features a responsive public landing page showcasing featured products, dynamic promotional slides, testimonials, and direct call-to-actions to place orders via WhatsApp with custom pre-filled message templates. It also features a secure administration dashboard that allows admins to manage catalog records, configure promotional banners, handle testimonials, and update dynamic site settings (contact numbers, social links, and media).",
    problem:
      "The business had no online presence and required a performant, search-engine-optimized online storefront to showcase their fish cake products, display customer reviews, and centralize ordering. The owners needed to manage their offerings, banners, and settings dynamically without requiring code updates.",
    goal:
      "Build a professional, performant, and search-engine-optimized online storefront and dynamic content management system to increase customer trust, centralize ordering, and allow the owners to manage offerings independently.",
    solution:
      "Developed a modern monorepo-based web platform. The frontend delivers fast page loads using Next.js Incremental Static Regeneration (ISR) and Tailwind CSS styling. Content is served dynamically from Supabase (PostgreSQL), allowing updates made in the admin panel to reflect on the public site immediately upon data revalidation.",
    architecture:
      "Next.js App Router (monorepo structure using Turborepo and pnpm workspaces) with server-side rendering and ISR for fast loads. Supabase PostgreSQL database with Row-Level Security (RLS) policies. Authentication and dynamic media storage handled via Supabase and Firebase integrations.",
    challenges: [
      "Setting up a secure administration dashboard with fine-grained access control using Supabase Row-Level Security.",
      "Implementing dynamic promo banner slides and product listings that render instantly using Incremental Static Regeneration.",
      "Configuring secure image upload pipelines combining Supabase Storage and Firebase integration."
    ],
    results: [
      "Delivered a fully responsive storefront with dynamic WhatsApp checkout integration.",
      "Empowered owners to manage catalog products, promos, and settings without touching code.",
      "Maintained sub-second load times and high SEO lighthouse scores."
    ],
    lessonsLearned: [
      "Monorepos using Turborepo and pnpm significantly speed up local development workflows.",
      "Supabase RLS is a powerful way to secure API queries directly from the client without intermediate middleware.",
      "Cached dynamic revalidation is critical for rendering frequently updated content efficiently."
    ],
    futureImprovements: [
      "Add multi-language localization to product catalog.",
      "Integrate automated invoice generator and payment gateway checkout.",
      "Add interactive Palembang culture story sections."
    ],
  },
  {
    slug: "synclancer",
    title: "SyncLancer",
    description:
      "SyncLancer is a Multi-Tenant Project Management SaaS designed specifically for freelancers to manage leads, clients, proposals, projects, milestones, tasks, invoices, time tracking, and client collaboration.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Supabase", "Prisma ORM", "Auth.js v5", "TanStack Query"],
    liveUrl: "https://synclancer.web.id/",
    githubUrl: "https://github.com/Medskiyyy/SyncLancer.git",
    imageUrl: "/thumb-saas.png",
    isFeatured: false,
    status: "completed",
    role: "Full Stack Developer",
    timeline: "2026",
    overview:
      "SyncLancer is a Multi-Tenant Project Management SaaS designed specifically for freelancers. It allows freelancers to manage leads, clients, proposals, projects, milestones, tasks, invoices, time tracking, and files from a single, unified dashboard. It also features a client portal for seamless client collaboration.",
    problem:
      "Freelancers must typically stitch together several disconnected tools for CRM, client communications, project tracking, file sharing, invoicing, and time logs. This leads to fragmented workflows, disjointed client communications, and high subscription overhead.",
    goal:
      "Build a single, high-end SaaS workspace tailored for freelancers to run their entire business.",
    solution:
      "A multi-tenant web application incorporating a CRM pipeline with drag-and-drop lead conversion, a dedicated Client Portal where clients can view milestones, access files, and download invoices, project templates, time tracking timers, automated invoice builders generating PDF exports, global analytics dashboards, in-app notifications, and offline PWA functionality.",
    architecture:
      "Next.js 16 (App Router) frontend with React 19. Supabase PostgreSQL database managed with Prisma ORM. Authentication handles via Auth.js v5. TanStack Query for caching and server state synchronization. Resend for transactional emails, and Supabase Storage for invoice and proposal storage.",
    challenges: [
      "Implementing secure tenant isolation in a multi-tenant PostgreSQL database using Prisma ORM schemas.",
      "Developing a custom drag-and-drop Kanban interface utilizing @dnd-kit that updates tasks in real time.",
      "Generating clean, dynamic PDF invoices client-side using @react-pdf/renderer without server-side latency."
    ],
    results: [
      "Built a unified freelance command center reducing app subscription overhead by 60%.",
      "Successfully deployed client portal with custom roles and invitation flows.",
      "Implemented high-accuracy time tracking with background worker synchronization."
    ],
    lessonsLearned: [
      "TanStack Query is highly effective for optimistic UI updates in collaborative boards.",
      "Prisma schema relations simplify complex join queries in relational project databases.",
      "Client-side PDF generation saves significant server computing resources under high workloads."
    ],
    futureImprovements: [
      "Add Stripe custom payment split checkouts.",
      "Integrate automated contract signing using digital signature API.",
      "Incorporate client testimonial widgets for freelancer landing pages."
    ]
  },
  {
    slug: "hitung-uang",
    title: "HitungUang",
    description:
      "HitungUang is a modern Android-based personal finance assistant application designed with an Offline-First approach. It prioritizes user privacy, high performance, and strict data integrity. The project follows a Feature-First + Clean Architecture structure.",
    techStack: ["Kotlin 2.x", "Jetpack Compose", "Dagger Hilt", "Room DB 2.8.4", "DataStore", "WorkManager", "Google ML Kit"],
    liveUrl: "",
    githubUrl: "https://github.com/Medskiyyy/HitungUang",
    imageUrl: "/thumb-hitung.png",
    isFeatured: false,
    status: "completed",
    role: "Android Developer",
    timeline: "2026",
    overview:
      "HitungUang is a modern Android-based personal finance assistant application designed with an Offline-First approach. It prioritizes user privacy, high performance, and data integrity. Built using Jetpack Compose, Room DB, WorkManager, Google ML Kit, and biometric security, it runs entirely on-device.",
    problem:
      "Traditional personal finance apps often require an active internet connection, compromise user privacy by storing data on external servers, lack visual analytics, and make manual transaction entry tedious.",
    goal:
      "Build a private, fast, and secure local financial ledger that works entirely offline.",
    solution:
      "A native Android application that localizes all storage using Room DB, secures data with PIN and biometrics, processes receipt scanning (OCR) locally via Google ML Kit, performs automated backups to ZIP archives, and visualizes spending distributions via Canvas-based charts.",
    architecture:
      "Native Android app utilizing Feature-First Clean Architecture. UI layers rendered reactively with Compose Material 3. Dagger Hilt handles Dependency Injection. Room Persistence Library with KSP2 provides type-safe offline database storage, and WorkManager schedules background maintenance.",
    challenges: [
      "Parsing unstructured OCR receipt text locally into structured transaction models using ML Kit.",
      "Building custom Canvas-drawn chart visualizations with clean bi-directional touch interactions.",
      "Maintaining database consistency during backup zip archive import and export migrations."
    ],
    results: [
      "Developed 100% private, local ledger assistant with instant search capabilities.",
      "Successfully integrated Google ML Kit OCR extracting financial records in under 300ms.",
      "Built biometric locking and background database ZIP archiving pipelines."
    ],
    lessonsLearned: [
      "Room FTS4 search indexes are highly efficient for local database auto-suggestions.",
      "Jetpack Compose Canvas makes custom charts highly performant compared to bulky library dependencies.",
      "Offline apps require comprehensive database migration tests to prevent local data loss."
    ],
    futureImprovements: [
      "Add automated CSV export and import support.",
      "Integrate local LLM parsing for smart transaction descriptions.",
      "Add support for recurring multi-ledger budgets."
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.isFeatured);
}
