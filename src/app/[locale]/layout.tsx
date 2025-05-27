import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { getI18n, getStaticParams } from '@/i18n/config'
import { locales } from '@/i18n/config'
import '../globals.css'
import { getLocaleDirection } from '@/i18n/utils'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Providers from '../providers/Providers'
import { notFound } from 'next/navigation'

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
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const dir = getLocaleDirection(locale)

  return (
    <html dir={dir} lang={locale}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Dimofinf Saas</title>
    </head>
    <body>
      <Providers locale={locale}>
        <Navbar />
        <main className="min-h-[calc(100vh-201px)]">
          {children}
        </main>
        <Footer />
      </Providers>
    </body>
    </html>
  )
} 