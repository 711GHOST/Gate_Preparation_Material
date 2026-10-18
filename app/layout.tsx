import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteName, siteUrl } from '@/lib/site-config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const defaultTitle = 'VektaPrep | Free GATE 2027 DA & CS Study Resources';
const defaultDescription =
  'Explore GATE 2027 Data Science and Computer Science study notes, formula books, practice questions, mock tests, and preparation resources on VektaPrep.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  keywords: ['GATE 2027', 'Data Science', 'Computer Science', 'roadmap', 'study', 'DA', 'CS', 'mock tests'],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    url: siteUrl,
    siteName,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=new URLSearchParams(location.search).get('theme');var t=p||localStorage.getItem('vekta.theme');var d=document.documentElement;if(t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}else if(t==='light'){d.classList.remove('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
