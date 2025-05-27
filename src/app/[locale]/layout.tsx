import type { Metadata } from 'next'
import { Suspense, type ReactNode } from 'react'
import { getI18n, getStaticParams } from '@/i18n/config'
import '../globals.css'
import ClientLayout from '../components/ClientLayout'
import { getLocaleDirection } from '@/i18n/utils'

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
  params: { locale: string }
}

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function RootLayout({ children, params }: LocaleLayoutProps) {
  const dir = getLocaleDirection(params.locale)

  return (
    <html dir={dir} lang={params.locale}>
      <body>
        <Suspense fallback={<Loading />}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  )
}