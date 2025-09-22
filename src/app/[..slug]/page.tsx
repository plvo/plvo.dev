import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPaths, parseFrontmatter } from '@/lib/utils';
import { mdxComponents } from '@/mdx-components';

export function generateStaticParams() {
  const paths = getAllPaths();
  return paths.map((path) => ({ slug: [path] }));
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (slug === undefined) {
    return undefined;
  }

  const fileContent = getFileContent(slug);

  if (fileContent === null) {
    return notFound();
  }

  const { metadata } = parseFrontmatter(fileContent);

  return {
    title: metadata.title,
    description: metadata.summary,
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const fileContent = getFileContent(slug);

  if (fileContent === null) {
    return notFound();
  }

  const { metadata, content: mdxContent } = parseFrontmatter(fileContent);

  return (
    <main className='max-w-[600px] mx-auto px-4 md:py-8 space-y-6'>
      <h1 className='scroll-m-20 text-4xl font-bold tracking-tight first:mt-0'>{metadata.title}</h1>
      <p className='text-sm text-muted-foreground'>{metadata.summary}</p>
      <p className='text-sm text-muted-foreground'>{metadata.publishedAt}</p>
      <MDXRemote source={mdxContent} components={mdxComponents} />
    </main>
  );
}

function getFileContent(slug: string[]): string | null {
  const contentPath = getContentPath(slug);
  if (!fs.existsSync(contentPath)) {
    return null;
  }
  return fs.readFileSync(contentPath, 'utf-8');
}

function getContentPath(slug: string[]) {
  if (slug === undefined) {
    return path.join(process.cwd(), 'contents', 'home.mdx');
  } else {
    const [category, name] = slug;
    return path.join(process.cwd(), 'contents', `${category}`, `${name}.mdx`);
  }
}
