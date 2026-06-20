import { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ahmadhidayatullah.com';
  const locales = ['en', 'id'];

  const staticRoutes = ['', '/projects', '/resume', '/about', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  // Root redirect
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  });

  // Static pages per locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    // Project case study pages
    for (const project of projects) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
