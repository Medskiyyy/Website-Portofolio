# Ahmad Hidayatullah, Portfolio

A bilingual (EN/ID) portfolio site for **Ahmad Hidayatullah**, an Information Systems student building
full-stack web apps and native Android apps. It holds the project case studies, a resume page, and
contact details.

**Live:** https://website-portofolio-pi-ruby.vercel.app

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui on Base UI primitives
- **i18n:** next-intl, with `/en` and `/id` prefixes routed through `src/proxy.ts`
- **Theming:** next-themes (light / dark / system)
- **Animation:** Framer Motion, via the single `Reveal` / `Stagger` primitive in `src/components/motion.tsx`
- **Icons:** lucide-react
- **Hosting:** Vercel

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /en
pnpm build        # production build + type check
pnpm lint
```

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used by metadata, `sitemap.xml`, and `robots.txt`. Set this when moving to a custom domain. | the current Vercel URL |

Everything else is static. There is no CMS and no database. Content lives in
`src/content/`.

## Content

Editing the site means editing three places:

- `src/content/projects/`. The case studies, split so prose can be translated without
  duplicating the facts. `meta.ts` holds what does not vary by language (slug, stack,
  links, status); `en.ts` and `id.ts` hold the prose. Adding a slug to all three adds a
  card to the projects grid, an entry on the resume page, a `/projects/<slug>` page, and
  a sitemap URL.
- `src/content/profile.ts`. Email, GitHub URL, resume path, location, photo. Single
  source of truth.
- `messages/en.json` and `messages/id.json`. All interface copy. The two files must have
  the same key set; a key present in only one locale throws at render time.

## Structure

```text
portfolio/
├── messages/               # en.json, id.json: all copy, no strings in components
├── public/                 # project thumbnails (webp), resume.pdf
└── src/
    ├── app/                # root layout, [locale] segments, sitemap, robots, manifest,
    │                       # generated opengraph-image and apple-icon
    ├── components/         # motion primitives, Person schema, shadcn/ui
    ├── content/            # projects/ (meta + per-locale prose), profile.ts
    ├── features/           # home/ and projects/ section components
    ├── i18n/               # next-intl routing, navigation, request config
    ├── lib/                # site.ts (canonical URL), utils.ts
    ├── shared/             # Navbar, Footer
    └── types/              # shared type declarations
```

## Conventions

- **One entrance animation per element.** `Reveal` and `StaggerGroup`/`StaggerItem` are the only
  motion primitives. No pointer-tracking, tilt, or layered hover effects.
- **No hardcoded user-facing strings** in components, `aria-label`s included. They belong in
  `messages/`.
- **Claims must be checkable.** Case study results describe what shipped and what it does.
  Performance numbers are only included when there is a way for a reader to verify them.
- **No em dashes in copy.** They read as machine-written. Restructure the sentence instead.

## License

Personal project. All rights reserved.
