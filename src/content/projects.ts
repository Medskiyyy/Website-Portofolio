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
    imageUrl: "/thumb-pempek.png",
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
  {
    slug: "hitung-uang",
    title: "HitungUang",
    description:
      "An offline-first personal finance Android application built with modern Kotlin and Jetpack Compose to manage ledger, budgets, and scan receipts.",
    techStack: ["Kotlin", "Jetpack Compose", "Room DB", "Dagger Hilt", "ML Kit"],
    liveUrl: "",
    githubUrl: "https://github.com/Medskiyyy/HitungUang",
    imageUrl: "/thumb-hitung.png",
    isFeatured: false,
    status: "in-progress",
    role: "Android Developer & UI Designer",
    timeline: "2026",
    overview:
      "HitungUang is a personal finance Android application built with an offline-first architecture, prioritizing user privacy, performance, and data integrity. Built using Compose Material 3, Dagger Hilt, and Room FTS4 search.",
    problem:
      "Most finance trackers require account syncing, display obtrusive ads, compromise privacy, and lack offline tools to parse receipts or manage physical wallets securely.",
    goal:
      "Build a fast, secure, and offline-first mobile app using Jetpack Compose that automates transaction inputs from receipt photos, secures records locally, and manages budgets with no cloud dependence.",
    solution:
      "Developed a native Android app leveraging Room database for lightning-fast queries, Google ML Kit for offline OCR receipt scanning, WorkManager for background jobs, and Biometric authentication.",
    architecture:
      "Native Android built with Feature-First Clean Architecture. Room Persistence Library for structured local data, Dagger Hilt for Dependency Injection, and Jetpack Compose for reactive Material 3 UI.",
    challenges: [
      "Parsing and structure-matching unstructured text results from local Google ML Kit OCR scanner.",
      "Optimizing database search query times to keep search suggestions under 100ms using Room FTS4.",
      "Maintaining transactional integrity across multi-account transfers and balance checks."
    ],
    results: [
      "Built a fully functional offline-first Android MVP with ZIP backup and restore capabilities.",
      "Successfully integrated offline OCR receipt parser extracting amounts and dates with high accuracy.",
      "Ensured maximum privacy and speed with 100% on-device local storage and biometric lock."
    ],
    lessonsLearned: [
      "Modular feature-first layouts enhance codebase organization and make UI testing far simpler.",
      "Offline-first apps require thorough local synchronization locks to prevent database corruption during concurrent writes.",
      "Google ML Kit performs incredibly well on-device without incurring any latency or cloud costs."
    ],
    futureImprovements: [
      "Integrate local charts utilizing native Canvas API for detailed budget insights.",
      "Add automated database migration tests to ensure zero data loss during schema updates.",
      "Implement advanced categorization using local NLP models."
    ]
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    description:
      "A premium, real-time analytics dashboard SaaS product built with Next.js, Go, PostgreSQL, and interactive charts.",
    techStack: ["Next.js", "Go", "PostgreSQL", "Redis", "Tailwind CSS", "Recharts"],
    liveUrl: "",
    githubUrl: "https://github.com/Medskiyyy/saas-dashboard",
    imageUrl: "/thumb-saas.png",
    isFeatured: false,
    status: "completed",
    role: "Full Stack Developer",
    timeline: "2026",
    overview:
      "SaaS Dashboard is a full-stack, real-time analytics platform built to monitor service usage, track subscriptions, and visualize client conversion rates. Built with a Next.js frontend and a Go microservice backend, it handles high-throughput events efficiently.",
    problem:
      "Many analytics dashboards are slow to render, expensive to scale, and struggle to process high-frequency real-time event logging without significant database bottlenecks.",
    goal:
      "Create a fast, responsive, and cost-effective analytics dashboard capable of logging and visualizing real-time metrics with sub-second latency.",
    solution:
      "Implemented a Go service for high-performance event ingestion, Redis for cache-aside queuing, PostgreSQL for relational ledger logging, and Next.js with Server-Sent Events (SSE) for dynamic updates.",
    architecture:
      "Next.js frontend using Server Components for page rendering and Client Components for Recharts visualization. Go REST API backend. PostgreSQL for historical logs, Redis for caching/rate-limiting.",
    challenges: [
      "Handling concurrent real-time database insertions during traffic spikes without database lockouts.",
      "Optimizing charts rendering on the client side to avoid layout shifts and browser freezing."
    ],
    results: [
      "Handled thousands of concurrent event logs per second in stress tests.",
      "Lighthouse performance score above 95 with optimized chart bundle sizes.",
      "Dashboard renders data changes instantly using Server-Sent Events."
    ],
    lessonsLearned: [
      "Go is exceptionally suited for concurrent microservices due to goroutines and low memory footprints.",
      "Redis cache-aside queuing is critical to buffer database insertions during traffic spikes."
    ],
    futureImprovements: [
      "Add dynamic user alert triggers via Slack or Discord webhooks.",
      "Integrate Stripe subscription payments for client workspaces.",
      "Implement multi-tenant database isolation patterns."
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.isFeatured);
}
