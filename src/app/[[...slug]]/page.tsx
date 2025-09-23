import fs from 'node:fs';
import path from 'node:path';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { cn, getAllPaths, parseFrontmatter } from '@/lib/utils';
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

  const publishedAt = metadata.publishedAt
    ? new Date(metadata.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <main className='max-w-[650px] mx-auto px-4 py-4 md:py-8'>
      {slug !== undefined && (
        <div className='flex items-center whitespace-nowrap gap-1 pb-4'>
          <ChevronLeft className='size-5' /> <Link href='/'>plvo.dev</Link>
        </div>
      )}

      <header className='space-y-3'>
        <div className={cn(metadata.imageUrl && 'flex max-sm:flex-col-reverse justify-between items-center gap-2')}>
          <h1 className='h1-mdx'>{metadata.title}</h1>
          {metadata.imageUrl && (
            <Image
              src={metadata.imageUrl}
              className='rounded-lg size-10 md:size-14'
              alt={metadata.title || ''}
              width={100}
              height={100}
            />
          )}
        </div>
        <div className={cn(publishedAt && 'w-full flex flex-col-reverse md:grid md:grid-cols-3 gap-2')}>
          <p className={cn(publishedAt && 'col-span-2', 'text-muted-foreground text-justify')}>{metadata.summary}</p>
          {publishedAt && <code className='whitespace-nowrap text-muted-foreground md:text-right'>{publishedAt}</code>}
        </div>
      </header>

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
