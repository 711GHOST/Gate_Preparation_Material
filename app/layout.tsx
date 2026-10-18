import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VektaPrep - Your Roadmap to GATE 2027',
  description:
    'A guided, animated roadmap to crack GATE 2027 (DA & CS) - plan, focus, achieve. Browse and download the full study library.',
  keywords: ['GATE 2027', 'Data Science', 'Computer Science', 'roadmap', 'study', 'DA', 'CS'],
  openGraph: {
    title: 'VektaPrep - Your Roadmap to GATE 2027',
    description: 'An animated roadmap + a complete, downloadable GATE 2027 study library.',
    type: 'website',
  },
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
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
