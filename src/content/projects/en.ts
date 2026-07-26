import type { ProjectCopy } from "@/types/project";

export const projectCopyEn: Record<string, ProjectCopy> = {
  "pempek-cek-lis": {
    title: "Pempek Palembang Cek Lis",
    category: "Storefront & CMS",
    role: "Solo developer, real business, unpaid",
    timeline: "Jun – Jul 2025",
    description:
      "A storefront and custom CMS for a pempek shop in Serpong, South Tangerang. The owner manages the menu, promo banners, reviews, and contact details from an admin panel instead of asking me to change the code.",
    overview:
      "A public storefront plus an admin panel for a local pempek business. I built it unpaid for a family friend's shop, which made it the first thing I have written that someone other than me depends on. The public side shows the menu with prices, promo banners, customer reviews, delivery areas, and shop hours, and sends orders to WhatsApp with the product already filled into the message. The admin side covers the menu, banners, reviews, and site settings such as the WhatsApp number and social links.",
    problem:
      "The shop had no website. Customers found it through Instagram and had to ask for the menu and prices in DMs, one conversation at a time. Anything I hard-coded would have meant the owner messaging me every time a price changed, so a static site was not a real option.",
    goal:
      "Give the shop a page it can send to customers that always shows current prices, and make sure every piece of content on it can be edited by the owner without touching the code or waiting for a deploy.",
    solution:
      "A Next.js App Router site reading content from Postgres on Supabase. Pages are statically generated and revalidated, so the public site stays fast but picks up admin edits without a rebuild. Orders skip a custom cart entirely: each product links to WhatsApp with a pre-filled message, which is how the shop already took orders.",
    architecture:
      "Turborepo monorepo with pnpm workspaces holding the public site and the admin panel. Supabase Postgres for content, with Row-Level Security so the anonymous client can read published rows but only an authenticated admin can write. Supabase Auth for admin login, Supabase Storage and Firebase for product and banner images. Deployed on Vercel.",
    challenges: [
      "Getting the Row-Level Security policies right so the public site could read the catalogue with the anon key while writes stayed locked to the admin session. The first version leaked write access through a policy that only checked authentication, not role.",
      "Choosing revalidation windows per content type. Prices need to update quickly; the about text does not. Revalidating everything aggressively removed the point of static generation.",
      "Two image backends (Supabase Storage and Firebase) is more moving parts than this project needed. It works, but if I rebuilt it today I would pick one.",
    ],
    results: [
      "Live at pempekceklis.biz.id with a 6-item menu, 3 promo banners, 4 customer reviews, and 5 delivery areas, all of it stored in Postgres and editable from the admin panel.",
      "The owner can change a price, swap a banner, or update the WhatsApp number without a code change or a redeploy.",
      "Orders open WhatsApp with the product already written into the message, so there is no order form or cart to maintain.",
    ],
    lessonsLearned: [
      "Row-Level Security is worth the setup cost, because the access rule lives next to the data instead of being re-implemented in every query.",
      "The owner did not want features, they wanted to stop answering the same DM. Reading the request that way changed what I built.",
      "A monorepo made sharing types between the public site and the admin panel easy, but it is more tooling than a two-app project strictly needs.",
    ],
    futureImprovements: [
      "Replace the placeholder WhatsApp number and the leftover test banner with real data.",
      "Consolidate image storage onto Supabase and drop the Firebase dependency.",
      "Add Indonesian and English versions of the menu descriptions.",
    ],
  },

  synclancer: {
    title: "SyncLancer",
    category: "Multi-tenant SaaS",
    role: "Solo developer, personal product",
    timeline: "Jun 2026 – present",
    description:
      "A self-initiated multi-tenant project management app for freelancers: leads, clients, proposals, projects, tasks, invoices, and time tracking in one place, with a portal clients can log into.",
    overview:
      "SyncLancer is my own product, not client work. I built it to find out what multi-tenancy actually involves. Each freelancer gets an isolated workspace covering a lead pipeline, clients, proposals, projects, milestones, tasks, invoices, time tracking, and files. Clients get a separate scoped login where they can see their own milestones, download files, and view invoices.",
    problem:
      "Freelancers typically run their business across a CRM, a chat app, a file drive, an invoicing tool, and a spreadsheet. Nothing is linked, so the same client exists five times. I wanted to see whether one schema could hold the whole workflow without becoming unusable.",
    goal:
      "Build a single workspace that covers a freelancer's business end to end, and use it as a way to learn tenant isolation, role-scoped access, and optimistic UI properly rather than in theory.",
    solution:
      "A multi-tenant Next.js app with a workspace boundary on every query. A drag-and-drop lead pipeline converts leads into clients, projects break into milestones and tasks, time entries roll up per project, and invoices render to PDF in the browser. Clients see a filtered view of the same data through a separate portal role.",
    architecture:
      "Next.js App Router with React on the frontend. Postgres on Supabase accessed through Prisma, with a workspace foreign key on every tenant-scoped table. Auth.js handles authentication and distinguishes owner from client-portal sessions. TanStack Query manages server state and optimistic updates, @dnd-kit powers the pipeline board, @react-pdf/renderer generates invoices client-side, Resend sends transactional email, and files live in Supabase Storage.",
    challenges: [
      "Tenant isolation is only as good as its weakest query. Enforcing it per-call was fragile, so scoping moved into a shared query layer that refuses to build a query without a workspace id.",
      "Optimistic updates on the Kanban board needed rollback that survives a failed reorder mid-drag. The naive version left the card in the wrong column after an error.",
      "The client portal shares tables with the owner view, so every field had to be classified as client-visible or not. That classification, not the UI, was the actual work.",
    ],
    results: [
      "Live at synclancer.web.id with the lead pipeline, projects, milestones, tasks, invoicing, and time tracking working end to end. I am still adding to it.",
      "Client portal ships with scoped roles and an invitation flow, so a client only ever loads their own workspace's rows.",
      "Invoices are generated as PDFs in the browser, which kept the server out of document rendering entirely.",
    ],
    lessonsLearned: [
      "Multi-tenancy is a data-access problem, not a feature. Deciding where the boundary is enforced is the whole design.",
      "TanStack Query's optimistic updates are excellent right up to the point where you need to unwind a failure. The rollback path deserves as much attention as the happy path.",
      "I scoped this far too wide for a solo project. A narrower version, shipped sooner, would have taught me the same things earlier.",
    ],
    futureImprovements: [
      "Get it in front of actual freelancers. Right now the only user is me, so nothing about the workflow has been tested against reality.",
      "Add payment collection so invoices can be settled in the app.",
      "Write integration tests around the tenant boundary, which is currently only verified by hand.",
    ],
  },

  "hitung-uang": {
    title: "HitungUang",
    category: "Offline-first Android",
    role: "Solo developer, personal project",
    timeline: "Jun 2026 – present",
    description:
      "An offline-first Android expense tracker that keeps everything on the device: no account, no server, no sync. Receipt scanning and charts run locally.",
    overview:
      "A native Android personal finance app with no backend at all. Transactions live in Room on the device, the app locks behind a PIN or biometrics, receipts are scanned with on-device OCR, spending charts are drawn with Compose Canvas, and backups export to a ZIP file the user controls. Not published to the Play Store, but the source is on GitHub and I am still building on it.",
    problem:
      "Most expense trackers ask you to create an account and upload your spending history to someone else's server, and then still need a connection to open. I wanted to know whether a useful version could exist with no server in the picture, and what that costs you in return.",
    goal:
      "Build a finance app that works with airplane mode on permanently, keeps every record on the device, and still makes entering a transaction fast enough that I would actually keep using it.",
    solution:
      "A native Compose app on Room, with the whole feature set built around local-only storage. ML Kit reads receipt text on-device and pre-fills a transaction the user confirms or corrects before saving. Charts are drawn directly with Canvas rather than pulling in a charting library. WorkManager handles background maintenance, and backup and restore go through a ZIP archive so the user owns their data.",
    architecture:
      "Feature-first Clean Architecture with a domain layer between the Compose UI and Room. Dagger Hilt for dependency injection, Room with KSP for the local database, DataStore for preferences, WorkManager for scheduled work, ML Kit for on-device text recognition, and AndroidX Biometric for the app lock.",
    challenges: [
      "OCR output is unstructured text, not fields. Mapping a receipt to an amount and a merchant needed heuristics, and the honest fix was to always show the parsed result for the user to correct rather than trusting it.",
      "Custom Canvas charts avoid a dependency but you own hit-testing, labels, and accessibility yourself. A library would have been the right call if the charts needed to do any more than they do.",
      "With no server, a bad database migration means permanently lost data. Migration tests mattered more here than anywhere else I've worked.",
    ],
    results: [
      "Fully functional with no network permission needed: Room for storage, PIN and biometric lock, and no account to create.",
      "On-device receipt scanning through ML Kit, with the parsed result always shown for confirmation before it is saved.",
      "Backup and restore as a user-held ZIP archive, with schema migrations covered by tests so an import cannot silently drop records.",
    ],
    lessonsLearned: [
      "Room's FTS4 indexes made local search fast enough that I stopped thinking about it, which is the point.",
      "Compose Canvas is genuinely pleasant for simple charts, and clearly the wrong tool the moment interaction gets complicated.",
      "Offline-first shifts the risk from the network to your migrations. That trade is worth making, but you have to actually pay for it in tests.",
    ],
    futureImprovements: [
      "CSV import and export, so records can be moved in and out without going through the ZIP backup.",
      "Recurring transactions and per-category budgets.",
      "Publish a signed build so it can be installed without cloning the repo.",
    ],
  },
};
