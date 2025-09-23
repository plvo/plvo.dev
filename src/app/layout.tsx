import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const titleSans = localFont({
  src: '../styles/fonts/susemono.ttf',
  variable: '--font-title',
});

const textSans = localFont({
  src: '../styles/fonts/raleway.ttf',
  variable: '--font-text',
});

export const metadata: Metadata = {
  title: {
    default: 'plvo.dev',
    template: '%s | plvo.dev',
  },
  description:
    "Building tools and exploring new technologies. I'm into AI and blockchain, where I enjoy experimenting and creating useful projects. I also build open-source tools that make developers’ lives easier.",
  keywords: ['plvo', 'plvo.dev', 'blog', 'portfolio', 'developer', 'ai', 'blockchain', 'open-source', 'tools', "javascript", "python", "react", "next.js"],
  authors: [{ name: 'plvo', url: 'https://github.com/plvo' }],
  creator: 'plvo',
  openGraph: {
    title: 'plvo.dev',
    description:
      "Building tools and exploring new technologies. I'm into AI and blockchain, where I enjoy experimenting and creating useful projects. I also build open-source tools that make developers’ lives easier.",
    images: ['/pp.png'],
    firstName: 'plvo',
  },
  applicationName: 'plvo.dev',
  twitter: {
    card: 'summary_large_image',
    title: 'plvo.dev',
    description:
      "Building tools and exploring new technologies. I'm into AI and blockchain, where I enjoy experimenting and creating useful projects. I also build open-source tools that make developers’ lives easier.",
    images: ['/pp.png'],
    site: 'https://plvo.dev',
  },
  icons: {
    icon: '/pp.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${titleSans.variable} ${textSans.variable} antialiased overflow-x-hidden tracking-tight`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
