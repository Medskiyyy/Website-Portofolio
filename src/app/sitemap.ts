import { MetadataRoute } from 'next';
import { projectSlugs } from '@/content/projects';
import { siteUrl, locales } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/resume', '/about', '/contact'];
  const lastModified = new Date();

  // The bare origin is deliberately absent: it 307-redirects to the default
  // locale, and a sitemap should only list URLs that respond directly.
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
