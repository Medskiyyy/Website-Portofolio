import type { ProjectCopy } from "@/types/project";

export const projectCopyEn: Record<string, ProjectCopy> = {
  "pempek-cek-lis": {
    title: "Pempek Palembang Cek Lis",
    category: "Storefront & CMS",
    role: "Solo developer, for a working local business",
    timeline: "May - Jul 2026",
    description:
      "A storefront and custom CMS for a pempek shop in Serpong, South Tangerang. The owner manages the menu, promo banners, reviews, and contact details from an admin panel instead of asking me to change the code.",
    outcome:
      "The owner changes the menu, prices, and promos from an admin panel, and orders go straight to WhatsApp.",
    highlights: [
      "Still used by the shop today",
      "Row-Level Security: visitors can only read, only the admin can write",
      "Static pages that pick up edits without a redeploy",
    ],
    overview:
      "A public storefront plus an admin panel for a local pempek business. I built it unpaid for a family friend's shop, which made it the first thing I have written that someone other than me depends on. The public side shows the menu with prices, promo banners, customer reviews, delivery areas, and shop hours, and sends orders to WhatsApp with the product already filled into the message. The admin side covers the menu, banners, reviews, and site settings such as the WhatsApp number and social links.",
    problem:
      "The shop had no website. Customers found it through Instagram and had to ask for the menu and prices in DMs, one conversation at a time. Anything I hard-coded would have meant the owner messaging me every time a price changed, so a static site was not a real option.",
    goal:
      "Give the shop a page it can send to customers that always shows current prices, and make sure every piece of content on it can be edited by the owner without touching the code or waiting for a deploy.",
    solution:
      "A Next.js App Router site reading content from Postgres on Supabase. Pages are statically generated and revalidated, so the public site stays fast but picks up admin edits without a rebuild. Orders skip a custom cart entirely: each product links to WhatsApp with a pre-filled message, which is how the shop already took orders.",
    architecture:
      "Turborepo monorepo with pnpm workspaces holding the public site and the admin panel. Supabase Postgres for content, with Row-Level Security so the anonymous client can read published rows but only an authenticated admin can write. Supabase Auth for admin login, and Supabase Storage for product and banner images. Deployed on Vercel.",
    challenges: [
      "Getting the Row-Level Security policies right so the public site could read the catalogue with the anon key while writes stayed locked to the admin session. The first version leaked write access through a policy that only checked authentication, not role.",
      "Choosing revalidation windows per content type. Prices need to update quickly; the about text does not. Revalidating everything aggressively removed the point of static generation.",
    ],
    results: [
      "Live at pempekceklis.biz.id and still used by the shop, with the menu, promo banners, reviews, and delivery areas all stored in Postgres and editable from the admin panel.",
      "The owner can change a price, swap a banner, or update the WhatsApp number without a code change or a redeploy.",
      "Orders open WhatsApp with the product already written into the message, so there is no order form or cart to maintain.",
    ],
    lessonsLearned: [
      "Row-Level Security is worth the setup cost, because the access rule lives next to the data instead of being re-implemented in every query.",
      "The owner did not want features, they wanted to stop answering the same DM. Reading the request that way changed what I built.",
      "A monorepo made sharing types between the public site and the admin panel easy, but it is more tooling than a two-app project strictly needs.",
    ],
    futureImprovements: [],
  },

  synclancer: {
    title: "SyncLancer",
    category: "Multi-tenant SaaS",
    role: "Solo developer, personal product",
    timeline: "Jun 2026 - present",
    description:
      "A multi-tenant project management app for freelancers: leads, clients, proposals, projects, tasks, invoices, and time tracking in one place, with a portal clients can log into.",
    outcome:
      "One workspace for freelancers: leads, proposals, projects, invoices, and a portal for their clients.",
    highlights: [
      "Each workspace's data is isolated through one shared query layer",
      "Recurring invoices generated automatically by a cron job",
      "Invoice and proposal PDFs rendered in the browser",
    ],
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

  mother: {
    title: "Mother",
    category: "Productivity & Focus",
    role: "Solo developer, personal project",
    timeline: "Aug 2026 - present",
    description:
      "An offline Android planner I use myself: habits, focus sessions, tasks with deadlines, and reminders, with no account and no server.",
    outcome:
      "Habits, a focus timer, and tasks with deadlines in one Android app, released as an installable APK on GitHub.",
    highlights: [
      "Focus timer runs as a Foreground Service with controls in the notification",
      "Task colours change automatically as the deadline gets closer",
      "New versions ship through GitHub Releases with an in-app updater",
    ],
    overview:
      "Mother is the planner I built for myself in August 2026 so I could stop splitting my day across a habit tracker, a Pomodoro timer, and a to-do app. It runs entirely offline on Room: habits with reminders, study sessions with a focus timer, tasks with required deadlines, a calendar, search, backups, and a home-screen widget. The interface uses a neobrutalist design system I built in Compose, with separate light and dark themes. It is past version 3.6, and new versions ship as APKs through GitHub Releases, which the app checks for on its own.",
    problem:
      "My study routine lived in three apps that knew nothing about each other, so a focus session never counted toward a habit and a deadline never showed up next to the day's schedule. Android is also strict about background work, so a timer or an alarm that is not built for it simply stops once the screen is off.",
    goal:
      "One offline app where a study session, a habit, and a task deadline are part of the same data, and where a running timer or a reminder keeps working with the phone locked.",
    solution:
      "A native Kotlin app with Jetpack Compose and Room in an MVVM structure. The focus timer runs as a Foreground Service with a live chronometer and controls in its notification. The dashboard streak counts consecutive days with a study session. Task cards change colour by how close the deadline is, and reminders can be set per habit, task, and schedule item.",
    architecture:
      "MVVM with StateFlow between the Compose screens and Room. Reminders and attachments live in separate tables per owner (tasks, schedules, habits) instead of one shared table, with versioned migrations between schema changes. Kotlin Coroutines and Flow carry data to the UI, a Foreground Service runs the timer, and reminders go through a broadcast receiver and a full-screen alarm activity.",
    challenges: [
      "Habit alarms did not appear over the lock screen on my own phone. The cause was not the alarm code: from Android 14 the USE_FULL_SCREEN_INTENT permission is no longer granted automatically, and on my phone it was denied. The fix was a prompt that checks the permission whenever the app resumes and opens the right settings page.",
      "Keeping the timer correct after the app is closed or the phone is locked meant moving it out of the UI entirely and into a Foreground Service that both the notification and the app read from.",
      "Reminders, backups, and undo affect each other more than they seem to: restoring a backup has to reschedule every reminder, and undoing a deleted task has to bring its reminders back as well.",
    ],
    results: [
      "Version 3.6.4 released as an installable APK through GitHub Releases, with an in-app updater.",
      "A focus timer with lock-screen controls, a streak counted by study days, and tasks coloured by deadline.",
      "Calendar, search, reminders, backup and restore, and a home-screen widget, all without a network connection.",
    ],
    lessonsLearned: [
      "Alarms and background work depend on the permissions and battery rules of the actual phone, so they have to be tested there, not just read in the code.",
      "Separate reminder tables per owner meant more code up front, in exchange for real foreign keys and simpler queries.",
    ],
    futureImprovements: [
      "Test the latest reminder and alarm fixes on more phones than my own.",
    ],
  },

  "hitung-uang": {
    title: "HitungUang",
    category: "Offline-first Android",
    role: "Solo developer, personal project",
    timeline: "Jun 2026 - present",
    description:
      "An offline-first Android expense tracker that keeps everything on the device: no account, no server, no sync. Receipt scanning and charts run locally.",
    outcome:
      "An expense tracker with no account and no server. All the data stays on the user's phone.",
    highlights: [
      "Receipt scanning with OCR that runs on the device",
      "Instant transaction search with Room FTS4",
      "ZIP backups the user keeps",
    ],
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
      "OCR output is unstructured text, not fields. Mapping a receipt to an amount and a merchant needed heuristics, so the app always shows the parsed result for the user to correct instead of trusting it.",
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
