import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default:  'QuickLaunch — AI Landing Page Generator',
    template: '%s | QuickLaunch',
  },
  description:
    'Describe your product. Get a stunning, conversion-optimized landing page in seconds. No designers, no bloated builders.',
  keywords: ['landing page', 'AI', 'generator', 'SaaS', 'no-code', 'startup'],
  authors: [{ name: 'Asad ur Rehman' }],
  openGraph: {
    title:       'QuickLaunch — AI Landing Page Generator',
    description: 'Describe your product. Get a stunning landing page in seconds.',
    type:        'website',
    locale:      'en_US',
    siteName:    'QuickLaunch',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'QuickLaunch — AI Landing Page Generator',
    description: 'Describe your product. Get a stunning landing page in seconds.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} h-full`} suppressHydrationWarning>
      <body className="h-full antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
