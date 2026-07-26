import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';

type Props = {
  children: ReactNode;
};

/**
 * The localized [locale] layout renders the actual <html>/<body>; this root
 * layout only passes children through. It still declares metadataBase so routes
 * outside [locale] — the global 404 and the OG image — resolve absolute URLs.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: Props) {
  return children;
}
