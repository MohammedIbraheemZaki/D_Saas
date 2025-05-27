'use client';

import { ReactNode } from 'react';
import { useCurrentLocale } from '@/i18n/client';
import { getLocaleDirection } from '@/i18n/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import Providers from '../providers/Providers';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const locale = useCurrentLocale();
  const dir = getLocaleDirection(locale);

  return (
    <html dir={dir} lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers locale={locale}>
          <Navbar />
          <main className="min-h-[calc(100vh-201px)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 