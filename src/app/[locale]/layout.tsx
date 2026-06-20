import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    verification: {
      google: '0XYY1x7Bt9IiW1u3NZlB7i2N0nMq-ouZ8FwYCD04dIg',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
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
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JY6J48ZLBM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JY6J48ZLBM');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
