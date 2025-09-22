'use client';

import { Highlight, themes } from 'prism-react-renderer';
import { CopyButton } from './copy-button';

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  return (
    <div className='relative w-full rounded-xl overflow-hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto'>
      <CopyButton value={code} className='absolute top-2 right-2' />
      <CodeHighlight code={code} language={language} />
    </div>
  );
}

export interface CodeHighlightProps {
  code: string;
  language?: string;
}

export function CodeHighlight({ code, language = 'tsx' }: CodeHighlightProps) {
  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className='p-4 text-sm'>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
