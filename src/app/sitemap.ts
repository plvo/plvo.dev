import { getAllPaths, SITE_URL } from '@/lib/utils';

export default async function sitemap() {
  const paths = getAllPaths();

  const notes = paths.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...notes];
}
