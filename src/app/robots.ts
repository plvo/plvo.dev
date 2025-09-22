import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog'],
      disallow: ['/_next', '/api', '/*.webm$', '/*.png$', '/*.svg$', '/*.json$', '/*.ttf$'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}