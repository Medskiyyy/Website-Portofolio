import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';
import AmbientSpotlight from '@/components/AmbientSpotlight';
import { siteUrl } from '@/lib/site';
import PersonSchema from '@/components/PersonSchema';
import '@/app/globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
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

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
        {/* Multi-point atmospheric ambient lighting wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          {/* Top center soft amber glow */}
          <div className="absolute -top-[15%] left-1/2 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/[0.14]" />
          {/* Middle left subtle warmth */}
          <div className="absolute top-[35%] -left-[12%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[150px] dark:bg-primary/[0.09]" />
          {/* Bottom right subtle warmth */}
          <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary/[0.07] blur-[160px] dark:bg-primary/[0.10]" />
        </div>

        {/* Interactive mouse spotlight follower */}
        <AmbientSpotlight />

        {/* Film grain noise overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.045] dark:opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

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
            <div id="content" className="relative z-10 flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
