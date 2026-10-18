import Link from 'next/link';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Page not found',
  description: 'The page you requested could not be found on VektaPrep.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-fg/40">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-fg">Page not found</h1>
      <p className="mt-3 max-w-md text-fg/60">
        The link may be outdated or mistyped. Head back to the homepage or open the resource library.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Home
        </Link>
        <Link href="/resources" className="btn-ghost border border-fg/15">
          Resources
        </Link>
      </div>
    </div>
  );
}
