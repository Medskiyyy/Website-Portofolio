/**
 * Canonical origin for the deployed site. Metadata, the sitemap, and robots.txt
 * all read from here so they can never drift apart again.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project to switch to a custom domain;
 * the fallback is the current production deployment.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ahmadhidayatullah.my.id";

export const locales = ["en", "id"] as const;
