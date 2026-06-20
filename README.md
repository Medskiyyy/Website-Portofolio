# Personal Portfolio Codebase - Ahmad Hidayatullah

This repository contains the source code for the professional portfolio website of Ahmad Hidayatullah. The site is designed to showcase projects, technical skills, and detailed case studies, optimized for international recruiters and hiring managers.

Live URL: [website-portofolio-pi-ruby.vercel.app](https://website-portofolio-pi-ruby.vercel.app/)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Component Library**: shadcn/ui
- **Internationalization**: next-intl (Fully localized dynamic routing for `/en` and `/id`)
- **Theme Manager**: next-themes (Light/Dark/System support)
- **Icons**: lucide-react
- **Deployment**: Vercel

---

## ✨ Features

- **Pulsing Availability Badge**: In the header, showing "Open to Opportunities" or "Tersedia" depending on the locale.
- **Dynamic Projects Grid**: Responsive listing page showing custom visual thumbnails with hover zoom animations.
- **Detailed Case Studies**: Structural write-ups detailing Project Overview, Problem, Goal, Solution, Architecture, Challenges, and measurable Results.
- **GitHub Showcase Section**: Premium simulated GitHub repository cards on the home page highlighting active public codebases.
- **Dynamic Resume System**: Displays professional background, education, and automatically syncs project details directly from content data, with support for ATS-friendly PDF download.
- **SEO & Search Console Readiness**: Pre-configured robots.txt, dynamic sitemap.xml, custom OpenGraph meta imagery, and layout metadata tags.

---

## 📐 Project Structure

```text
portfolio/
├── messages/               # Localization strings (en.json, id.json)
├── public/                 # Static assets (thumbnails, resume PDF, avatar image)
└── src/
    ├── app/                # Next.js App Router root layout & localized segments
    ├── components/         # Global reusable UI primitives (buttons, input)
    ├── content/            # Static project database and case study details
    ├── features/           # Feature modules (home page sections, contact, projects)
    ├── i18n/               # next-intl configuration, routing, and navigation helpers
    ├── lib/                # Utility helpers (cn classes merger)
    ├── shared/             # Layout templates (Navbar, Footer, shell structures)
    └── types/              # Global TypeScript declarations
```

---

## 📥 Local Development

### 1. Install Dependencies
Make sure you have [pnpm](https://pnpm.io/) installed:
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view it.

### 3. Build for Production
```bash
pnpm build
```

### 4. Run Linter
```bash
pnpm run lint
```

---

## 📝 License
Personal Portfolio Project. All rights reserved.
