import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function InfoPageShell({
  title,
  lede,
  children,
  breadcrumb,
}: {
  title: string;
  lede?: string;
  breadcrumb?: { label: string; href: string }[];
  children: React.ReactNode;
}) {
  return (
    <article className="container-x py-14 sm:py-20">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-fg/50">
          <ol className="flex flex-wrap items-center gap-1">
            {breadcrumb.map((b, i) => (
              <li key={b.href} className="inline-flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                <Link href={b.href} className="font-medium hover:text-brand-600">
                  {b.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <header className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {lede && <p className="mt-4 text-lg leading-relaxed text-fg/65">{lede}</p>}
      </header>
      <div className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-fg/75 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-fg [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-fg [&_a]:font-semibold [&_a]:text-brand-600 [&_a]:underline-offset-2 hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}
