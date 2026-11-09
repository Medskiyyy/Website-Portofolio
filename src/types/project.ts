/**
 * A project is split in two: `ProjectMeta` holds the facts that are identical
 * in every language (slug, stack, links), and `ProjectCopy` holds the
 * prose, which exists once per locale. `Project` is the two merged together,
 * which is what components receive.
 */
export type ProjectMeta = {
  slug: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  /** Brand colour of the project; drives its dot, tint, and highlight across the site. */
  accent: string;
  /** Presentation format: landscape for web apps, portrait for mobile/Android apps */
  aspectRatio?: "landscape" | "portrait";
};

export type ProjectCopy = {
  title: string;
  /** Short label shown over the thumbnail, e.g. "Storefront & CMS". */
  category: string;
  role: string;
  timeline: string;
  description: string;
  /** One sentence on what the project does for the people who use it; leads its card on the home page. */
  outcome: string;
  /** Three short, verifiable points shown under the outcome on the home page. */
  highlights: string[];
  overview: string;
  problem: string;
  goal: string;
  solution: string;
  architecture: string;
  challenges: string[];
  results: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
};

export type Project = ProjectMeta & ProjectCopy;
