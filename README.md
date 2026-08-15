# Ahmad Hidayatullah | Portfolio

Bilingual (EN/ID) portfolio. Four projects with case studies, a resume page, and contact details.

**Live:** https://website-portofolio-pi-ruby.vercel.app

---

## Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=fff&style=flat-square)
![next-intl](https://img.shields.io/badge/next--intl-000?logo=next.js&logoColor=fff&style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=flat-square)

---

## Projects

| Project | Type | Status | Links |
| :--- | :--- | :--- | :--- |
| **Pempek Palembang Cek Lis** | Full-stack web (Next.js + Supabase) | Live | [Site](https://pempekceklis.biz.id) · [GitHub](https://github.com/Medskiyyy/Website-Pempek) |
| **SyncLancer** | Full-stack SaaS (Next.js + Supabase) | Live | [Site](https://synclancer.web.id) · [GitHub](https://github.com/Medskiyyy/SyncLancer) |
| **Mother** | Native Android (Kotlin + Jetpack Compose) | In progress | [GitHub](https://github.com/Medskiyyy/Mother) |
| **HitungUang** | Native Android (Kotlin + Jetpack Compose) | In progress | [GitHub](https://github.com/Medskiyyy/HitungUang) |

The Mother project card on the site shows a live interactive prototype built directly from the Jetpack Compose source, so visitors can see the actual app UI without installing anything.

---

## Content

Three places to edit when updating the site:

- **`src/content/projects/`** — Case studies split by language. `meta.ts` holds the facts that do not vary (slug, stack, links, status); `en.ts` and `id.ts` hold the prose. Adding a slug to all three files is enough to create a project card, a case study page, and a sitemap URL.
- **`src/content/profile.ts`** — Email, GitHub link, resume path, location. Shared across all pages and the JSON-LD schema.
- **`messages/en.json` and `messages/id.json`** — All interface copy. No strings live inside components. Both files must have the same keys.

---

## License

Personal project. All rights reserved.
