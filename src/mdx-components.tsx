import Link from 'next/link';
import type React from 'react';
import BlogList from './components/blog-list';
import { CodeBlock, type CodeBlockProps } from './components/code-block';
import { cn } from './lib/utils';

type HeadingProps = React.ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = React.ComponentPropsWithoutRef<'p'>;
type ListProps = React.ComponentPropsWithoutRef<'ul'>;
type ListItemProps = React.ComponentPropsWithoutRef<'li'>;
type AnchorProps = React.ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = React.ComponentPropsWithoutRef<'blockquote'>;
type HRProps = React.ComponentPropsWithoutRef<'hr'>;
type SmallProps = React.ComponentPropsWithoutRef<'small'>;
type CodeProps = React.ComponentPropsWithoutRef<'code'>;

export const mdxComponents = {
  h1: ({ className, ...props }: HeadingProps) => (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-bold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 pt-4 pb-2 mb-4 mt-10',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mt-4',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HeadingProps) => (
    <h5
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={cn(
        'leading-8 [&:not(:first-child)]:mt-4',
        className
      )}
      {...props}
    />
  ),
  a: ({ href, children, className, ...props }: AnchorProps) => {
    const anchorClass = cn('underline underline-offset-4', className);
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={anchorClass} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={anchorClass} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={anchorClass}
        {...props}
      >
        {children}
      </a>
    );
  },
  em: (props: React.ComponentPropsWithoutRef<'em'>) => (
    <em className='font-medium' {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className='font-medium' {...props} />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul
      className={cn(
        'my-6 ml-6 list-disc',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li
      className={cn(
        'mt-2',
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic',
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }: HRProps) => (
    <hr className='my-4 md:my-8' {...props} />
  ),
  small: ({ className, ...props }: SmallProps) => (
    <small
      className={cn(
        'text-sm font-medium leading-none',
        className
      )}
      {...props}
    />
  ),
  code: ({ children, ...props }: CodeProps) => {
    return (
      <code
        className="relative rounded bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ok
        dangerouslySetInnerHTML={{ __html: children as string }}
        {...props}
      />
    );
  },
  CodeBlock: ({ code, language = 'tsx' }: CodeBlockProps) => (
    <CodeBlock code={code} language={language} />
  ),
  BlogList: () => <BlogList />,
};

declare global {
  type MDXProvidedComponents = typeof mdxComponents;
}

export function useMDXComponents(): MDXProvidedComponents {
  return mdxComponents;
}
