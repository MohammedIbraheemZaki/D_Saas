import { Suspense } from 'react'
import LandingClient from './LandingClient'

// Prevent prerendering of this page
export const dynamic = 'force-dynamic'

// Loading component
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default async function LandingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LandingClient />
    </Suspense>
  )
} 