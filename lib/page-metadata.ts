import type { Metadata } from 'next';
import { siteName, siteUrl } from './site-config';

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path = '', noIndex }: PageMetaInput): Metadata {
  const url = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const pageTitle = title.endsWith(` ${siteName}`)
    ? title.slice(0, -(siteName.length + 1))
    : title;
  const fullTitle = `${pageTitle} | ${siteName}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
