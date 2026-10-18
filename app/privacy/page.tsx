import { InfoPageShell } from '@/components/InfoPageShell';
import { pageMetadata } from '@/lib/page-metadata';
import { contactEmail, siteName } from '@/lib/site-config';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How VektaPrep handles browser storage, optional cloud downloads, and planned analytics or advertising.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <InfoPageShell
      title="Privacy Policy"
      lede={`Last updated: 18 October 2026. This policy describes how ${siteName} processes information when you use this website.`}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy', href: '/privacy' }]}
    >
      <h2>Overview</h2>
      <p>
        {siteName} is a static-first educational website. We do not operate user accounts or a
        registration database on this site. Most interaction happens in your browser; optional server
        routes may sign download URLs when cloud storage is configured.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Progress you choose to save:</strong> completion checkboxes for roadmap phases,
          resources, and syllabus topics are stored in your browser&apos;s <code>localStorage</code>{' '}
          (keys such as <code>vekta.phases</code>, <code>vekta.resources</code>,{' '}
          <code>vekta.syllabus.revision</code>, and <code>vekta.theme</code>). This data stays on your
          device unless you clear site data.
        </li>
        <li>
          <strong>Theme preference:</strong> light/dark mode is stored locally and may respect your OS
          preference on first visit.
        </li>
        <li>
          <strong>Contact messages:</strong> if you use the contact flow with a configured email
          address, your message is composed in your email client - we do not receive it unless you send
          it.
        </li>
        <li>
          <strong>Server logs:</strong> the hosting provider (e.g. Vercel) may log IP addresses, URLs,
          and timestamps for security and performance. Refer to their privacy documentation.
        </li>
      </ul>

      <h2>Downloads and third-party preview</h2>
      <p>
        Document downloads may be served from this site or, when configured, from private cloud storage
        via short-lived signed URLs. Optional &quot;Office Online&quot; preview opens Microsoft&apos;s
        viewer with a public URL to your file - review{' '}
        <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener noreferrer">
          Microsoft&apos;s privacy statement
        </a>{' '}
        if you use that feature.
      </p>

      <h2>Analytics</h2>
      <p>
        Third-party analytics (such as Google Analytics) are <strong>not enabled by default</strong> in
        the current codebase. If analytics are added later, this policy will be updated and, where
        required, consent will be collected before non-essential tracking loads.
      </p>

      <h2>Advertising (planned)</h2>
      <p>
        Google AdSense or similar advertising is <strong>not active</strong> on the site today. If
        advertising is enabled after publisher approval, Google may use cookies and similar technologies
        to serve and measure ads. See{' '}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google advertising technologies
        </a>{' '}
        and{' '}
        <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer">
          AdSense program policies
        </a>
        . We will update this page and implement consent mechanisms appropriate to applicable regions
        before enabling ads.
      </p>

      <h2>Cookies</h2>
      <p>
        Essential site functionality relies primarily on local storage rather than cookies. Any future
        advertising or analytics cookies will be disclosed here when implemented.
      </p>

      <h2>Children</h2>
      <p>
        The site is intended for exam aspirants and general educational use. We do not knowingly collect
        personal information from children through forms on this site.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Clear browser site data to remove saved progress and theme preferences.</li>
        <li>Use download-only workflows if you prefer not to use online document preview.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Privacy questions:{' '}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. You can also use the{' '}
        <Link href="/contact">contact page</Link>.
      </p>
    </InfoPageShell>
  );
}
