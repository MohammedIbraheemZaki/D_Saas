import type { Metadata } from 'next'
import { Suspense, type ReactNode } from 'react'
import { getI18n, getStaticParams } from '@/i18n/config'
import '../globals.css'
import { getLocaleDirection } from '@/i18n/utils'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Providers from '../providers/Providers'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()
  return {
    title: t('common.appName'),
    description: t('landing.description'),
  }
}

export function generateStaticParams() {
  return getStaticParams()
}

interface LocaleLayoutProps {
  children: ReactNode
}

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  const locale = 'en' // Default to 'en'
  const dir = getLocaleDirection(locale)

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  )
}