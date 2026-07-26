/**
 * A project is split in two: `ProjectMeta` holds the facts that are identical
 * in every language (slug, stack, links, status), and `ProjectCopy` holds the
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
  status: "live" | "source available" | "in-progress" | "planned";
  /** Still being worked on — surfaces an extra badge on the case study page. */
  activeDevelopment?: boolean;
};

export type ProjectCopy = {
  title: string;
  /** Short label shown over the thumbnail, e.g. "Storefront & CMS". */
  category: string;
  role: string;
  timeline: string;
  description: string;
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
