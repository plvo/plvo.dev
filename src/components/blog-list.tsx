import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { parseFrontmatter } from '@/lib/utils';

export default async function BlogList() {
  const blogDirectory = path.join(process.cwd(), 'contents', 'blog');
  const files = fs.readdirSync(blogDirectory, { withFileTypes: true });

  return (
    <ul>
      {files.map(async (file) => {
        const content = fs.readFileSync(path.join(blogDirectory, file.name), 'utf-8');

        const { metadata } = parseFrontmatter(content);

        return (
          <li key={file.name}>
            <Link href={`/blog/${file.name.replace('.mdx', '')}`} className='block underline underline-offset-4'>
              {metadata.image && (
                <Image src={metadata.image} alt={metadata.title || ''} width={10} height={10} className='size-10' />
              )}
              {metadata.title} - {metadata.summary}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
