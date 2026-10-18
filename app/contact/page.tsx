import { ContactForm } from '@/components/ContactForm';
import { pageMetadata } from '@/lib/page-metadata';
import { contactEmail, founder } from '@/lib/site-config';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, Linkedin, Mail, UserRound } from 'lucide-react';

export const metadata = pageMetadata({
  title: 'Contact & Feedback',
  description:
    'Report broken downloads, incorrect answers, copyright concerns, or send suggestions for VektaPrep.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="container-x py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-fg/50">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="font-medium transition-colors hover:text-brand-600">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-fg/70">
            Contact
          </li>
        </ol>
      </nav>

      <header className="max-w-3xl">
        <span className="chip">
          <Mail className="h-3.5 w-3.5" aria-hidden /> Get in touch
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Contact &amp; <span className="gradient-text">Feedback</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-fg/65">
          Have a question, found an issue, or want to share feedback? Contact the founder directly or
          send a message using the form.
        </p>
      </header>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section aria-labelledby="founder-heading" className="space-y-4">
          <article className="card p-5 sm:p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
              <UserRound className="h-6 w-6" aria-hidden />
            </span>
            <h2 id="founder-heading" className="mt-5 text-xl font-extrabold text-fg">
              Founder
            </h2>
            <p className="mt-1 text-lg font-semibold text-fg/70">{founder.name}</p>
          </article>

          <a
            href={`mailto:${contactEmail}`}
            className="card card-interactive group flex items-center gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-200">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-fg/45">
                Email
              </span>
              <span className="mt-1 block break-all text-sm font-semibold text-fg transition-colors group-hover:text-brand-600 sm:text-base">
                {contactEmail}
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-fg/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
          </a>

          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-interactive group flex items-center gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:p-6"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0a66c2]/10 text-[#0a66c2] transition-colors group-hover:bg-[#0a66c2]/15">
              <Linkedin className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-fg/45">
                LinkedIn
              </span>
              <span className="mt-1 block font-semibold text-fg transition-colors group-hover:text-brand-600">
                Contact me on LinkedIn
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-fg/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
          </a>
        </section>

        <section aria-labelledby="message-heading">
          <h2 id="message-heading" className="mb-3 text-xl font-extrabold text-fg">
            Send a message
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-fg/60">
            Report broken downloads, suspected answer errors, attribution concerns, or technical
            problems. Include the resource ID when your message is about a document.
          </p>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
