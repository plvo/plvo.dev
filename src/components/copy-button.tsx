'use client';

import { CheckIcon, Copy } from 'lucide-react';
import * as React from 'react';

const DEFAULT_TIMEOUT = 2000;

async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function CopyButton({ value, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ok
  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, DEFAULT_TIMEOUT);
  }, [hasCopied]);

  return (
    <button
      type='button'
      onClick={() => {
        copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? (
        <CheckIcon className='cursor-pointer size-4 opacity-50' />
      ) : (
        <Copy className='cursor-pointer size-4 opacity-50' />
      )}
    </button>
  );
}
