import { Suspense } from 'react'
import LandingClient from './LandingClient'
import { locales } from '@/i18n/config'

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

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// type PageProps = {
//   params: { locale: string }
// }

export default function Page() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <LandingClient />
      </Suspense>
    </div>
  )
} 