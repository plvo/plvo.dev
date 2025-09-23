import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { cn, parseFrontmatter } from '@/lib/utils';

export default async function BlogList() {
  const blogDirectory = path.join(process.cwd(), 'contents', 'blog');
  const files = fs.readdirSync(blogDirectory, { withFileTypes: true });

  const sortedFiles = files
    .map((file) => {
      const content = fs.readFileSync(path.join(blogDirectory, file.name), 'utf-8');
      const { metadata } = parseFrontmatter(content);
      return { ...file, metadata };
    })
    .sort((a, b) => {
      const aDate = new Date(a.metadata.publishedAt || '');
      const bDate = new Date(b.metadata.publishedAt || '');
      return bDate.getTime() - aDate.getTime();
    });

  return (
    <ul className='space-y-3'>
      {sortedFiles.map(async (file) => {
        const publishedAt = file.metadata.publishedAt
          ? new Date(file.metadata.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })
          : null;

        return (
          <li key={file.name} className='flex items-center justify-between gap-2'>
            <Link
              href={`/blog/${file.name.replace('.mdx', '')}`}
              className='a-mdx underline flex items-center gap-2'
            >
              {file.metadata.imageUrl && (
                <Image
                  src={file.metadata.imageUrl}
                  alt={file.metadata.title || ''}
                  width={10}
                  height={10}
                  className='size-6'
                />
              )}
              <span className={cn('whitespace-nowrap', !file.metadata.imageUrl && 'ml-8')}>{file.metadata.title}</span>
            </Link>
            {publishedAt && <code className='text-muted-foreground'>{publishedAt}</code>}
          </li>
        );
      })}
    </ul>
  );
}
