import { Suspense } from 'react'
import LandingClient from './LandingClient'
import { locales } from '@/i18n/config'

// Prevent prerendering of this page
export const dynamic = 'force-dynamic'

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// Loading component
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

// Add type for page props
interface PageProps {
  params: {
    locale: string
  }
}

export default function LandingPage({ params }: PageProps) {
  // Validate locale
  // if (!locales.includes(params?.locale)) {
  //   return null // This will trigger a 404 page
  // }

  return (
    <Suspense fallback={<Loading />}>
      <LandingClient />
    </Suspense>
  )
} 