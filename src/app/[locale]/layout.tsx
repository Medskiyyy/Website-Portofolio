import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';
import { siteUrl } from '@/lib/site';
import PersonSchema from '@/components/PersonSchema';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    verification: {
      google: '0XYY1x7Bt9IiW1u3NZlB7i2N0nMq-ouZ8FwYCD04dIg',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        id: '/id',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `/${locale}`,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      // The image is injected by ./opengraph-image.tsx via the file convention,
      // which appends its own cache-busting hash. Declaring `images` here would
      // only duplicate it with a stale URL.
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  /*
   * The [locale] segment otherwise matches anything the i18n proxy skips —
   * which is every path containing a dot. Without this check, /anything.png
   * returned 200 and rendered the home page under <html lang="anything.png">,
   * producing unlimited duplicate home pages for crawlers.
   */
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${grotesk.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PersonSchema locale={locale} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
            >
              {locale === 'id' ? 'Lewati ke konten' : 'Skip to content'}
            </a>
            <Navbar />
            <div id="content" className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>

        {/*
          Vercel Analytics rather than Google Analytics: it sets no cookies and
          stores no personal data, so the site needs no consent banner for the
          EU visitors this portfolio is partly aimed at.
        */}
        <Analytics />
      </body>
    </html>
  );
}
